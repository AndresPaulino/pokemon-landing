'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
        // Handle sign in logic here
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden"
            data-oid="0yee:h8"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="xt_vvj1">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    data-oid="ccnk7_z"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
                    data-oid="km70-.2"
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
                    data-oid="hjobi_l"
                ></div>
            </div>

            {/* Navigation */}
            <nav
                className="relative z-50 py-6 px-8 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/10"
                data-oid="6598h5-"
            >
                <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    data-oid="qr1w9xi"
                >
                    PokePrint Co.
                </Link>
                <div className="hidden md:flex space-x-8" data-oid="3a0j1ln">
                    <Link
                        href="/#gallery"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="c9_3xnx"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/#process"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="ne0ghrp"
                    >
                        Process
                    </Link>
                    <Link
                        href="/#contact"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="6vtrwb9"
                    >
                        Contact
                    </Link>
                </div>
                <Link
                    href="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                    data-oid="0776uqk"
                >
                    Sign Up
                </Link>
            </nav>

            {/* Sign In Form */}
            <section
                className="relative z-10 min-h-screen flex items-center justify-center px-8 py-20"
                data-oid="tzajrdg"
            >
                <div className="w-full max-w-md" data-oid="twbc.0s">
                    <div
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl"
                        data-oid="xl_fylu"
                    >
                        {/* Header */}
                        <div className="text-center mb-8" data-oid="ontgw7k">
                            <h1
                                className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                data-oid="kwnan-."
                            >
                                Welcome Back
                            </h1>
                            <p className="text-gray-300" data-oid="8aux4yd">
                                Sign in to continue your Pokemon journey
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="knju9xb">
                            {/* Email Field */}
                            <div data-oid="k126x61">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-purple-300 mb-2"
                                    data-oid="-33v9j:"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="trainer@pokemon.com"
                                    required
                                    data-oid="n:koch:"
                                />
                            </div>

                            {/* Password Field */}
                            <div data-oid="y7_:619">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-purple-300 mb-2"
                                    data-oid="pklfwdh"
                                >
                                    Password
                                </label>
                                <div className="relative" data-oid="yzbs_h4">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12"
                                        placeholder="••••••••"
                                        required
                                        data-oid="xjx3610"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                                        data-oid="1ndko2v"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="kp197j7"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                    data-oid="6aqm:nw"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="vqlastm"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    data-oid="e8ywj2s"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    data-oid="9h14jcd"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between" data-oid="c604hwn">
                                <label className="flex items-center" data-oid="ijylb4q">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                                        data-oid="25zhujb"
                                    />

                                    <span className="ml-2 text-sm text-gray-300" data-oid=".fb79ae">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
                                    data-oid="_0ga5vu"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                data-oid="3h.nfa5"
                            >
                                {isLoading ? (
                                    <div
                                        className="flex items-center justify-center"
                                        data-oid="sh.nm3r"
                                    >
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            data-oid="c-3d85:"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                data-oid="m31hyz8"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                data-oid="t93wq8k"
                                            ></path>
                                        </svg>
                                        Signing In...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center" data-oid="prdcwac">
                            <div
                                className="flex-1 border-t border-white/20"
                                data-oid="4yrd_qy"
                            ></div>
                            <span className="px-4 text-sm text-gray-400" data-oid="3x4c.ry">
                                or
                            </span>
                            <div
                                className="flex-1 border-t border-white/20"
                                data-oid="a._7wp4"
                            ></div>
                        </div>

                        {/* Social Sign In */}
                        <div className="space-y-3" data-oid="a:-9v:b">
                            <button
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                                data-oid=":d3ckyw"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" data-oid="-u-hl:m">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        data-oid="x_7mr67"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        data-oid="ljhdx_n"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        data-oid="yo1r5pa"
                                    />

                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        data-oid="a5nsw:f"
                                    />
                                </svg>
                                <span data-oid="csr974u">Continue with Google</span>
                            </button>

                            <button
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3"
                                data-oid="-egqjie"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="ztqeubj"
                                >
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        data-oid="lrq8_25"
                                    />
                                </svg>
                                <span data-oid="55jry_1">Continue with Facebook</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center" data-oid="6albx91">
                            <p className="text-gray-400" data-oid="knhh8mk">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
                                    data-oid="16ks4ap"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx data-oid="hsrz:d6">{`
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
