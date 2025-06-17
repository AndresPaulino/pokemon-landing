'use client';
import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect } from 'react';

interface HolographicCardProps {
    className?: string;
    children?: React.ReactNode;
    variant?: 'charizard' | 'pikachu' | 'eevee' | 'mewtwo' | 'default';
    autoAnimate?: boolean;
    width?: string;
    height?: string;
}

export const HolographicCard = ({
    className,
    children,
    variant = 'eevee',
    autoAnimate = false,
    width = '320px',
    height = '448px',
}: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
    const [sparklePos, setSparklePos] = useState({ x: 50, y: 50 });
    const [holoOpacity, setHoloOpacity] = useState(0.75);
    const [transform3d, setTransform3d] = useState({ tx: 0, ty: 0 });
    const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout | null>(null);

    const getVariantColors = (variant: string) => {
        switch (variant) {
            case 'charizard':
                return {
                    color1: '#fac',
                    color2: '#ddccaa',
                };
            case 'pikachu':
                return {
                    color1: '#54a29e',
                    color2: '#a79d66',
                };
            case 'mewtwo':
                return {
                    color1: '#efb2fb',
                    color2: '#acc6f8',
                };
            case 'eevee':
                return {
                    color1: '#ec9bb6',
                    color2: '#ccac6f',
                    color3: '#69e4a5',
                    color4: '#8ec5d6',
                    color5: '#b98cce',
                };
            default:
                return {
                    color1: '#0ea5e9',
                    color2: '#ff0080',
                };
        }
    };

    const colors = getVariantColors(variant);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        // Get position relative to card (offsetX, offsetY equivalent)
        const l = e.clientX - rect.left;
        const t = e.clientY - rect.top;
        const h = rect.height;
        const w = rect.width;

        // Original math from the JavaScript
        const px = Math.abs(Math.floor((100 / w) * l) - 100);
        const py = Math.abs(Math.floor((100 / h) * t) - 100);
        const pa = 50 - px + (50 - py);

        // Math for gradient/background positions
        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const px_spark = 50 + (px - 50) / 7;
        const py_spark = 50 + (py - 50) / 7;
        const p_opc = 20 + Math.abs(pa) * 1.5;

        // Transform calculations
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;

        // Update states
        setGradientPos({ x: lp, y: tp });
        setSparklePos({ x: px_spark, y: py_spark });
        setHoloOpacity(Math.min(p_opc / 100, 1));
        setTransform3d({ tx, ty });

        // Clear any pending animation timeout
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            setAnimationTimeout(null);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (animationTimeout) {
            clearTimeout(animationTimeout);
            setAnimationTimeout(null);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);

        // Reset values
        setGradientPos({ x: 50, y: 50 });
        setSparklePos({ x: 50, y: 50 });
        setHoloOpacity(0.75);
        setTransform3d({ tx: 0, ty: 0 });

        // Set timeout for animation (like original)
        const timeout = setTimeout(() => {
            // Could add animation class here if needed
        }, 2500);
        setAnimationTimeout(timeout);
    };

    const getBoxShadow = () => {
        if (variant === 'eevee' && isHovered) {
            return `0 0 30px -5px white, 0 0 10px -2px white, 0 55px 35px -20px rgba(0, 0, 0, 0.5)`;
        }

        if (isHovered) {
            return `
                -20px -20px 30px -25px ${colors.color1},
                20px 20px 30px -25px ${colors.color2},
                -7px -7px 10px -5px ${colors.color1},
                7px 7px 10px -5px ${colors.color2},
                0 0 13px 4px rgba(255,255,255,0.3),
                0 55px 35px -20px rgba(0, 0, 0, 0.5)
            `;
        }

        return `
            -5px -5px 5px -5px ${colors.color1},
            5px 5px 5px -5px ${colors.color2},
            0 55px 35px -20px rgba(0, 0, 0, 0.5)
        `;
    };

    const getGradientBackground = () => {
        if (variant === 'eevee' && isHovered) {
            return `linear-gradient(115deg, transparent 20%, ${colors.color1} 36%, ${colors.color2} 43%, ${colors.color3} 50%, ${colors.color4} 57%, ${colors.color5} 64%, transparent 80%)`;
        }

        if (isHovered) {
            return `linear-gradient(110deg, transparent 25%, ${colors.color1} 48%, ${colors.color2} 52%, transparent 75%)`;
        }

        return `linear-gradient(115deg, transparent 0%, ${colors.color1} 25%, transparent 47%, transparent 53%, ${colors.color2} 75%, transparent 100%)`;
    };

    // Auto animation effect
    useEffect(() => {
        if (!autoAnimate || isHovered) return;

        const animateCard = () => {
            if (cardRef.current && !isHovered) {
                cardRef.current.classList.add('animate-holo');
                setTimeout(() => {
                    if (cardRef.current) {
                        cardRef.current.classList.remove('animate-holo');
                    }
                }, 12000);
            }
        };

        const interval = setInterval(animateCard, 15000);
        return () => clearInterval(interval);
    }, [autoAnimate, isHovered]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
        };
    }, [animationTimeout]);

    return (
        <>
            {/* CSS Styles */}
            <style jsx>{`
                @keyframes holoCard {
                    0%,
                    100% {
                        transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
                    }
                    5%,
                    8% {
                        transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
                    }
                    13%,
                    16% {
                        transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
                    }
                    35%,
                    38% {
                        transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
                    }
                    55% {
                        transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
                    }
                }

                @keyframes holoGradient {
                    0%,
                    100% {
                        opacity: 0.5;
                        background-position: 50% 50%;
                        filter: brightness(0.5) contrast(1);
                    }
                    5%,
                    9% {
                        background-position: 100% 100%;
                        opacity: 1;
                        filter: brightness(0.75) contrast(1.25);
                    }
                    13%,
                    17% {
                        background-position: 0% 0%;
                        opacity: 0.88;
                    }
                    35%,
                    39% {
                        background-position: 100% 100%;
                        opacity: 1;
                        filter: brightness(0.5) contrast(1);
                    }
                    55% {
                        background-position: 0% 0%;
                        opacity: 1;
                        filter: brightness(0.75) contrast(1.25);
                    }
                }

                @keyframes holoSparkle {
                    0%,
                    100% {
                        opacity: 0.75;
                        background-position: 50% 50%;
                        filter: brightness(1.2) contrast(1.25);
                    }
                    5%,
                    8% {
                        opacity: 1;
                        background-position: 40% 40%;
                        filter: brightness(0.8) contrast(1.2);
                    }
                    13%,
                    16% {
                        opacity: 0.5;
                        background-position: 50% 50%;
                        filter: brightness(1.2) contrast(0.8);
                    }
                    35%,
                    38% {
                        opacity: 1;
                        background-position: 60% 60%;
                        filter: brightness(1) contrast(1);
                    }
                    55% {
                        opacity: 0.33;
                        background-position: 45% 45%;
                        filter: brightness(1.2) contrast(1.25);
                    }
                }

                .animate-holo {
                    animation: holoCard 12s ease 0s 1;
                }
                .animate-holo .holo-gradient {
                    animation: holoGradient 12s ease 0s 1;
                }
                .animate-holo .holo-sparkle {
                    animation: holoSparkle 12s ease 0s 1;
                }
            `}</style>

            <div
                className="relative isolate"
                style={{ perspective: '750px', transform: 'translate3d(0.1px, 0.1px, 0.1px)' }}
            >
                <div
                    ref={cardRef}
                    className={cn(
                        'relative overflow-hidden select-none touch-none',
                        'bg-gray-900',
                        'transition-all duration-200 ease-out',
                        className,
                    )}
                    style={{
                        width,
                        height,
                        borderRadius: '5% / 3.5%',
                        transform: isHovered
                            ? `rotateX(${transform3d.ty}deg) rotateY(${transform3d.tx}deg)`
                            : 'rotateX(0deg) rotateY(0deg)',
                        transformOrigin: 'center',
                        boxShadow: getBoxShadow(),
                        willChange: 'transform',
                        transition: isHovered ? 'none' : 'all 0.5s ease, box-shadow 0.2s ease',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    data-variant={variant}
                >
                    {/* Card content - lowest layer */}
                    <div
                        className="relative z-0 h-full w-full"
                        style={{ borderRadius: '5% / 3.5%' }}
                    >
                        {children}
                    </div>

                    {/* Background holographic gradient - :before equivalent */}
                    <div
                        className="holo-gradient absolute inset-0 pointer-events-none z-40"
                        style={{
                            borderRadius: '5% / 3.5%',
                            background: getGradientBackground(),
                            backgroundPosition: `${gradientPos.x}% ${gradientPos.y}%`,
                            backgroundSize: isHovered ? '250% 250%' : '300% 300%',
                            opacity: 0.5,
                            mixBlendMode: 'color-dodge',
                            filter: isHovered
                                ? 'brightness(0.66) contrast(1.33)'
                                : 'brightness(0.5) contrast(1)',
                            transition: isHovered ? 'none' : 'all 0.33s ease',
                        }}
                    />

                    {/* Sparkle holographic effect - :after equivalent */}
                    <div
                        className="holo-sparkle absolute inset-0 pointer-events-none z-50"
                        style={{
                            borderRadius: '5% / 3.5%',
                            opacity: isHovered ? holoOpacity : 0.75,
                            backgroundImage: `
                                url("https://assets.codepen.io/13471/sparkles.gif"),
                                url("https://assets.codepen.io/13471/holo.png"),
                                linear-gradient(125deg, #ff008450 15%, #fca40040 30%, #ffff0030 40%, #00ff8a20 60%, #00cfff40 70%, #cc4cfa50 85%)
                            `,
                            backgroundPosition: `${sparklePos.x}% ${sparklePos.y}%, 50% 50%, 50% 50%`,
                            backgroundSize: '160%, 160%, 160%',
                            backgroundBlendMode: 'overlay',
                            mixBlendMode: 'color-dodge',
                            filter: isHovered
                                ? 'brightness(1) contrast(1)'
                                : 'brightness(1.2) contrast(1.25)',
                            transition: isHovered ? 'none' : 'all 0.33s ease',
                        }}
                    />
                </div>
            </div>
        </>
    );
};
