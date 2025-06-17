'use client';
import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    animate,
    useVelocity,
    useAnimationControls,
} from 'motion/react';

interface DraggableCardBodyProps {
    className?: string;
    children?: React.ReactNode;
    initialRotation?: number;
    variant?: 'charizard' | 'pikachu' | 'eevee' | 'mewtwo' | 'default';
    enableHolographic?: boolean;
}

export const DraggableCardBody = ({
    className,
    children,
    initialRotation = 0,
    variant = 'eevee',
    enableHolographic = true,
}: DraggableCardBodyProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    const [constraints, setConstraints] = useState({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });

    // Holographic effect state
    const [isHovered, setIsHovered] = useState(false);
    const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
    const [sparklePos, setSparklePos] = useState({ x: 50, y: 50 });
    const [holoOpacity, setHoloOpacity] = useState(0.75);
    const [transform3d, setTransform3d] = useState({ tx: 0, ty: 0 });
    const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout | null>(null);

    // physics
    const velocityX = useVelocity(mouseX);
    const velocityY = useVelocity(mouseY);

    const springConfig = {
        stiffness: 100,
        damping: 20,
        mass: 0.5,
    };

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), springConfig);
    const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]), springConfig);
    const glareOpacity = useSpring(
        useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
        springConfig,
    );

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

    const getBoxShadow = () => {
        if (!enableHolographic) return '';

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

    useEffect(() => {
        // Update constraints when component mounts or window resizes
        const updateConstraints = () => {
            if (typeof window !== 'undefined') {
                setConstraints({
                    top: -window.innerHeight / 2,
                    left: -window.innerWidth / 2,
                    right: window.innerWidth / 2,
                    bottom: window.innerHeight / 2,
                });
            }
        };

        updateConstraints();

        // Add resize listener
        window.addEventListener('resize', updateConstraints);

        // Clean up
        return () => {
            window.removeEventListener('resize', updateConstraints);
        };
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }
        };
    }, [animationTimeout]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
        };
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        mouseX.set(deltaX);
        mouseY.set(deltaY);

        // Holographic effect calculations
        if (enableHolographic) {
            const l = clientX - left;
            const t = clientY - top;
            const h = height;
            const w = width;

            // Original math from the holographic effect
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

            // Update holographic states
            setGradientPos({ x: lp, y: tp });
            setSparklePos({ x: px_spark, y: py_spark });
            setHoloOpacity(Math.min(p_opc / 100, 1));
            setTransform3d({ tx, ty });

            // Clear any pending animation timeout
            if (animationTimeout) {
                clearTimeout(animationTimeout);
                setAnimationTimeout(null);
            }
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
        mouseX.set(0);
        mouseY.set(0);

        // Reset holographic values
        if (enableHolographic) {
            setGradientPos({ x: 50, y: 50 });
            setSparklePos({ x: 50, y: 50 });
            setHoloOpacity(0.75);
            setTransform3d({ tx: 0, ty: 0 });

            // Set timeout for animation (like original)
            const timeout = setTimeout(() => {
                // Could add animation class here if needed
            }, 2500);
            setAnimationTimeout(timeout);
        }
    };

    return (
        <>
            {/* CSS Styles for holographic effect */}
            {enableHolographic && (
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
                `}</style>
            )}

            <motion.div
                ref={cardRef}
                drag
                dragConstraints={constraints}
                onDragStart={() => {
                    document.body.style.cursor = 'grabbing';
                }}
                onDragEnd={(event, info) => {
                    document.body.style.cursor = 'default';

                    controls.start({
                        rotateX: 0,
                        rotateY: 0,
                        transition: {
                            type: 'spring',
                            ...springConfig,
                        },
                    });
                    const currentVelocityX = velocityX.get();
                    const currentVelocityY = velocityY.get();

                    const velocityMagnitude = Math.sqrt(
                        currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY,
                    );
                    const bounce = Math.min(0.8, velocityMagnitude / 1000);

                    animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
                        duration: 0.8,
                        ease: [0.2, 0, 0, 1],
                        bounce,
                        type: 'spring',
                        stiffness: 50,
                        damping: 15,
                        mass: 0.8,
                    });

                    animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
                        duration: 0.8,
                        ease: [0.2, 0, 0, 1],
                        bounce,
                        type: 'spring',
                        stiffness: 50,
                        damping: 15,
                        mass: 0.8,
                    });
                }}
                style={{
                    rotateX: enableHolographic && isHovered ? `${transform3d.ty}deg` : rotateX,
                    rotateY: enableHolographic && isHovered ? `${transform3d.tx}deg` : rotateY,
                    opacity,
                    rotate: initialRotation,
                    willChange: 'transform',
                    boxShadow: enableHolographic ? getBoxShadow() : undefined,
                    borderRadius: enableHolographic ? '5% / 3.5%' : undefined,
                }}
                animate={controls}
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    'relative min-h-96 w-80 overflow-hidden shadow-2xl transform-3d',
                    enableHolographic ? 'select-none touch-none isolate' : '',
                    enableHolographic ? '' : 'rounded-md',
                    className,
                )}
                data-variant={variant}
            >
                {/* Card content - lowest layer */}
                <div
                    className={cn(
                        'relative z-0 h-full w-full',
                        enableHolographic ? '' : 'rounded-md',
                    )}
                    style={{ borderRadius: enableHolographic ? '5% / 3.5%' : undefined }}
                >
                    {children}
                </div>

                {/* Holographic effects - only if enabled */}
                {enableHolographic && (
                    <>
                        {/* Background holographic gradient - :before equivalent */}
                        <div
                            className="absolute inset-0 pointer-events-none z-40"
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
                            className="absolute inset-0 pointer-events-none z-50"
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
                    </>
                )}

                {/* Original glare effect */}
                <motion.div
                    style={{
                        opacity: glareOpacity,
                    }}
                    className={cn(
                        'pointer-events-none absolute inset-0 bg-white select-none z-60',
                        enableHolographic ? '' : 'rounded-md',
                    )}
                    style={{
                        opacity: glareOpacity,
                        borderRadius: enableHolographic ? '5% / 3.5%' : undefined,
                    }}
                />
            </motion.div>
        </>
    );
};

export const DraggableCardContainer = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return <div className={cn('[perspective:3000px]', className)}>{children}</div>;
};
