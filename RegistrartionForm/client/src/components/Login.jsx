import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const InputField = ({ label, type, id, value, onChange }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-purple-300">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full p-3 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm text-white placeholder-white/50"
        />
    </div>
);

function CosmicLogin() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleSubmit = (e) => {
                e.preventDefault();
                axios.post('http://localhost:3001/login', { email, password })
                        .then((result) => {
                                console.log(result);
                                if (result.data === "Success") {
                                        navigate('/');
                                } else {
                                        alert("Invalid email or password");
                                }
                        })
                        .catch((err) => {
                                if (err.response && err.response.status === 401) {
                                        alert("Invalid email or password");
                                } else {
                                        console.log(err);
                                        alert("An error occurred. Please try again later.");
                                }
                        });
        };

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
                                className="relative w-full max-w-md p-8 rounded-2xl overflow-hidden"
                                style={{
                                        backgroundColor: 'rgba(13, 13, 35, 0.3)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0 0 40px rgba(128, 0, 255, 0.3), 0 0 80px rgba(128, 0, 255, 0.1)'
                                }}
                        >
                                <div className="absolute inset-0 bg-black backdrop-blur-lg pointer-events-none" />
                                <div className="relative z-10">
                                        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                                Login
                                        </h2>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                                <InputField
                                                        label="Email"
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <InputField
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <motion.button
                                                        type="submit"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-200"
                                                >
                                                        Login
                                                </motion.button>
                                        </form>
                                        <p className="mt-6 text-center text-sm">
                                                Don't have an account?{' '}
                                                <Link
                                                        to="/register"
                                                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                                >
                                                        Sign Up
                                                </Link>
                                        </p>
                                </div>
                        </motion.div>
                </div>
        );
}

export default CosmicLogin;
