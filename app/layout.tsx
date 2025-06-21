import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Poke Print Me',
    description: 'Poke Print Me is a platform for ordering and printing custom made Pokémon cards',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="35hln8r">
            <body className="" data-oid="9eaq1_4">
                {children}
            </body>
        </html>
    );
}
