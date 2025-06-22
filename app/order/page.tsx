'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface OrderData {
    cardType: string;
    element: string;
    pokemonName: string;
    hp: string;
    moves: Array<{ name: string; damage: string; description: string }>;
    rarity: string;
    image: File | null;
    useAI: boolean;
    aiPrompt: string;
    personalMessage: string;
}

function CheckoutForm({ orderData, onSuccess }: { orderData: OrderData; onSuccess: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!stripe || !elements) return;
        
        setIsProcessing(true);
        setError(null);

        try {
            // Create order and get payment intent
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const { clientSecret, orderId, error: orderError } = await response.json();
            
            if (orderError) {
                setError(orderError);
                return;
            }

            // Confirm payment
            const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                }
            });

            if (paymentError) {
                setError(paymentError.message || 'Payment failed');
            } else {
                onSuccess();
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                    {error}
                </div>
            )}
            
            <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#ffffff',
                                '::placeholder': {
                                    color: '#9ca3af',
                                },
                            },
                        },
                    }}
                />
            </div>
            
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium text-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing...' : 
                    `Pay $${((3498 + (orderData.useAI ? 999 : 0)) / 100).toFixed(2)}`
                }
            </button>
        </form>
    );
}

export default function OrderPage() {
    // Fix the destructuring issue by providing fallback values
    const sessionResult = useSession();
    const session = sessionResult?.data || null;
    const status = sessionResult?.status || 'loading';
    
    const [currentStep, setCurrentStep] = useState(1);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderData, setOrderData] = useState<OrderData>({
        cardType: '',
        element: '',
        pokemonName: '',
        hp: '100',
        moves: [{ name: '', damage: '', description: '' }],
        rarity: 'Common',
        image: null,
        useAI: false,
        aiPrompt: '',
        personalMessage: '',
    });
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Show loading while checking authentication
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Show sign in if not authenticated
    if (!session) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
                    <p className="text-gray-300 mb-6">Please sign in to create your custom Pokémon card</p>
                    <button
                        onClick={() => signIn()}
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    // Show success page
    if (orderComplete) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Order Complete!</h2>
                    <p className="text-gray-300 mb-6">Your custom Pokémon card is being created. You'll receive an email when it's ready!</p>
                    <div className="space-y-3">
                        <Link href="/orders" className="block px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300">
                            View Order History
                        </Link>
                        <Link href="/" className="block px-6 py-3 border border-white/20 rounded-xl font-medium hover:bg-white/10 transition-all duration-300">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const cardTypes = ['Trainer', 'Pokemon', 'Energy', 'Item'];
    const elements = ['Fire', 'Water', 'Electric', 'Grass', 'Psychic', 'Fighting', 'Dark', 'Steel', 'Fairy', 'Dragon', 'Normal'];
    const rarities = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Legendary'];

    const handleInputChange = (field: keyof OrderData, value: any) => {
        setOrderData((prev) => ({ ...prev, [field]: value }));
    };

    const handleMoveChange = (index: number, field: string, value: string) => {
        const newMoves = [...orderData.moves];
        newMoves[index] = { ...newMoves[index], [field]: value };
        setOrderData((prev) => ({ ...prev, moves: newMoves }));
    };

    const addMove = () => {
        if (orderData.moves.length < 4) {
            setOrderData((prev) => ({
                ...prev,
                moves: [...prev.moves, { name: '', damage: '', description: '' }],
            }));
        }
    };

    const removeMove = (index: number) => {
        if (orderData.moves.length > 1) {
            const newMoves = orderData.moves.filter((_, i) => i !== index);
            setOrderData((prev) => ({ ...prev, moves: newMoves }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                setOrderData(prev => ({ ...prev, image: file }));
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setOrderData(prev => ({ ...prev, image: files[0] }));
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Card Details';
            case 2: return 'Moves & Abilities';
            case 3: return 'Image & AI Options';
            case 4: return 'Review & Payment';
            default: return 'Order Form';
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return orderData.cardType && orderData.element && orderData.pokemonName;
            case 2: return orderData.moves.some(move => move.name);
            case 3: return true; // Optional step
            case 4: return true;
            default: return false;
        }
    };

    const nextStep = () => {
        if (canProceed() && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
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
                    <Link href="/orders" className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                        Order History
                    </Link>
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Progress Steps */}
            <div className="relative z-10 py-8 pt-32">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="flex items-center justify-center mb-8">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                                    step <= currentStep
                                        ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white'
                                        : 'bg-white/10 text-gray-400'
                                }`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                                        step < currentStep
                                            ? 'bg-gradient-to-r from-amber-600 to-yellow-600'
                                            : 'bg-white/20'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                        {getStepTitle()}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className="relative z-10 py-8 px-8 min-h-[60vh]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                        {/* Step 1: Card Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-amber-300 mb-2">
                                            Card Type
                                        </label>
                                        <select
                                            value={orderData.cardType}
                                            onChange={(e) => handleInputChange('cardType', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option value="">Select type</option>
                                            {cardTypes.map((type) => (
                                                <option key={type} value={type} className="bg-gray-800">
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-amber-300 mb-2">
                                            Element
                                        </label>
                                        <select
                                            value={orderData.element}
                                            onChange={(e) => handleInputChange('element', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option value="">Select element</option>
                                            {elements.map((element) => (
                                                <option key={element} value={element} className="bg-gray-800">
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-amber-300 mb-2">
                                            Pokémon Name
                                        </label>
                                        <input
                                            type="text"
                                            value={orderData.pokemonName}
                                            onChange={(e) => handleInputChange('pokemonName', e.target.value)}
                                            placeholder="Enter Pokémon name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-amber-300 mb-2">
                                            HP
                                        </label>
                                        <input
                                            type="number"
                                            value={orderData.hp}
                                            onChange={(e) => handleInputChange('hp', e.target.value)}
                                            min="1"
                                            max="999"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-300 mb-2">
                                        Rarity
                                    </label>
                                    <select
                                        value={orderData.rarity}
                                        onChange={(e) => handleInputChange('rarity', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    >
                                        {rarities.map((rarity) => (
                                            <option key={rarity} value={rarity} className="bg-gray-800">
                                                {rarity}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Moves */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-amber-300">Add Moves</h3>
                                    {orderData.moves.length < 4 && (
                                        <button
                                            onClick={addMove}
                                            className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
                                        >
                                            Add Move
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {orderData.moves.map((move, index) => (
                                        <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="text-sm font-medium text-amber-300">
                                                    Move {index + 1}
                                                </h4>
                                                {orderData.moves.length > 1 && (
                                                    <button
                                                        onClick={() => removeMove(index)}
                                                        className="text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Move name"
                                                    value={move.name}
                                                    onChange={(e) => handleMoveChange(index, 'name', e.target.value)}
                                                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Damage (e.g., 50)"
                                                    value={move.damage}
                                                    onChange={(e) => handleMoveChange(index, 'damage', e.target.value)}
                                                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                />
                                            </div>
                                            <textarea
                                                placeholder="Move description"
                                                value={move.description}
                                                onChange={(e) => handleMoveChange(index, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full mt-3 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Image & AI Options */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-amber-300 mb-4">
                                        Reference Image (Optional)
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                            dragActive
                                                ? 'border-amber-500 bg-amber-500/10'
                                                : 'border-white/30 hover:border-white/50'
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        {orderData.image ? (
                                            <div className="space-y-2">
                                                <img
                                                    src={URL.createObjectURL(orderData.image)}
                                                    alt="Preview"
                                                    className="mx-auto max-h-32 rounded-lg"
                                                />
                                                <p className="text-sm text-gray-300">{orderData.image.name}</p>
                                                <button
                                                    onClick={() => setOrderData(prev => ({ ...prev, image: null }))}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="text-gray-300">Drag & drop an image or</p>
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
                                                >
                                                    Browse Files
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="useAI"
                                            checked={orderData.useAI}
                                            onChange={(e) => handleInputChange('useAI', e.target.checked)}
                                            className="w-4 h-4 text-amber-600 bg-white/5 border-white/20 rounded focus:ring-amber-500"
                                        />
                                        <label htmlFor="useAI" className="text-amber-300">
                                            Use AI for card creation (+$9.99)
                                        </label>
                                    </div>

                                    {orderData.useAI && (
                                        <div>
                                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                                AI Prompt
                                            </label>
                                            <textarea
                                                value={orderData.aiPrompt}
                                                onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
                                                placeholder="Describe how you want your card to look..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-300 mb-2">
                                        Personal Message (Optional)
                                    </label>
                                    <textarea
                                        value={orderData.personalMessage}
                                        onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                                        placeholder="Add a personal message to your card..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Payment */}
                        {currentStep === 4 && (
                            <Elements stripe={stripePromise}>
                                <div className="space-y-6">
                                    {/* Order Summary */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h3 className="text-xl font-semibold text-amber-300 mb-4">Order Summary</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span>Card Type:</span>
                                                <span>{orderData.cardType}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Element:</span>
                                                <span>{orderData.element}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Pokémon Name:</span>
                                                <span>{orderData.pokemonName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>HP:</span>
                                                <span>{orderData.hp}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Rarity:</span>
                                                <span>{orderData.rarity}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Moves:</span>
                                                <span>{orderData.moves.filter(move => move.name).length}</span>
                                            </div>
                                            <div className="border-t border-white/20 pt-3 mt-3">
                                                <div className="flex justify-between">
                                                    <span>Base Price:</span>
                                                    <span>$34.98</span>
                                                </div>
                                                {orderData.useAI && (
                                                    <div className="flex justify-between">
                                                        <span>AI Enhancement:</span>
                                                        <span>$9.99</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between font-semibold text-lg">
                                                    <span>Total:</span>
                                                    <span>${((3498 + (orderData.useAI ? 999 : 0)) / 100).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Form */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-amber-300 mb-4">Payment Information</h3>
                                        <CheckoutForm orderData={orderData} onSuccess={() => setOrderComplete(true)} />
                                    </div>
                                </div>
                            </Elements>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {currentStep > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                                >
                                    Previous
                                </button>
                            )}
                            
                            <div className="ml-auto">
                                {currentStep < 4 ? (
                                    <button
                                        onClick={nextStep}
                                        disabled={!canProceed()}
                                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
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