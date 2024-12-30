import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const InputField = ({ label, type, id, value, onChange, className = "" }) => (
    <div className={`mb-2 ${className}`}>
        <label htmlFor={id} className="block text-xs font-medium mb-1 text-purple-300">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm text-white placeholder-white/50 text-sm"
        />
    </div>
);

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        address: '',
        city: '',
        gender: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            // Handle successful registration (e.g., show success message, redirect)
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 hide-scrollbar"
            style={{
                backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/003/060/062/original/dark-cosmic-nebula-space-background-free-video.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                overflow: 'auto'
            }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md p-6 rounded-2xl overflow-hidden hide-scrollbar"
                style={{
                    backgroundColor: 'rgba(13, 13, 35, 0.3)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 40px rgba(128, 0, 255, 0.3), 0 0 80px rgba(128, 0, 255, 0.1)',
                    maxHeight: 'calc(100vh - 2rem)',
                    overflowY: 'auto'
                }}
            >
                <div className="absolute inset-0 bg-black backdrop-blur-lg pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Sign Up
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <InputField label="Name" type="text" id="name" value={formData.name} onChange={handleChange} className="col-span-2" />
                        <InputField label="Email" type="email" id="email" value={formData.email} onChange={handleChange} className="col-span-2" />
                        <InputField label="Password" type="password" id="password" value={formData.password} onChange={handleChange} />
                        <InputField label="Confirm Password" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        <InputField label="Date of Birth" type="date" id="dob" value={formData.dob} onChange={handleChange} />
                        <div className="mb-2">
                            <label htmlFor="gender" className="block text-xs font-medium mb-1 text-purple-300">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all  duration-200 backdrop-blur-sm text-white text-sm"
                            >
                                <option value=""  className='text-black' >Select</option>
                                <option value="male" className='text-black' >Male</option>
                                <option value="female" className='text-black' >Female</option>
                                <option value="other" className='text-black' >Other</option>
                            </select>
                        </div>
                        <InputField label="Address" type="text" id="address" value={formData.address} onChange={handleChange} className="col-span-2" />
                        <InputField label="City" type="text" id="city" value={formData.city} onChange={handleChange} className="col-span-2" />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="col-span-2 p-2 mt-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-200 text-sm"
                        >
                            Sign up
                        </motion.button>
                    </form>

                    <p className="mt-4 text-center text-xs">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
