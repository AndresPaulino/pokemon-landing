'use client';

import { useState, useEffect } from 'react';
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarLogo,
    NavbarButton,
} from '@/components/ui/resizable-navbar';
import { DraggableCardBody, DraggableCardContainer } from '@/components/ui/draggable-card';

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Gallery', link: '#gallery' },
        { name: 'Process', link: '#process' },
        { name: 'Contact', link: '#contact' },
    ];

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cardExamples = [
        {
            id: 1,
            title: 'Asher',
            image: '/images/Asher.png',
            className: 'absolute top-10 left-[20%]',
            initialRotation: -6,
        },
        {
            id: 2,
            title: 'Estee',
            image: '/images/Estee.png',
            className: 'absolute top-40 left-[25%]',
            initialRotation: 9,
        },
        {
            id: 3,
            title: 'Hector',
            image: '/images/Hector.png',
            className: 'absolute top-5 left-[40%]',
            initialRotation: -4,
        },
        {
            id: 4,
            title: 'Rave_Estee',
            image: '/images/Rave_Estee.png',
            className: 'absolute top-32 left-[55%]',
            initialRotation: 13,
        },
        {
            id: 5,
            title: 'Rave_Lukas',
            image: '/images/Rave_Lukas.png',
            className: 'absolute top-20 right-[35%]',
            initialRotation: -7,
        },
        {
            id: 6,
            title: 'Olivia',
            image: '/images/Olivia.png',
            className: 'absolute top-24 left-[45%]',
            initialRotation: 3,
        },
        {
            id: 7,
            title: 'Juliette',
            image: '/images/Juliette.png',
            className: 'absolute top-8 left-[30%]',
            initialRotation: -10,
        },
    ];

    const features = [
        {
            icon: '🎨',
            title: 'AI Anime Transformation',
            description: 'Your photo transformed into stunning anime-style artwork',
        },
        {
            icon: '🃏',
            title: 'Custom Pokemon Cards',
            description: 'Professionally designed cards with your unique character',
        },
        {
            icon: '✋',
            title: 'Handcrafted Quality',
            description: 'Each card is carefully crafted by hand for premium quality',
        },
        {
            icon: '🚚',
            title: 'Fast Shipping',
            description: 'Delivered to your door within 5-7 business days',
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden"
            data-oid="kzqzfo5"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" data-oid="qqag05k">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    data-oid="pl82.tm"
                ></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
                    data-oid="5af-1uk"
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
                    data-oid="d3tnbns"
                ></div>
            </div>

            {/* Navigation */}
            <Navbar className="fixed top-0 left-0 right-0 z-50" data-oid="fl4::ck">
                <NavBody data-oid="psq.1:a">
                    <a
                        href="#"
                        className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
                        data-oid="9pa9-t4"
                    >
                        <div
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                            data-oid="beek17h"
                        >
                            PokePrint Co.
                        </div>
                    </a>
                    <NavItems items={navItems} data-oid="lh3aizi" />
                    <NavbarButton
                        variant="gradient"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        data-oid="6xu8a0t"
                    >
                        Order Now
                    </NavbarButton>
                </NavBody>

                <MobileNav data-oid="6hbk2qo">
                    <MobileNavHeader data-oid="2prncbv">
                        <a
                            href="#"
                            className="flex items-center space-x-2 px-2 py-1 text-sm font-normal"
                            data-oid="a9.7vw-"
                        >
                            <div
                                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                data-oid="utjmb2w"
                            >
                                PokePrint Co.
                            </div>
                        </a>
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            data-oid="4lxnzcf"
                        />
                    </MobileNavHeader>
                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                        data-oid="7mvi_t:"
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className="text-neutral-700 dark:text-neutral-300 hover:text-purple-400 transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                                data-oid="g1x:avw"
                            >
                                {item.name}
                            </a>
                        ))}
                        <NavbarButton
                            variant="gradient"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-4"
                            data-oid="xuekzh3"
                        >
                            Order Now
                        </NavbarButton>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Hero Section */}
            <section
                className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-24"
                data-oid="w_opkng"
                key="olk-4H9F"
            >
                <div
                    className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    data-oid="lqouza2"
                >
                    <h1
                        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight"
                        data-oid="htjvynx"
                    >
                        Transform Into
                        <br data-oid="2.31jsv" />
                        <span className="text-yellow-400" data-oid="4lqa8h_">
                            Pokemon Master
                        </span>
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                        data-oid="vw9swq9"
                    >
                        Send us your photo and watch as we transform you into an anime-style Pokemon
                        trainer on a custom, handcrafted card
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        data-oid=":nfoc8w"
                    >
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                            data-oid="st0y3o5"
                        >
                            Create My Card
                        </button>
                        <button
                            className="px-8 py-4 border-2 border-purple-400 rounded-full text-lg font-semibold hover:bg-purple-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                            data-oid="juncul2"
                        >
                            View Gallery
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-20 px-8" data-oid=":k_zdk8">
                <div className="max-w-6xl mx-auto" data-oid="u9t:m.n">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        data-oid="mk58.8w"
                    >
                        Why Choose Us?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="a5aiceh">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                                data-oid="jzyp_nt"
                            >
                                <div
                                    className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                    data-oid="aum:0hy"
                                >
                                    {feature.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3 text-purple-300"
                                    data-oid="ep45_0o"
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                                    data-oid="v_9-:xy"
                                >
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="relative z-10 py-20 px-8" data-oid="0igre86">
                <div className="max-w-7xl mx-auto" data-oid="rw3dxxh">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        data-oid="z1v6blt"
                    >
                        Our Creations
                    </h2>
                    <p className="text-center text-gray-300 mb-12 text-lg" data-oid="-i5jxbq">
                        Drag the cards to explore our amazing Pokemon trainer transformations! Cards
                        are stacked - drag the top one to reveal others below.
                    </p>

                    <DraggableCardContainer
                        className="relative flex min-h-screen w-full items-center justify-center overflow-clip rounded-2xl"
                        data-oid="vvhfdlg"
                    >
                        {cardExamples.map((card, index) => (
                            <DraggableCardBody
                                key={card.id}
                                className={card.className}
                                initialRotation={card.initialRotation}
                                data-oid=":saj-h0"
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="pointer-events-none relative z-10 h-full w-full object-cover rounded-md"
                                    data-oid="ixpt_ox"
                                />
                            </DraggableCardBody>
                        ))}
                    </DraggableCardContainer>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="relative z-10 py-20 px-8" data-oid="gzb1f:0">
                <div className="max-w-4xl mx-auto text-center" data-oid="ajxl8:t">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        data-oid="a5:_09r"
                    >
                        How It Works
                    </h2>
                    <div className="space-y-12" data-oid="3idx7v_">
                        <div
                            className="flex flex-col md:flex-row items-center gap-8"
                            data-oid="-riexc5"
                        >
                            <div className="flex-1 text-left" data-oid="gioxtxj">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold mb-4"
                                    data-oid="slo1c:c"
                                >
                                    1
                                </div>
                                <h3
                                    className="text-2xl font-semibold mb-3 text-purple-300"
                                    data-oid="4pwqjny"
                                >
                                    Upload Your Photo
                                </h3>
                                <p className="text-gray-400" data-oid="n_ug_u7">
                                    Send us a clear photo of yourself that you'd like transformed
                                    into anime style
                                </p>
                            </div>
                            <div className="flex-1" data-oid="h6eq94_">
                                <div
                                    className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-white/10 flex items-center justify-center"
                                    data-oid="vwwufq7"
                                >
                                    <span className="text-6xl" data-oid="spk4djy">
                                        📸
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-col md:flex-row-reverse items-center gap-8"
                            data-oid="98r9yyh"
                        >
                            <div className="flex-1 text-left" data-oid="s_37wmp">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold mb-4"
                                    data-oid="gsvmyum"
                                >
                                    2
                                </div>
                                <h3
                                    className="text-2xl font-semibold mb-3 text-purple-300"
                                    data-oid="smaae1m"
                                >
                                    AI Transformation
                                </h3>
                                <p className="text-gray-400" data-oid="am7.b7l">
                                    Our AI transforms your photo into stunning anime-style artwork
                                    perfect for a Pokemon card
                                </p>
                            </div>
                            <div className="flex-1" data-oid="7g5.lq9">
                                <div
                                    className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-white/10 flex items-center justify-center"
                                    data-oid="3zf95_p"
                                >
                                    <span className="text-6xl" data-oid="7qbxc9y">
                                        🎨
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-col md:flex-row items-center gap-8"
                            data-oid="98ox6sk"
                        >
                            <div className="flex-1 text-left" data-oid="etb6_so">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-bold mb-4"
                                    data-oid="ts..o36"
                                >
                                    3
                                </div>
                                <h3
                                    className="text-2xl font-semibold mb-3 text-purple-300"
                                    data-oid="xpdtaz:"
                                >
                                    Handcrafted & Shipped
                                </h3>
                                <p className="text-gray-400" data-oid=":h00ady">
                                    We carefully craft your custom Pokemon card by hand and ship it
                                    within 5-7 business days
                                </p>
                            </div>
                            <div className="flex-1" data-oid="y66m0n7">
                                <div
                                    className="w-full h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-white/10 flex items-center justify-center"
                                    data-oid="5gua.wo"
                                >
                                    <span className="text-6xl" data-oid="i_ia-k9">
                                        🚚
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-8" data-oid="auc97fp">
                <div className="max-w-4xl mx-auto text-center" data-oid="9onclco">
                    <div
                        className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
                        data-oid="ojz7qx7"
                    >
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                            data-oid="afr6hxs"
                        >
                            Ready to Become a Pokemon Master?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8" data-oid="bea3s5.">
                            Transform your photo into an epic Pokemon card today!
                        </p>
                        <button
                            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                            data-oid="s14s0v6"
                        >
                            Start Your Transformation
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="relative z-10 border-t border-white/10 py-12 px-8"
                data-oid="nq8z9z7"
            >
                <div className="max-w-6xl mx-auto text-center" data-oid="yhkce95">
                    <div
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                        data-oid="2t3jhqc"
                    >
                        PokePrint Co.
                    </div>
                    <p className="text-gray-400 mb-6" data-oid="a-y24f-">
                        Creating magical Pokemon cards, one transformation at a time
                    </p>
                    <div className="flex justify-center space-x-6" data-oid="b:a1x.r">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            data-oid="_4i-gtp"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            data-oid="yp83kaz"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            data-oid="h3s9s04"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </footer>

            <style jsx data-oid="x8n9ztw">{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}
