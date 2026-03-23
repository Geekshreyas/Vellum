import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login({ userData: currentUser }));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 transition-all">
                
                
                <div className="mb-8 flex justify-center">
                    <span className="inline-block w-full max-w-[120px]">
                        <Logo width="100%" />
                    </span>
                </div>

                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
                
                
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                )}

                
                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div className="space-y-5">
                        <div>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: "Full name is required",
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                label="Email address"
                                placeholder="name@company.com"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full py-2.5 text-base"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;