'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Order } from '@/lib/supabase';

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchOrders();
        }
    }, [session]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (data.orders) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'text-green-400 bg-green-400/20';
            case 'processing': return 'text-blue-400 bg-blue-400/20';
            case 'completed': return 'text-purple-400 bg-purple-400/20';
            case 'cancelled': return 'text-red-400 bg-red-400/20';
            default: return 'text-yellow-400 bg-yellow-400/20';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
                    <p className="text-gray-300 mb-6">Please sign in to view your order history</p>
                    <Link href="/api/auth/signin" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Navigation */}
            <nav className="relative z-20 flex items-center justify-between p-6">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    PokéCards
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/order" className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                        Create New Card
                    </Link>
                    <Link href="/api/auth/signout" className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                        Sign Out
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Order History
                </h1>
                <p className="text-gray-300 text-lg">
                    Track your custom Pokémon card orders
                </p>
            </div>

            {/* Orders List */}
            <div className="max-w-6xl mx-auto px-6 pb-12">
                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No orders yet</h3>
                        <p className="text-gray-400 mb-6">You haven't created any custom Pokémon cards yet</p>
                        <Link href="/order" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                            Create Your First Card
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">
                                                {order.pokemon_name}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-400">Type:</span>
                                                <div className="text-white font-medium">{order.card_type}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Element:</span>
                                                <div className="text-white font-medium">{order.element}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">HP:</span>
                                                <div className="text-white font-medium">{order.hp}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Rarity:</span>
                                                <div className="text-white font-medium">{order.rarity}</div>
                                            </div>
                                        </div>

                                        {order.use_ai && (
                                            <div className="mt-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-500/20 text-purple-300">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                    </svg>
                                                    AI Enhanced
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="lg:text-right">
                                        <div className="text-2xl font-bold text-white mb-1">
                                            ${(order.total_amount / 100).toFixed(2)}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {formatDate(order.created_at)}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details Expandable */}
                                <details className="mt-4">
                                    <summary className="cursor-pointer text-purple-300 hover:text-purple-200 text-sm font-medium">
                                        View Details
                                    </summary>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium text-purple-300 mb-2">Moves</h5>
                                                <div className="space-y-2">
                                                    {(order as any).order_moves?.map((move: any, index: number) => (
                                                        <div key={move.id} className="bg-white/5 rounded-lg p-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-medium text-white">{move.name}</span>
                                                                <span className="text-sm text-purple-300">{move.damage} damage</span>
                                                            </div>
                                                            {move.description && (
                                                                <p className="text-sm text-gray-300">{move.description}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                {order.personal_message && (
                                                    <div className="mb-4">
                                                        <h5 className="font-medium text-purple-300 mb-2">Personal Message</h5>
                                                        <p className="text-gray-300 bg-white/5 rounded-lg p-3">
                                                            {order.personal_message}
                                                        </p>
                                                    </div>
                                                )}
                                                
                                                {order.use_ai && order.ai_prompt && (
                                                    <div>
                                                        <h5 className="font-medium text-purple-300 mb-2">AI Enhancement Prompt</h5>
                                                        <p className="text-gray-300 bg-white/5 rounded-lg p-3">
                                                            {order.ai_prompt}
                                                        </p>
                                                    </div>
                                                )}

                                                {(order as any).order_images?.length > 0 && (
                                                    <div className="mt-4">
                                                        <h5 className="font-medium text-purple-300 mb-2">Uploaded Images</h5>
                                                        <div className="space-y-2">
                                                            {(order as any).order_images.map((image: any) => (
                                                                <div key={image.id} className="text-sm text-gray-300">
                                                                    📎 {image.file_name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}