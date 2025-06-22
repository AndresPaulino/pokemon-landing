'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!acceptTerms) {
            alert('Please accept the terms and conditions');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        // Handle sign up logic here
    };

    const passwordsMatch =
        formData.password === formData.confirmPassword || formData.confirmPassword === '';

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden"
            data-oid="sybs4nx"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="1hs9bhq">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    data-oid="t73c--:"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
                    data-oid="919bkib"
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
                    data-oid="bzhy8bf"
                ></div>
            </div>

            {/* Navigation */}
            <nav
                className="relative z-50 py-6 px-8 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/10"
                data-oid=":j7z3jm"
            >
                <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    data-oid="2lwl43q"
                >
                    PokePrint Me
                </Link>
                <div className="hidden md:flex space-x-8" data-oid=":.:8gbu">
                    <Link
                        href="/#gallery"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="zlkhw0v"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/#process"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="bdjdky2"
                    >
                        Process
                    </Link>
                </div>
                <Link
                    href="/signin"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                    data-oid="ftafbvw"
                >
                    Sign In
                </Link>
            </nav>

            {/* Sign Up Form */}
            <section
                className="relative z-10 min-h-screen flex items-center justify-center px-8 py-20"
                data-oid=".kom5qs"
            >
                <div className="w-full max-w-md" data-oid="f1owc0g">
                    <div
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl"
                        data-oid="ehmbd13"
                    >
                        {/* Header */}
                        <div className="text-center mb-8" data-oid="skitnd0">
                            <h1
                                className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                data-oid="xxvkxb:"
                            >
                                Join the Adventure
                            </h1>
                            <p className="text-gray-300" data-oid="iycl.9.">
                                Create your account and start your Pokemon journey
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="-f.96hb">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4" data-oid="dgxqo-d">
                                <div data-oid="010yhz6">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-purple-300 mb-2"
                                        data-oid="-j0b7v3"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Ash"
                                        required
                                        data-oid="u5cgman"
                                    />
                                </div>
                                <div data-oid="41n46pf">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-purple-300 mb-2"
                                        data-oid="05vf.i7"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Ketchum"
                                        required
                                        data-oid=".07x:kp"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div data-oid="y0d471k">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-purple-300 mb-2"
                                    data-oid="j_ru87b"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="trainer@pokemon.com"
                                    required
                                    data-oid="o_nuafx"
                                />
                            </div>

                            {/* Password Field */}
                            <div data-oid="xu7-_dz">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-purple-300 mb-2"
                                    data-oid="3511dnn"
                                >
                                    Password
                                </label>
                                <div className="relative" data-oid="ww54b08">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        data-oid="gb9iomi"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                                        data-oid="mt4.m5c"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="hb9oovt"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                    data-oid="0yxkty0"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="inxp6lh"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="rv2zl6v"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="o3cncnp"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-1" data-oid="me19iq8">
                                    Must be at least 8 characters long
                                </p>
                            </div>

                            {/* Confirm Password Field */}
                            <div data-oid="wh4svcp">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-purple-300 mb-2"
                                    data-oid="dcpfjw-"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative" data-oid="tehrnib">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 pr-12 ${
                                            passwordsMatch
                                                ? 'border-white/20 focus:ring-purple-500'
                                                : 'border-red-500 focus:ring-red-500'
                                        }`}
                                        placeholder="••••••••"
                                        required
                                        data-oid="8stg:tv"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                                        data-oid="cqskohr"
                                    >
                                        {showConfirmPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="5r7mhej"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                    data-oid="dwdg7v3"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="ojk7wdz"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="05_8hsq"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="l-8cgzp"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {!passwordsMatch && formData.confirmPassword && (
                                    <p className="text-xs text-red-400 mt-1" data-oid="ki_9e0v">
                                        Passwords do not match
                                    </p>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-3" data-oid="m_cp5t6">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                                    required
                                    data-oid="ixabr:i"
                                />

                                <label
                                    htmlFor="acceptTerms"
                                    className="text-sm text-gray-300"
                                    data-oid="qy0k8y4"
                                >
                                    I agree to the{' '}
                                    <Link
                                        href="/terms"
                                        className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                                        data-oid="j9oz1z2"
                                    >
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                                        data-oid="1b1_lfn"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !passwordsMatch || !acceptTerms}
                                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                data-oid="gvqd7g_"
                            >
                                {isLoading ? (
                                    <div
                                        className="flex items-center justify-center"
                                        data-oid="u3-43jo"
                                    >
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            data-oid="jm7j7jc"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                data-oid="rsxao0i"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                data-oid="rolu9b2"
                                            ></path>
                                        </svg>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center" data-oid="ecd4ckq">
                            <div
                                className="flex-1 border-t border-white/20"
                                data-oid="xg269od"
                            ></div>
                            <span className="px-4 text-sm text-gray-400" data-oid="y__ezv_">
                                or
                            </span>
                            <div
                                className="flex-1 border-t border-white/20"
                                data-oid="2uzaz7e"
                            ></div>
                        </div>

                        {/* Social Sign Up */}
                        <div className="space-y-3" data-oid="k6j:39o">
                            <button
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                                data-oid="ad-c3um"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" data-oid="m5xabtx">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        data-oid="09926jj"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        data-oid="ofx8rbt"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        data-oid="eqddxhm"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        data-oid="4k0rhhi"
                                    />
                                </svg>
                                <span data-oid="_u4yt0o">Sign up with Google</span>
                            </button>
                        </div>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center" data-oid="uskwc_g">
                            <p className="text-gray-400" data-oid="89hhhu9">
                                Already have an account?{' '}
                                <Link
                                    href="/signin"
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
                                    data-oid="6:kqm7."
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx data-oid="156vir1">{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
