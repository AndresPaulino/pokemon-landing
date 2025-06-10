import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'PokePrint',
    description: 'PokePrint is a platform for ordering and printing custom made Pokemon cards',
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
