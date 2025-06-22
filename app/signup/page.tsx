'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (!acceptTerms) {
            setError('Please accept the terms and conditions');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            // Call the registration API
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess('Account created successfully! Signing you in...');

            // Automatically sign in the user after successful registration
            const signInResult = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (signInResult?.error) {
                setError('Account created but sign-in failed. Please try signing in manually.');
            } else {
                // Redirect to order page after successful sign-in
                router.push('/order');
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        signIn('google', { callbackUrl: '/order' });
    };

    const passwordsMatch =
        formData.password === formData.confirmPassword || formData.confirmPassword === '';

    return (
        <div
            className="min-h-screen bg-slate-900 text-white overflow-x-hidden"
            data-oid="sybs4nx"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="1hs9bhq">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    data-oid="t73c--:"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
                    data-oid="919bkib"
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
                    data-oid="p8p-0t-"
                ></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center p-4" data-oid="ow5:bm.">
                <div
                    className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8"
                    data-oid="1cgp3n8"
                >
                    {/* Header */}
                    <div className="text-center mb-8" data-oid="5xyq7t9">
                        <h1
                            className="text-3xl font-bold text-amber-400 mb-2"
                            data-oid="dg:b7c_"
                        >
                            Join Pokécard Creator
                        </h1>
                        <p className="text-gray-300" data-oid="s24g_09">
                            Create your trainer account and start building amazing cards!
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" data-oid="ch3y7gi">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4" data-oid="z-tqo95">
                            <div data-oid="s3w1z67">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-amber-300 mb-2"
                                    data-oid="7bb6-s."
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Ash"
                                    required
                                    data-oid=".3wkcr6"
                                />
                            </div>
                            <div data-oid="o0-dqir">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-amber-300 mb-2"
                                    data-oid="k.4xlv6"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Ketchum"
                                    required
                                    data-oid="l0rlpwi"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div data-oid="e4l-pqb">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-amber-300 mb-2"
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
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                                placeholder="trainer@pokemon.com"
                                required
                                data-oid="o_nuafx"
                            />
                        </div>

                        {/* Password Field */}
                        <div data-oid="xu7-_dz">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-amber-300 mb-2"
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
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 pr-12"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    data-oid="gb9iomi"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-300"
                                    data-oid="mt4.m5c"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div data-oid="47i8nto">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-amber-300 mb-2"
                                data-oid="8ew7.v1"
                            >
                                Confirm Password
                            </label>
                            <div className="relative" data-oid="v4t.k1p">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 pr-12 ${
                                        passwordsMatch ? 'border-white/20 focus:ring-amber-500' : 'border-red-500 focus:ring-red-500'
                                    }`}
                                    placeholder="••••••••"
                                    required
                                    data-oid="n3qp.4h"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-300"
                                    data-oid="m:n9c2t"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {!passwordsMatch && formData.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1" data-oid="bc7ksqb">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start space-x-3" data-oid="c_-5kh2">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
                                data-oid="8x4hl6k"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-gray-300" data-oid="8_z-c5f">
                                I agree to the{' '}
                                <Link href="/terms" className="text-amber-400 hover:text-amber-300" data-oid="gvd85ug">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-amber-400 hover:text-amber-300" data-oid="s_b5m7z">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !passwordsMatch || !acceptTerms}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                            data-oid="3a_:b7k"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center" data-oid="z3p7m2y">
                        <div className="flex-1 border-t border-white/20" data-oid="59q4w_g"></div>
                        <span className="px-4 text-sm text-gray-400" data-oid="l38z4z5">or</span>
                        <div className="flex-1 border-t border-white/20" data-oid="w2p-roo"></div>
                    </div>

                    {/* Google Sign Up */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={isLoading}
                        className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
                        data-oid="mb8v.j2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" data-oid="5q:bz22">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                data-oid="lw.2e-m"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                data-oid="i6d5:7q"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                data-oid="b2k.40k"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                data-oid="rqtjsf."
                            />
                        </svg>
                        <span data-oid="vj-i35c">Continue with Google</span>
                    </button>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-400 mt-6" data-oid="-l:d_k1">
                        Already have an account?{' '}
                        <Link
                            href="/signin"
                            className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-300"
                            data-oid="w.3yt.f"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}