import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Poke Print Me',
    description: 'Poke Print Me is a platform for ordering and printing custom made Pokémon cards',
};

export default function RootLayout({ 
    children 
}: Readonly<{ 
    children: React.ReactNode 
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}