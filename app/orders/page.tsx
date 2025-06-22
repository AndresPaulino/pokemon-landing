'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

import Link from 'next/link';

interface Order {
    id: string;
    pokemon_name: string;
    card_type: string;
    element: string;
    hp: string;
    rarity: string;
    status: string;
    total_amount: number;
    created_at: string;
    use_ai: boolean;
    personal_message?: string;
    order_images?: Array<{
        id: string;
        image_url: string;
        image_type: string;
    }>;
}

export default function OrdersPage() {
    // Fix the destructuring issue by providing fallback values
    const sessionResult = useSession();
    const session = sessionResult?.data || null;
    const status = sessionResult?.status || 'loading';
    
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
            case 'completed': return 'text-amber-400 bg-amber-400/20';
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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
                    <p className="text-gray-300 mb-6">Please sign in to view your order history</p>
                    <Link href="/api/auth/signin" className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm py-6 px-8 flex justify-between items-center">
                <Link
                    href="/"
                    className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
                >
                    <img src="/logo/PokePrint-Me-Logo.png" alt="PokePrint Me" className="w-25 h-16" />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/order" className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                        Create New Card
                    </Link>
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Header */}
            <div className="text-center py-12 pt-32">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">
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
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                            <p className="text-gray-300 mb-6">You haven't created any custom cards yet.</p>
                            <Link 
                                href="/order" 
                                className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300"
                            >
                                Create Your First Card
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-1">
                                                    {order.pokemon_name}
                                                </h3>
                                                <p className="text-amber-300 text-sm">
                                                    {order.card_type} • {order.element} • {order.hp} HP
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-400">Rarity:</span>
                                                <p className="text-white font-medium">{order.rarity}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">AI Enhanced:</span>
                                                <p className="text-white font-medium">{order.use_ai ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Total:</span>
                                                <p className="text-white font-medium">${(order.total_amount / 100).toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Ordered:</span>
                                                <p className="text-white font-medium">{formatDate(order.created_at)}</p>
                                            </div>
                                        </div>
                                        
                                        {order.personal_message && (
                                            <div className="mt-4 p-3 bg-white/5 rounded-xl">
                                                <span className="text-gray-400 text-xs">Personal Message:</span>
                                                <p className="text-white text-sm mt-1">{order.personal_message}</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {order.order_images && order.order_images.length > 0 && (
                                        <div className="flex gap-2">
                                            {order.order_images.slice(0, 3).map((image) => (
                                                <img
                                                    key={image.id}
                                                    src={image.image_url}
                                                    alt="Order reference"
                                                    className="w-16 h-16 object-cover rounded-lg border border-white/20"
                                                />
                                            ))}
                                            {order.order_images.length > 3 && (
                                                <div className="w-16 h-16 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">+{order.order_images.length - 3}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <style jsx>{`
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