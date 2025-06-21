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
            
            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                    {error}
                </div>
            )}
            
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isProcessing ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </div>
                ) : (
                    `Pay $${((3498 + (orderData.useAI ? 999 : 0)) / 100).toFixed(2)}`
                )}
            </button>
        </form>
    );
}

export default function OrderPage() {
    const { data: session, status } = useSession();
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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Show sign in if not authenticated
    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
                    <p className="text-gray-300 mb-6">Please sign in to create your custom Pokémon card</p>
                    <button
                        onClick={() => signIn()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Order Complete!</h2>
                    <p className="text-gray-300 mb-6">Your custom Pokémon card is being created. You'll receive an email when it's ready!</p>
                    <div className="space-y-3">
                        <Link href="/orders" className="block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
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

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            setOrderData((prev) => ({ ...prev, image: file }));
        } else {
            alert('Please upload an image file');
        }
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Card Details';
            case 2: return 'Upload Image';
            case 3: return 'AI Enhancement';
            case 4: return 'Review & Payment';
            default: return 'Order';
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return (
                    orderData.cardType &&
                    orderData.element &&
                    orderData.pokemonName &&
                    orderData.moves.every((move) => move.name && move.damage)
                );
            case 2: return orderData.image !== null;
            case 3: return !orderData.useAI || orderData.aiPrompt.trim() !== '';
            case 4: return true;
            default: return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="relative z-20 flex items-center justify-between p-6">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    PokéCards
                </Link>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">Welcome, {session.user?.name || session.user?.email}</span>
                    <Link href="/orders" className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300">
                        Order History
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Progress Bar */}
            <div className="relative z-10 py-8 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                    step <= currentStep
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                        : 'bg-white/10 text-gray-400'
                                }`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`w-20 h-1 mx-4 transition-all duration-300 ${
                                        step < currentStep
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                            : 'bg-white/20'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                                        <label className="block text-sm font-medium text-purple-300 mb-2">
                                            Card Type
                                        </label>
                                        <select
                                            value={orderData.cardType}
                                            onChange={(e) => handleInputChange('cardType', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                        <label className="block text-sm font-medium text-purple-300 mb-2">
                                            Element
                                        </label>
                                        <select
                                            value={orderData.element}
                                            onChange={(e) => handleInputChange('element', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                        <label className="block text-sm font-medium text-purple-300 mb-2">
                                            Pokémon Name
                                        </label>
                                        <input
                                            type="text"
                                            value={orderData.pokemonName}
                                            onChange={(e) => handleInputChange('pokemonName', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Enter Pokémon name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-purple-300 mb-2">
                                            HP
                                        </label>
                                        <input
                                            type="number"
                                            value={orderData.hp}
                                            onChange={(e) => handleInputChange('hp', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">
                                        Rarity
                                    </label>
                                    <select
                                        value={orderData.rarity}
                                        onChange={(e) => handleInputChange('rarity', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        {rarities.map((rarity) => (
                                            <option key={rarity} value={rarity} className="bg-gray-800">
                                                {rarity}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Moves */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block text-sm font-medium text-purple-300">
                                            Moves
                                        </label>
                                        {orderData.moves.length < 4 && (
                                            <button
                                                onClick={addMove}
                                                className="px-3 py-1 text-sm bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                Add Move
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        {orderData.moves.map((move, index) => (
                                            <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="text-sm font-medium text-purple-300">
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
                                                        className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Damage (e.g., 50)"
                                                        value={move.damage}
                                                        onChange={(e) => handleMoveChange(index, 'damage', e.target.value)}
                                                        className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <textarea
                                                    placeholder="Move description (optional)"
                                                    value={move.description}
                                                    onChange={(e) => handleMoveChange(index, 'description', e.target.value)}
                                                    className="w-full mt-3 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Upload Image */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Upload Your Image</h3>
                                    <p className="text-gray-300">
                                        Upload an image that will be used for your custom Pokémon card
                                    </p>
                                </div>

                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                                        dragActive
                                            ? 'border-purple-400 bg-purple-400/10'
                                            : 'border-white/20 hover:border-purple-400'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileInput}
                                        className="hidden"
                                    />

                                    {orderData.image ? (
                                        <div>
                                            <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden">
                                                <img
                                                    src={URL.createObjectURL(orderData.image)}
                                                    alt="Uploaded"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="text-green-400 font-medium mb-2">
                                                ✓ {orderData.image.name}
                                            </p>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                                            >
                                                Change Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-300 mb-4">
                                                Drag and drop your image here, or{' '}
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-purple-400 hover:text-purple-300 underline"
                                                >
                                                    browse files
                                                </button>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Supported formats: JPG, PNG, GIF (Max 10MB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: AI Enhancement */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-purple-300 mb-2">AI Enhancement</h3>
                                    <p className="text-gray-300">
                                        Add AI-powered enhancements to make your card even more special
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="useAI"
                                        checked={orderData.useAI}
                                        onChange={(e) => handleInputChange('useAI', e.target.checked)}
                                        className="w-5 h-5 text-purple-600 bg-transparent border-2 border-white/20 rounded focus:ring-purple-500"
                                    />
                                    <div>
                                        <label htmlFor="useAI" className="font-medium text-purple-300 cursor-pointer">
                                            Enable AI Enhancement (+$9.99)
                                        </label>
                                        <p className="text-sm text-gray-400">
                                            AI will enhance your image and add special effects
                                        </p>
                                    </div>
                                </div>

                                {orderData.useAI && (
                                    <div>
                                        <label className="block text-sm font-medium text-purple-300 mb-2">
                                            AI Enhancement Prompt
                                        </label>
                                        <textarea
                                            value={orderData.aiPrompt}
                                            onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                                            placeholder="Describe how you want AI to enhance your card (e.g., 'Add magical sparkles and glowing effects', 'Make it look more dynamic and powerful')"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-purple-300 mb-2">
                                        Personal Message (Optional)
                                    </label>
                                    <textarea
                                        value={orderData.personalMessage}
                                        onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                                        placeholder="Add a personal message or special instructions for your card..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Payment */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Review Your Order</h3>
                                    <p className="text-gray-300">
                                        Please review your custom Pokémon card details before payment
                                    </p>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Order Summary</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Card Type:</span>
                                            <span className="text-white">{orderData.cardType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Element:</span>
                                            <span className="text-white">{orderData.element}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Pokémon Name:</span>
                                            <span className="text-white">{orderData.pokemonName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">HP:</span>
                                            <span className="text-white">{orderData.hp}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Rarity:</span>
                                            <span className="text-white">{orderData.rarity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-300">Moves:</span>
                                            <span className="text-white">{orderData.moves.length}</span>
                                        </div>
                                        {orderData.useAI && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">AI Enhancement:</span>
                                                <span className="text-green-400">✓ Enabled</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-white/10 mt-4 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">Base Price:</span>
                                            <span className="text-white">$34.98</span>
                                        </div>
                                        {orderData.useAI && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">AI Enhancement:</span>
                                                <span className="text-white">$9.99</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t border-white/10">
                                            <span className="text-purple-300">Total:</span>
                                            <span className="text-white">
                                                ${((3498 + (orderData.useAI ? 999 : 0)) / 100).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Form */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Payment Information</h4>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm 
                                            orderData={orderData} 
                                            onSuccess={() => setOrderComplete(true)} 
                                        />
                                    </Elements>
                                    <p className="text-sm text-gray-400 mt-4 text-center">
                                        Secure payment powered by Stripe
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 border-2 border-purple-400 rounded-xl font-medium hover:bg-purple-400 hover:text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        {currentStep < 4 && (
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}