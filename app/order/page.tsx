'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

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

export default function OrderPage() {
    const [currentStep, setCurrentStep] = useState(1);
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
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const cardTypes = ['Trainer', 'Pokemon', 'Energy', 'Item'];
    const elements = [
        'Fire',
        'Water',
        'Electric',
        'Grass',
        'Psychic',
        'Fighting',
        'Dark',
        'Steel',
        'Fairy',
        'Dragon',
        'Normal',
    ];

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

    const handleStripeCheckout = async () => {
        setIsLoading(true);

        // Simulate Stripe integration
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Here you would integrate with Stripe
        console.log('Order data:', orderData);
        alert('Order placed successfully! (This is a demo)');

        setIsLoading(false);
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Card Details';
            case 2:
                return 'Upload Image';
            case 3:
                return 'AI Enhancement';
            case 4:
                return 'Review & Payment';
            default:
                return 'Order';
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

            case 2:
                return orderData.image !== null;
            case 3:
                return !orderData.useAI || orderData.aiPrompt.trim() !== '';
            case 4:
                return true;
            default:
                return false;
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden"
            data-oid="ltpifgh"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="jqh-dmu">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    data-oid="-.iusu1"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
                    data-oid="z7fmyuj"
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
                    data-oid="0nn-h_7"
                ></div>
            </div>

            {/* Navigation */}
            <nav
                className="relative z-50 py-6 px-8 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/10"
                data-oid="i_vo_qd"
            >
                <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    data-oid="0metlov"
                >
                    PokeCard Studio
                </Link>
                <div className="hidden md:flex space-x-8" data-oid="in6..yj">
                    <Link
                        href="/#gallery"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="4xbsaoo"
                    >
                        Gallery
                    </Link>
                    <Link
                        href="/#process"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="nm6a-tk"
                    >
                        Process
                    </Link>
                    <Link
                        href="/#contact"
                        className="hover:text-purple-400 transition-colors duration-300"
                        data-oid="-o_6rn_"
                    >
                        Contact
                    </Link>
                </div>
                <div className="flex items-center space-x-4" data-oid="4jtftfy">
                    <span className="text-sm text-gray-300" data-oid="2qe5ko6">
                        Welcome, Trainer!
                    </span>
                    <button
                        className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                        data-oid="pfsl1z1"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Progress Bar */}
            <div className="relative z-10 py-8 px-8" data-oid="wysf0fs">
                <div className="max-w-4xl mx-auto" data-oid="f6ao4rs">
                    <div className="flex items-center justify-between mb-8" data-oid="8054_b5">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center" data-oid="wl3gm35">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                        step <= currentStep
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'bg-white/10 text-gray-400'
                                    }`}
                                    data-oid="bnbi06y"
                                >
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`w-20 h-1 mx-4 transition-all duration-300 ${
                                            step < currentStep
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                                : 'bg-white/20'
                                        }`}
                                        data-oid="wdc0rwz"
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <h1
                        className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        data-oid="prtktfe"
                    >
                        {getStepTitle()}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className="relative z-10 py-8 px-8 min-h-[60vh]" data-oid="07ge5dk">
                <div className="max-w-4xl mx-auto" data-oid="0mq1oex">
                    <div
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
                        data-oid="gdxx4rf"
                    >
                        {/* Step 1: Card Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6" data-oid="x1ycenw">
                                <div className="grid md:grid-cols-2 gap-6" data-oid="qf._w00">
                                    <div data-oid="he3l_6q">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid="_urwyjw"
                                        >
                                            Card Type
                                        </label>
                                        <select
                                            value={orderData.cardType}
                                            onChange={(e) =>
                                                handleInputChange('cardType', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            data-oid="jg-wf15"
                                        >
                                            <option value="" data-oid="y4m9lhc">
                                                Select Type
                                            </option>
                                            {cardTypes.map((type) => (
                                                <option
                                                    key={type}
                                                    value={type}
                                                    className="bg-gray-800"
                                                    data-oid="n:lqpxg"
                                                >
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div data-oid="xq-p__u">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid="2mhczp8"
                                        >
                                            Element
                                        </label>
                                        <select
                                            value={orderData.element}
                                            onChange={(e) =>
                                                handleInputChange('element', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            data-oid="87sogcy"
                                        >
                                            <option value="" data-oid="c8i_ztr">
                                                Select Element
                                            </option>
                                            {elements.map((element) => (
                                                <option
                                                    key={element}
                                                    value={element}
                                                    className="bg-gray-800"
                                                    data-oid=":txin-g"
                                                >
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6" data-oid="zyjmxpd">
                                    <div data-oid="5_1yll-">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid=".yikol-"
                                        >
                                            Pokemon Name
                                        </label>
                                        <input
                                            type="text"
                                            value={orderData.pokemonName}
                                            onChange={(e) =>
                                                handleInputChange('pokemonName', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Your Pokemon name"
                                            data-oid="i781f2p"
                                        />
                                    </div>
                                    <div data-oid="6m5k8.k">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid="3zltkz8"
                                        >
                                            HP
                                        </label>
                                        <input
                                            type="number"
                                            value={orderData.hp}
                                            onChange={(e) =>
                                                handleInputChange('hp', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            min="10"
                                            max="300"
                                            data-oid="2:r-ngv"
                                        />
                                    </div>
                                    <div data-oid="09qfaz0">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid="::4hwqg"
                                        >
                                            Rarity
                                        </label>
                                        <select
                                            value={orderData.rarity}
                                            onChange={(e) =>
                                                handleInputChange('rarity', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            data-oid="ycqw-mu"
                                        >
                                            {rarities.map((rarity) => (
                                                <option
                                                    key={rarity}
                                                    value={rarity}
                                                    className="bg-gray-800"
                                                    data-oid="a4:vgc4"
                                                >
                                                    {rarity}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div data-oid="bivrzw_">
                                    <div
                                        className="flex items-center justify-between mb-4"
                                        data-oid="6q4eftm"
                                    >
                                        <label
                                            className="block text-sm font-medium text-purple-300"
                                            data-oid="nu.pbb_"
                                        >
                                            Moves (Max 4)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addMove}
                                            disabled={orderData.moves.length >= 4}
                                            className="px-4 py-2 bg-purple-600 rounded-lg text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            data-oid=":o8gbdy"
                                        >
                                            Add Move
                                        </button>
                                    </div>
                                    <div className="space-y-4" data-oid="93vww35">
                                        {orderData.moves.map((move, index) => (
                                            <div
                                                key={index}
                                                className="grid md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                                                data-oid="ayjdpuo"
                                            >
                                                <input
                                                    type="text"
                                                    value={move.name}
                                                    onChange={(e) =>
                                                        handleMoveChange(
                                                            index,
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Move name"
                                                    data-oid="d0pixfi"
                                                />

                                                <input
                                                    type="text"
                                                    value={move.damage}
                                                    onChange={(e) =>
                                                        handleMoveChange(
                                                            index,
                                                            'damage',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Damage (e.g., 50)"
                                                    data-oid=":w6z-hr"
                                                />

                                                <input
                                                    type="text"
                                                    value={move.description}
                                                    onChange={(e) =>
                                                        handleMoveChange(
                                                            index,
                                                            'description',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Description"
                                                    data-oid="dyhsh::"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => removeMove(index)}
                                                    disabled={orderData.moves.length <= 1}
                                                    className="px-3 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    data-oid="zv4an1q"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Upload Image */}
                        {currentStep === 2 && (
                            <div className="space-y-6" data-oid="y97x559">
                                <div className="text-center mb-6" data-oid="zv3mpq3">
                                    <p className="text-gray-300" data-oid="m68q1zd">
                                        Upload the image you'd like to use for your Pokemon card
                                    </p>
                                </div>

                                <div
                                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                                        dragActive
                                            ? 'border-purple-400 bg-purple-400/10'
                                            : 'border-white/20 hover:border-purple-400/50'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    data-oid="9l0o0kr"
                                >
                                    {orderData.image ? (
                                        <div className="space-y-4" data-oid="zh1:9yu">
                                            <div
                                                className="w-32 h-32 mx-auto rounded-xl overflow-hidden"
                                                data-oid="rj05gpg"
                                            >
                                                <img
                                                    src={URL.createObjectURL(orderData.image)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    data-oid="2olrb5f"
                                                />
                                            </div>
                                            <p
                                                className="text-purple-300 font-medium"
                                                data-oid="hg.vfea"
                                            >
                                                {orderData.image.name}
                                            </p>
                                            <button
                                                onClick={() => handleInputChange('image', null)}
                                                className="px-4 py-2 bg-red-600 rounded-lg text-sm hover:bg-red-700 transition-colors"
                                                data-oid="4zztqf6"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4" data-oid="05b0f.q">
                                            <div
                                                className="text-6xl text-purple-400"
                                                data-oid="jw9h4d:"
                                            >
                                                📸
                                            </div>
                                            <div data-oid="0kgqz20">
                                                <p
                                                    className="text-xl font-medium text-purple-300 mb-2"
                                                    data-oid="acx8eff"
                                                >
                                                    Drag and drop your image here
                                                </p>
                                                <p
                                                    className="text-gray-400 mb-4"
                                                    data-oid="ivxuep2"
                                                >
                                                    or
                                                </p>
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                                                    data-oid="iwq13e8"
                                                >
                                                    Choose File
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-400" data-oid="a5_w:ec">
                                                Supported formats: JPG, PNG, GIF (Max 10MB)
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileInput}
                                        className="hidden"
                                        data-oid="2.vo1p8"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: AI Enhancement */}
                        {currentStep === 3 && (
                            <div className="space-y-6" data-oid="le7som9">
                                <div className="text-center mb-6" data-oid="lq_hfr1">
                                    <h3
                                        className="text-2xl font-bold text-purple-300 mb-2"
                                        data-oid="z2lccjc"
                                    >
                                        AI Enhancement
                                    </h3>
                                    <p className="text-gray-300" data-oid="2s6zosg">
                                        Would you like us to transform your image using AI?
                                    </p>
                                </div>

                                <div
                                    className="flex items-center justify-center space-x-4 mb-6"
                                    data-oid=".wriekf"
                                >
                                    <label
                                        className="flex items-center space-x-3 cursor-pointer"
                                        data-oid="k5wjtou"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={orderData.useAI}
                                            onChange={(e) =>
                                                handleInputChange('useAI', e.target.checked)
                                            }
                                            className="w-5 h-5 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                                            data-oid="0k3a86k"
                                        />

                                        <span
                                            className="text-lg font-medium text-purple-300"
                                            data-oid="45y51ds"
                                        >
                                            Yes, transform my image with AI
                                        </span>
                                    </label>
                                </div>

                                {orderData.useAI && (
                                    <div className="space-y-4" data-oid="4s7t1jq">
                                        <label
                                            className="block text-sm font-medium text-purple-300 mb-2"
                                            data-oid="of03:zm"
                                        >
                                            AI Transformation Prompt
                                        </label>
                                        <textarea
                                            value={orderData.aiPrompt}
                                            onChange={(e) =>
                                                handleInputChange('aiPrompt', e.target.value)
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                                            placeholder="Describe how you'd like your image transformed (e.g., 'Transform me into an anime-style fire trainer with spiky hair and a confident expression, wearing a red jacket')"
                                            data-oid="ycy9hrv"
                                        />

                                        <p className="text-sm text-gray-400" data-oid="22ca-jj">
                                            Be specific about the style, clothing, expression, and
                                            any other details you'd like included.
                                        </p>
                                    </div>
                                )}

                                <div data-oid="09iii.i">
                                    <label
                                        className="block text-sm font-medium text-purple-300 mb-2"
                                        data-oid="5vn9.--"
                                    >
                                        Personal Message (Optional)
                                    </label>
                                    <textarea
                                        value={orderData.personalMessage}
                                        onChange={(e) =>
                                            handleInputChange('personalMessage', e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                                        placeholder="Add a personal message or special instructions for your card..."
                                        data-oid="70veypc"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review & Payment */}
                        {currentStep === 4 && (
                            <div className="space-y-6" data-oid="e95u18o">
                                <div className="text-center mb-6" data-oid="og.pl0v">
                                    <h3
                                        className="text-2xl font-bold text-purple-300 mb-2"
                                        data-oid="bo3zl.z"
                                    >
                                        Review Your Order
                                    </h3>
                                    <p className="text-gray-300" data-oid="06:12h-">
                                        Please review your custom Pokemon card details
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8" data-oid="me318bb">
                                    <div className="space-y-4" data-oid="fyljvom">
                                        <h4
                                            className="text-lg font-semibold text-purple-300"
                                            data-oid="xntl..4"
                                        >
                                            Card Details
                                        </h4>
                                        <div
                                            className="bg-white/5 rounded-xl p-4 space-y-2"
                                            data-oid="elngzxi"
                                        >
                                            <p data-oid="tm62wi8">
                                                <span className="text-gray-400" data-oid="lwgpirg">
                                                    Type:
                                                </span>{' '}
                                                {orderData.cardType}
                                            </p>
                                            <p data-oid="y36pubn">
                                                <span className="text-gray-400" data-oid="faub-df">
                                                    Element:
                                                </span>{' '}
                                                {orderData.element}
                                            </p>
                                            <p data-oid="8sldc0s">
                                                <span className="text-gray-400" data-oid="ic.b-sr">
                                                    Name:
                                                </span>{' '}
                                                {orderData.pokemonName}
                                            </p>
                                            <p data-oid="j:51b42">
                                                <span className="text-gray-400" data-oid="qrs-0ls">
                                                    HP:
                                                </span>{' '}
                                                {orderData.hp}
                                            </p>
                                            <p data-oid="m8j-.jx">
                                                <span className="text-gray-400" data-oid="4a8:vrf">
                                                    Rarity:
                                                </span>{' '}
                                                {orderData.rarity}
                                            </p>
                                        </div>

                                        <h4
                                            className="text-lg font-semibold text-purple-300"
                                            data-oid="vx1ixtw"
                                        >
                                            Moves
                                        </h4>
                                        <div
                                            className="bg-white/5 rounded-xl p-4 space-y-2"
                                            data-oid="ozg37fp"
                                        >
                                            {orderData.moves.map((move, index) => (
                                                <p key={index} data-oid="s--sb8m">
                                                    <span
                                                        className="text-purple-300"
                                                        data-oid="7_m-:.j"
                                                    >
                                                        {move.name}
                                                    </span>{' '}
                                                    - {move.damage} damage
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" data-oid="emip_1a">
                                        <h4
                                            className="text-lg font-semibold text-purple-300"
                                            data-oid="fqoc.bh"
                                        >
                                            Image & AI
                                        </h4>
                                        <div
                                            className="bg-white/5 rounded-xl p-4"
                                            data-oid="pibx3h8"
                                        >
                                            {orderData.image && (
                                                <div
                                                    className="w-32 h-32 mx-auto rounded-xl overflow-hidden mb-4"
                                                    data-oid="4_j4y0y"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(orderData.image)}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        data-oid="650q1w1"
                                                    />
                                                </div>
                                            )}
                                            <p data-oid="tod-0_t">
                                                <span className="text-gray-400" data-oid="ken9ga1">
                                                    AI Enhancement:
                                                </span>{' '}
                                                {orderData.useAI ? 'Yes' : 'No'}
                                            </p>
                                            {orderData.useAI && orderData.aiPrompt && (
                                                <p
                                                    className="text-sm text-gray-300 mt-2"
                                                    data-oid="hbuyia3"
                                                >
                                                    <span
                                                        className="text-gray-400"
                                                        data-oid="z9cm9bf"
                                                    >
                                                        AI Prompt:
                                                    </span>{' '}
                                                    {orderData.aiPrompt}
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-400/30"
                                            data-oid="1n6g2e9"
                                        >
                                            <h4
                                                className="text-xl font-bold text-purple-300 mb-4"
                                                data-oid="6qf.:e:"
                                            >
                                                Order Summary
                                            </h4>
                                            <div className="space-y-2" data-oid="564wr3t">
                                                <div
                                                    className="flex justify-between"
                                                    data-oid="xeth6s:"
                                                >
                                                    <span data-oid="im906ov">
                                                        Custom Pokemon Card
                                                    </span>
                                                    <span data-oid="navvzxt">$29.99</span>
                                                </div>
                                                {orderData.useAI && (
                                                    <div
                                                        className="flex justify-between"
                                                        data-oid="q9eg4mw"
                                                    >
                                                        <span data-oid="xo_czdb">
                                                            AI Enhancement
                                                        </span>
                                                        <span data-oid="nd7k3i4">$9.99</span>
                                                    </div>
                                                )}
                                                <div
                                                    className="flex justify-between"
                                                    data-oid=":cjq.ov"
                                                >
                                                    <span data-oid="ikh6aqj">Shipping</span>
                                                    <span data-oid="lvbuz7m">$4.99</span>
                                                </div>
                                                <hr
                                                    className="border-white/20"
                                                    data-oid="d8u.x6k"
                                                />
                                                <div
                                                    className="flex justify-between text-lg font-bold text-purple-300"
                                                    data-oid="1ilwx4k"
                                                >
                                                    <span data-oid="_exo.is">Total</span>
                                                    <span data-oid="2n:k7o.">
                                                        ${orderData.useAI ? '44.97' : '34.98'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center" data-oid="v6qtcyy">
                                    <button
                                        onClick={handleStripeCheckout}
                                        disabled={isLoading}
                                        className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        data-oid="192aknb"
                                    >
                                        {isLoading ? (
                                            <div
                                                className="flex items-center justify-center"
                                                data-oid="w4_d8m8"
                                            >
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    data-oid="rrphv:f"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        data-oid="dd.i1cr"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        data-oid="0elo7oh"
                                                    ></path>
                                                </svg>
                                                Processing Payment...
                                            </div>
                                        ) : (
                                            'Complete Order with Stripe'
                                        )}
                                    </button>
                                    <p className="text-sm text-gray-400 mt-4" data-oid="nm_6:7i">
                                        Secure payment powered by Stripe
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8" data-oid="97x:mae">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 border-2 border-purple-400 rounded-xl font-medium hover:bg-purple-400 hover:text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            data-oid="em8anp8"
                        >
                            Previous
                        </button>

                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                data-oid="4oeic3x"
                            >
                                Next Step
                            </button>
                        ) : null}
                    </div>
                </div>
            </section>

            <style jsx data-oid="s_5ocy6">{`
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
