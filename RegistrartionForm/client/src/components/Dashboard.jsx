import React, { useEffect, useState } from 'react'
import axios from "axios"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function CosmicDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/")
            .then((res) => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4"
            style={{
                backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/003/060/062/original/dark-cosmic-nebula-space-background-free-video.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl p-8 rounded-2xl overflow-hidden"
                style={{
                    backgroundColor: 'rgba(13, 13, 35, 0.3)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 40px rgba(128, 0, 255, 0.3), 0 0 80px rgba(128, 0, 255, 0.1)'
                }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    User Dashboard
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-purple-600 bg-opacity-50">
                                <th className="p-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                                <th className="p-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((userData, index) => (
                                <tr key={userData.id} className={index % 2 === 0 ? 'bg-white bg-opacity-10' : 'bg-purple-200 bg-opacity-10'}>
                                    <td className="p-3 whitespace-nowrap">{userData.name}</td>
                                    <td className="p-3 whitespace-nowrap">{userData.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               <div className='w-full flex justify-center pt-10'>
               <Link to="/login" className="bg-purple-400 px-3 py-1 hover:text-purple-300 transition-colors duration-200 rounded-md">
                            Login
                        </Link>
               </div>
            </motion.div>
            
        </div>
    )
}

export default CosmicDashboard

