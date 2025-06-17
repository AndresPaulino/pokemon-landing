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
import { Camera, Sparkles, Package, Settings, Zap } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { WavyBackground } from '@/components/ui/wavy-background';
import { GlareCard } from '@/components/ui/glare-card';
import { Compare } from '@/components/ui/compare';
import { HolographicCard } from '@/components/ui/holographic-card';

function HowItWorksGrid() {
    return (
        <ul
            className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
            data-oid="9lf2a97"
        >
            <ProcessGridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={
                    <Camera
                        className="h-4 w-4 text-yellow-500 dark:text-neutral-400"
                        data-oid="e7jb36p"
                    />
                }
                title="Upload Your Photo"
                description="Send us a clear photo of yourself that you'd like transformed into stunning anime-style artwork"
                data-oid="hfgchf5"
            />

            <ProcessGridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={
                    <Sparkles
                        className="h-4 w-4 text-yellow-500 dark:text-neutral-400"
                        data-oid="l3jcs-0"
                    />
                }
                title="AI Anime Transformation"
                description="Our advanced AI transforms your photo into beautiful anime-style artwork perfect for a Pokémon card"
                data-oid="8-6:rmv"
            />

            <ProcessGridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={
                    <Settings
                        className="h-4 w-4 text-yellow-500 dark:text-neutral-400"
                        data-oid="d0ax1xl"
                    />
                }
                title="Custom Card Design"
                description="We design your unique Pokémon card with custom stats, moves, and Pokémon details"
                data-oid="mwep6g-"
            />

            <ProcessGridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={
                    <Zap
                        className="h-4 w-4 text-yellow-500 dark:text-neutral-400"
                        data-oid="i2blec_"
                    />
                }
                title="Premium Quality Print"
                description="Each card is printed on high-quality cardstock with professional finishes for an authentic feel"
                data-oid="htljvez"
            />

            <ProcessGridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={
                    <Package
                        className="h-4 w-4 text-yellow-500 dark:text-neutral-400"
                        data-oid="q.m743:"
                    />
                }
                title="Fast & Secure Shipping"
                description="Your custom Pokémon card is carefully packaged and shipped within 5-7 business days"
                data-oid="bjoxktv"
            />
        </ul>
    );
}

interface ProcessGridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const ProcessGridItem = ({ area, icon, title, description }: ProcessGridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`} data-oid="a:t91ve">
            <div
                className="relative h-full rounded-2xl border border-amber-500/20 p-2 md:rounded-3xl md:p-3"
                data-oid="8o3xy-5"
            >
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    data-oid="qymwgnt"
                />

                <div
                    className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 md:p-6 shadow-2xl shadow-amber-500/5"
                    data-oid="qyz86ga"
                >
                    <div
                        className="relative flex flex-1 flex-col justify-between gap-3"
                        data-oid="zrob8:y"
                    >
                        <div
                            className="w-fit rounded-lg border border-amber-400/50 bg-amber-500/10 p-2"
                            data-oid="5xgf4rx"
                        >
                            {icon}
                        </div>
                        <div className="space-y-3" data-oid="vfxw1jg">
                            <h3
                                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-amber-300 md:text-2xl/[1.875rem]"
                                data-oid="b_3ofi0"
                            >
                                {title}
                            </h3>
                            <h2
                                className="font-sans text-sm/[1.125rem] text-gray-400 md:text-base/[1.375rem] leading-relaxed [&_b]:md:font-semibold [&_strong]:md:font-semibold"
                                data-oid="2krv0ft"
                            >
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

function CompareDemo() {
    return (
        <div className="rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200/25 dark:border-neutral-800/50 shadow-2xl shadow-amber-500/5 p-2">
            <Compare
                firstImage="/images/Hector_Original.png"
                secondImage="/images/Hector.png"
                firstImageClassName="object-cover [object-position:left_35px_top]"
                secondImageClassname="object-cover object-left-top"
                className="min-h-96 w-80"
                slideMode="hover"
            />
        </div>
    );
}

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Gallery', link: '#gallery' },
        { name: 'Process', link: '#process' },
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

    const holographicCardExamples = [
        {
            id: 1,
            variant: 'charizard',
            title: 'Charizard',
            image: 'https://assets.codepen.io/13471/charizard-gx.webp',
        },
        {
            id: 2,
            variant: 'pikachu',
            title: 'Pikachu',
            image: 'https://assets.codepen.io/13471/pikachu-gx.webp',
        },
        {
            id: 3,
            variant: 'eevee',
            title: 'Eevee',
            image: 'https://assets.codepen.io/13471/eevee-gx.webp',
        },
        {
            id: 4,
            variant: 'mewtwo',
            title: 'Mewtwo',
            image: 'https://assets.codepen.io/13471/mewtwo-gx.webp',
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
        <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden" data-oid="kzqzfo5">
            {/* Navigation */}
            <Navbar
                className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm"
                data-oid="fl4::ck"
            >
                <NavBody data-oid="psq.1:a">
                    <a
                        href="#"
                        className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
                        data-oid="9pa9-t4"
                    >
                        <div
                            className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                            data-oid="beek17h"
                        >
                            PokePrint Me
                        </div>
                    </a>
                    <NavItems items={navItems} data-oid="lh3aizi" />
                    <NavbarButton
                        variant="gradient"
                        className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-semibold"
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
                                className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                                data-oid="utjmb2w"
                            >
                                PokePrint Me
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
                                className="text-neutral-700 dark:text-neutral-300 hover:text-amber-400 transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                                data-oid="g1x:avw"
                            >
                                {item.name}
                            </a>
                        ))}
                        <NavbarButton
                            variant="gradient"
                            className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-semibold mt-4"
                            data-oid="xuekzh3"
                        >
                            Order Now
                        </NavbarButton>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            {/* Hero Section */}
            <section className="relative z-10 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center">
                <WavyBackground
                    className="max-w-4xl mx-auto"
                    backgroundFill="#0f172a"
                    colors={['#fbbf24', '#fde68a', '#f59e42', '#64748b', '#1e293b']}
                    waveOpacity={0.4}
                    waveWidth={80}
                    blur={16}
                    speed="fast"
                >
                    <div className="max-w-3xl mx-auto text-center py-24">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg pb-2 leading-[1.15]">
                            Transform Your Photo into a Pokémon Card
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
                            Create your own custom Pokémon trainer card with AI-powered anime
                            transformation. Unique, personal, and crafted just for you!
                        </p>
                        <button className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-full text-lg font-bold hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25">
                            Get Started
                        </button>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-full mt-10 mx-auto"></div>
                    </div>
                </WavyBackground>
            </section>

            <div className="flex flex-wrap gap-4">
                {holographicCardExamples.map((card) => (
                    <HolographicCard key={card.id} variant={card.variant as any}>
                        <img src={card.image} alt={card.title} />
                    </HolographicCard>
                ))}
            </div>

            {/* Compare Demo Section */}
            <div className="w-full flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 text-center drop-shadow-lg pb-2 leading-[1.15]">
                    Before & After: AI Anime Transformation
                </h2>
                <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
                    See the magic of our AI transformation in action! Slide to compare the original
                    photo with the anime-style card.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-full mb-8"></div>
                <CompareDemo />
            </div>

            {/* Features Section */}
            <section
                className="relative z-10 py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800"
                data-oid=":k_zdk8"
            >
                <div className="max-w-6xl mx-auto" data-oid="u9t:m.n">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent pb-2 leading-[1.15]"
                        data-oid="mk58.8w"
                    >
                        Premium Excellence
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="a5aiceh">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="relative group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-amber-500/20 hover:border-amber-400/40 hover:bg-gradient-to-br hover:from-slate-700/90 hover:to-slate-800/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
                                data-oid="jzyp_nt"
                            >
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                />
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-amber-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section
                id="gallery"
                className="relative z-10 py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-900"
                data-oid="0igre86"
            >
                <div className="max-w-7xl mx-auto" data-oid="rw3dxxh">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent pb-2 leading-[1.15]"
                        data-oid="z1v6blt"
                    >
                        Gallery
                    </h2>
                    <p className="text-center text-gray-300 mb-12 text-lg" data-oid="-i5jxbq">
                        Drag the cards to check out some of our Pokemon Card transformations!
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
                                variant="eevee" // or determine based on card.variant
                                enableHolographic={true} // Enable the effect
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="h-full w-full object-cover pointer-events-none select-none"
                                    draggable="false"
                                    style={{ borderRadius: '5% / 3.5%' }} // Match the card border radius
                                />
                            </DraggableCardBody>
                        ))}
                    </DraggableCardContainer>
                </div>
            </section>

            {/* Process Section */}
            <section
                id="process"
                className="relative z-10 py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800"
                data-oid="gzb1f:0"
            >
                <div className="max-w-7xl mx-auto" data-oid="ajxl8:t">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent pb-2 leading-[1.15]"
                        data-oid="a5:_09r"
                    >
                        Crafting Process
                    </h2>
                    <HowItWorksGrid data-oid="5wi37c5" />
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="relative z-10 py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-900"
                data-oid="auc97fp"
            >
                <div className="max-w-4xl mx-auto text-center" data-oid="9onclco">
                    <div
                        className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-12 shadow-2xl shadow-amber-500/10"
                        data-oid="ojz7qx7"
                    >
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent pb-2 leading-[1.15]"
                            data-oid="mk58.8w"
                        >
                            Bring Your Imagination to Life!
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
                            Transform your favorite photo into a one-of-a-kind Pokémon card. Unique,
                            personal, and crafted just for you—start your journey today!
                        </p>
                        <button className="px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-full text-xl font-bold hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25">
                            Create My Card
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="relative z-10 border-t border-amber-500/20 py-12 px-8 bg-slate-900"
                data-oid="nq8z9z7"
            >
                <div className="max-w-6xl mx-auto text-center" data-oid="yhkce95">
                    <div
                        className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4"
                        data-oid="2t3jhqc"
                    >
                        PokePrint Me
                    </div>
                    <div className="flex justify-center space-x-6" data-oid="b:a1x.r">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                            data-oid="_4i-gtp"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                            data-oid="yp83kaz"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
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
