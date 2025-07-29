'use client';

import { useState } from 'react';
import {
    ChevronRight,
    Shield,
    FileText,
    Mail,
    Calendar,
    Lock,
    Users,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const LegalPages = () => {
    const [currentPage, setCurrentPage] = useState('privacy');

    const TableOfContents = ({
        sections,
        activePage,
    }: {
        sections: string[];
        activePage: string;
    }) => (
        <div className="bg-slate-800/50 rounded-2xl p-6 sticky top-8 border border-amber-500/20 backdrop-blur-sm">
            <h3 className="font-semibold text-amber-300 mb-4">Table of Contents</h3>
            <nav className="space-y-2">
                {sections.map((section, index) => (
                    <a
                        key={index}
                        href={`#section-${index + 1}`}
                        className="flex items-center text-sm text-gray-300 hover:text-amber-400 transition-colors py-1"
                    >
                        <ChevronRight className="w-3 h-3 mr-2" />
                        {section}
                    </a>
                ))}
            </nav>
        </div>
    );

    const SectionHeader = ({
        number,
        title,
        icon: Icon,
    }: {
        number: number;
        title: string;
        icon: any;
    }) => (
        <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-amber-500/20 rounded-lg border border-amber-400/50">
                <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
                <span className="text-sm font-medium text-amber-400">Section {number}</span>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
        </div>
    );

    const PrivacyPolicy = () => {
        const sections = [
            'Introduction',
            'Information We Collect',
            'How We Use Your Information',
            'Information Sharing',
            'Data Security',
            'Your Rights',
            'Cookies and Tracking',
            'Third-Party Services',
            "Children's Privacy",
            'International Users',
            'Updates to This Policy',
            'Contact Us',
        ];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <TableOfContents sections={sections} activePage="privacy" />
                </div>

                <div className="lg:col-span-3 space-y-12">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mx-auto mb-6 border border-amber-400/50">
                            <Shield className="w-8 h-8 text-amber-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            We respect your privacy and are committed to protecting your personal
                            data. This privacy policy explains how we collect, use, and safeguard
                            your information.
                        </p>
                        <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Last updated: July 1, 2025
                            </div>
                            <div className="flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Effective: July 1, 2025
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Introduction */}
                    <section id="section-1">
                        <SectionHeader number={1} title="Introduction" icon={FileText} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                This Privacy Policy describes how PokePrint Me ("we," "our," or
                                "us") collects, uses, and shares information about you when you use
                                our website, mobile application, and related services (collectively,
                                the "Services").
                            </p>
                            <p>
                                By accessing or using our Services, you agree to this Privacy
                                Policy. If you do not agree with this policy, please do not use our
                                Services.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Information We Collect */}
                    <section id="section-2">
                        <SectionHeader number={2} title="Information We Collect" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <h3 className="text-amber-300">Personal Information</h3>
                            <p>We may collect the following types of personal information:</p>
                            <ul className="text-gray-300">
                                <li>
                                    <strong>Account Information:</strong> Name, email address, phone
                                    number, and password
                                </li>
                                <li>
                                    <strong>Profile Information:</strong> Profile picture,
                                    preferences, and settings
                                </li>
                                <li>
                                    <strong>Payment Information:</strong> Credit card details,
                                    billing address (processed securely by third-party payment
                                    processors)
                                </li>
                                <li>
                                    <strong>Communication Data:</strong> Messages, feedback, and
                                    customer support interactions
                                </li>
                            </ul>

                            <h3 className="text-amber-300">Automatically Collected Information</h3>
                            <ul className="text-gray-300">
                                <li>
                                    <strong>Device Information:</strong> IP address, browser type,
                                    operating system, device identifiers
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> Pages visited, time spent on pages,
                                    click patterns, search queries
                                </li>
                                <li>
                                    <strong>Location Data:</strong> General geographic location
                                    based on IP address
                                </li>
                                <li>
                                    <strong>Cookies and Similar Technologies:</strong> As described
                                    in our Cookie Policy
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: How We Use Your Information */}
                    <section id="section-3">
                        <SectionHeader number={3} title="How We Use Your Information" icon={Lock} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>We use the information we collect for the following purposes:</p>
                            <ul className="text-gray-300">
                                <li>
                                    <strong>Service Provision:</strong> To provide, maintain, and
                                    improve our Services
                                </li>
                                <li>
                                    <strong>Account Management:</strong> To create and manage your
                                    account
                                </li>
                                <li>
                                    <strong>Communication:</strong> To send you updates,
                                    notifications, and respond to inquiries
                                </li>
                                <li>
                                    <strong>Personalization:</strong> To customize your experience
                                    and provide relevant content
                                </li>
                                <li>
                                    <strong>Analytics:</strong> To understand how our Services are
                                    used and improve them
                                </li>
                                <li>
                                    <strong>Security:</strong> To detect, prevent, and address fraud
                                    and security issues
                                </li>
                                <li>
                                    <strong>Legal Compliance:</strong> To comply with applicable
                                    laws and regulations
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Information Sharing */}
                    <section id="section-4">
                        <SectionHeader number={4} title="Information Sharing" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>We may share your information in the following circumstances:</p>
                            <ul className="text-gray-300">
                                <li>
                                    <strong>Service Providers:</strong> With trusted third-party
                                    service providers who help us operate our Services
                                </li>
                                <li>
                                    <strong>Business Transfers:</strong> In connection with mergers,
                                    acquisitions, or asset sales
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> When required by law or to
                                    protect our rights and safety
                                </li>
                                <li>
                                    <strong>With Your Consent:</strong> When you explicitly consent
                                    to sharing
                                </li>
                            </ul>
                            <p>
                                We do not sell, rent, or trade your personal information to third
                                parties for their marketing purposes.
                            </p>
                        </div>
                    </section>

                    {/* Section 5: Data Security */}
                    <section id="section-5">
                        <SectionHeader number={5} title="Data Security" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                We implement appropriate technical and organizational measures to
                                protect your personal information against unauthorized access,
                                alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="text-gray-300">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security assessments and audits</li>
                                <li>Access controls and authentication protocols</li>
                                <li>Employee training on data protection</li>
                                <li>Incident response procedures</li>
                            </ul>
                            <p>
                                However, no method of transmission over the internet or electronic
                                storage is 100% secure. While we strive to protect your information,
                                we cannot guarantee absolute security.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Your Rights */}
                    <section id="section-6">
                        <SectionHeader number={6} title="Your Rights" icon={FileText} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Depending on your location, you may have the following rights
                                regarding your personal information:
                            </p>
                            <ul className="text-gray-300">
                                <li>
                                    <strong>Access:</strong> Request access to your personal
                                    information
                                </li>
                                <li>
                                    <strong>Correction:</strong> Request correction of inaccurate or
                                    incomplete information
                                </li>
                                <li>
                                    <strong>Deletion:</strong> Request deletion of your personal
                                    information
                                </li>
                                <li>
                                    <strong>Portability:</strong> Request a copy of your information
                                    in a portable format
                                </li>
                                <li>
                                    <strong>Opt-out:</strong> Opt-out of certain uses of your
                                    information
                                </li>
                                <li>
                                    <strong>Restriction:</strong> Request restriction of processing
                                    in certain circumstances
                                </li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us using the information
                                provided in the "Contact Us" section.
                            </p>
                        </div>
                    </section>

                    {/* Remaining sections with similar structure */}
                    <section id="section-7">
                        <SectionHeader number={7} title="Cookies and Tracking" icon={AlertCircle} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                We use cookies and similar tracking technologies to enhance your
                                experience on our Services. For detailed information about our use
                                of cookies, please see our separate Cookie Policy.
                            </p>
                        </div>
                    </section>

                    <section id="section-8">
                        <SectionHeader number={8} title="Third-Party Services" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Our Services may contain links to third-party websites or integrate
                                with third-party services. We are not responsible for the privacy
                                practices of these third parties. We encourage you to review their
                                privacy policies.
                            </p>
                        </div>
                    </section>

                    <section id="section-9">
                        <SectionHeader number={9} title="Children's Privacy" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Our Services are not intended for children under 13 years of age. We
                                do not knowingly collect personal information from children under
                                13. If we become aware that we have collected such information, we
                                will take steps to delete it.
                            </p>
                        </div>
                    </section>

                    <section id="section-10">
                        <SectionHeader number={10} title="International Users" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                If you are accessing our Services from outside the United States,
                                please be aware that your information may be transferred to and
                                processed in the United States, where data protection laws may
                                differ from those in your country.
                            </p>
                        </div>
                    </section>

                    <section id="section-11">
                        <SectionHeader number={11} title="Updates to This Policy" icon={Calendar} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                We may update this Privacy Policy from time to time. When we make
                                changes, we will notify you by updating the "Last updated" date and,
                                for material changes, we may provide additional notice through our
                                Services or by email.
                            </p>
                        </div>
                    </section>

                    <section id="section-12">
                        <SectionHeader number={12} title="Contact Us" icon={Mail} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                If you have any questions about this Privacy Policy or our data
                                practices, please contact us at:
                            </p>
                            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
                                <p className="text-gray-300">
                                    <strong className="text-amber-300">PokePrint Me</strong>
                                    <br />
                                    Email: support@pokeprint.me
                                    <br />
                                    Phone: +1 (786) 261-7832
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    const TermsOfService = () => {
        const sections = [
            'Introduction',
            'Acceptance of Terms',
            'Description of Service',
            'User Accounts',
            'Acceptable Use',
            'Prohibited Activities',
            'Intellectual Property',
            'User-Generated Content',
            'Privacy Policy',
            'Disclaimers',
            'Limitation of Liability',
            'Indemnification',
            'Termination',
            'Governing Law',
            'Changes to Terms',
            'Contact Information',
        ];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <TableOfContents sections={sections} activePage="terms" />
                </div>

                <div className="lg:col-span-3 space-y-12">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mx-auto mb-6 border border-amber-400/50">
                            <FileText className="w-8 h-8 text-amber-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            These terms govern your use of our services. Please read them carefully
                            as they contain important information about your rights and obligations.
                        </p>
                        <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Last updated: July 1, 2025
                            </div>
                            <div className="flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Effective: July 1, 2025
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Introduction */}
                    <section id="section-1">
                        <SectionHeader number={1} title="Introduction" icon={FileText} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Welcome to PokePrint Me. These Terms of Service ("Terms") govern
                                your use of our website, mobile application, and related services
                                (collectively, the "Services") operated by PokePrint Me ("we,"
                                "our," or "us").
                            </p>
                            <p>
                                By accessing or using our Services, you agree to be bound by these
                                Terms. If you disagree with any part of these terms, then you may
                                not access the Services.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Acceptance of Terms */}
                    <section id="section-2">
                        <SectionHeader number={2} title="Acceptance of Terms" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                By creating an account or using our Services, you acknowledge that
                                you have read, understood, and agree to be bound by these Terms and
                                our Privacy Policy. These Terms constitute a legally binding
                                agreement between you and PokePrint Me.
                            </p>
                            <p>
                                You must be at least 18 years old to use our Services. If you are
                                under 18, you may only use our Services with the involvement and
                                consent of a parent or guardian.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Description of Service */}
                    <section id="section-3">
                        <SectionHeader number={3} title="Description of Service" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Our Services provide AI-powered anime transformation and custom
                                Pokémon card creation. We reserve the right to modify, suspend, or
                                discontinue any aspect of the Services at any time, with or without
                                notice.
                            </p>
                            <p>
                                We may impose limits on certain features or restrict access to parts
                                of the Services without notice or liability.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: User Accounts */}
                    <section id="section-4">
                        <SectionHeader number={4} title="User Accounts" icon={Users} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                To access certain features of our Services, you may be required to
                                create an account. You agree to:
                            </p>
                            <ul className="text-gray-300">
                                <li>Provide accurate, current, and complete information</li>
                                <li>Maintain and update your information to keep it accurate</li>
                                <li>Maintain the security of your password and account</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Notify us immediately of any unauthorized use</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Acceptable Use */}
                    <section id="section-5">
                        <SectionHeader number={5} title="Acceptable Use" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                You may use our Services only for lawful purposes and in accordance
                                with these Terms. You agree to use the Services in a manner that:
                            </p>
                            <ul className="text-gray-300">
                                <li>Complies with all applicable laws and regulations</li>
                                <li>Respects the rights of others</li>
                                <li>
                                    Does not interfere with the normal operation of the Services
                                </li>
                                <li>Does not attempt to gain unauthorized access to any systems</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6: Prohibited Activities */}
                    <section id="section-6">
                        <SectionHeader
                            number={6}
                            title="Prohibited Activities"
                            icon={AlertCircle}
                        />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>You agree not to engage in any of the following activities:</p>
                            <ul className="text-gray-300">
                                <li>Violating any applicable laws or regulations</li>
                                <li>Transmitting harmful, offensive, or inappropriate content</li>
                                <li>Infringing on intellectual property rights</li>
                                <li>
                                    Attempting to hack, reverse engineer, or disrupt the Services
                                </li>
                                <li>Spamming or sending unsolicited communications</li>
                                <li>Impersonating others or providing false information</li>
                                <li>Collecting user information without permission</li>
                                <li>Using automated systems to access the Services</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7: Intellectual Property */}
                    <section id="section-7">
                        <SectionHeader number={7} title="Intellectual Property" icon={Lock} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                The Services and their original content, features, and functionality
                                are owned by PokePrint Me and are protected by international
                                copyright, trademark, patent, trade secret, and other intellectual
                                property laws.
                            </p>
                            <p>
                                You may not copy, modify, distribute, sell, or lease any part of our
                                Services or included software, nor may you reverse engineer or
                                attempt to extract the source code of that software.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: User-Generated Content */}
                    <section id="section-8">
                        <SectionHeader number={8} title="User-Generated Content" icon={FileText} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Our Services may allow you to post, link, store, share and otherwise
                                make available certain information, text, graphics, videos, or other
                                material ("Content"). You are responsible for the Content that you
                                post to the Services.
                            </p>
                            <p>
                                By posting Content to the Services, you grant us a non-exclusive,
                                worldwide, royalty-free license to use, display, reproduce, and
                                distribute such Content in connection with the Services.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Privacy Policy */}
                    <section id="section-9">
                        <SectionHeader number={9} title="Privacy Policy" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy,
                                which also governs your use of the Services, to understand our
                                practices.
                            </p>
                        </div>
                    </section>

                    {/* Section 10: Disclaimers */}
                    <section id="section-10">
                        <SectionHeader number={10} title="Disclaimers" icon={AlertCircle} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE
                                MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
                                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                                NON-INFRINGEMENT.
                            </p>
                            <p>
                                We do not warrant that the Services will be uninterrupted,
                                error-free, or free of viruses or other harmful components.
                            </p>
                        </div>
                    </section>

                    {/* Section 11: Limitation of Liability */}
                    <section id="section-11">
                        <SectionHeader number={11} title="Limitation of Liability" icon={Shield} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, POKEPRINT ME SHALL NOT BE
                                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                                PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
                            </p>
                            <p>
                                Our total liability to you for any damages shall not exceed the
                                amount you paid us in the twelve months preceding the claim.
                            </p>
                        </div>
                    </section>

                    {/* Section 12: Indemnification */}
                    <section id="section-12">
                        <SectionHeader number={12} title="Indemnification" icon={Lock} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                You agree to defend, indemnify, and hold harmless PokePrint Me from
                                any claims, damages, obligations, losses, liabilities, costs, or
                                debt arising from your use of and access to the Services or your
                                violation of these Terms.
                            </p>
                        </div>
                    </section>

                    {/* Section 13: Termination */}
                    <section id="section-13">
                        <SectionHeader number={13} title="Termination" icon={AlertCircle} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                We may terminate or suspend your account and bar access to the
                                Services immediately, without prior notice or liability, for any
                                reason, including breach of these Terms.
                            </p>
                            <p>
                                You may terminate your account at any time by contacting us. Upon
                                termination, your right to use the Services will cease immediately.
                            </p>
                        </div>
                    </section>

                    {/* Section 14: Governing Law */}
                    <section id="section-14">
                        <SectionHeader number={14} title="Governing Law" icon={FileText} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                These Terms shall be interpreted and governed by the laws of the
                                United States, without regard to its conflict of law provisions. Any
                                disputes shall be resolved in the courts of the United States.
                            </p>
                        </div>
                    </section>

                    {/* Section 15: Changes to Terms */}
                    <section id="section-15">
                        <SectionHeader number={15} title="Changes to Terms" icon={Calendar} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                We reserve the right to modify these Terms at any time. If we make
                                material changes, we will notify you by updating the date at the top
                                of these Terms and, in some cases, provide additional notice.
                            </p>
                            <p>
                                Your continued use of the Services after any changes constitutes
                                acceptance of the new Terms.
                            </p>
                        </div>
                    </section>

                    {/* Section 16: Contact Information */}
                    <section id="section-16">
                        <SectionHeader number={16} title="Contact Information" icon={Mail} />
                        <div className="prose prose-lg max-w-none text-gray-300">
                            <p>
                                If you have any questions about these Terms of Service, please
                                contact us at:
                            </p>
                            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
                                <p className="text-gray-300">
                                    <strong className="text-amber-300">PokePrint Me</strong>
                                    <br />
                                    Email: support@pokeprint.me
                                    <br />
                                    Phone: +1 (786) 261-7832
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Navigation */}
            <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 text-amber-400 hover:text-amber-300 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-semibold">Back to Home</span>
                            </Link>
                        </div>
                        <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg border border-amber-500/20">
                            <button
                                onClick={() => setCurrentPage('privacy')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPage === 'privacy'
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                                        : 'text-gray-300 hover:text-amber-300'
                                }`}
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => setCurrentPage('terms')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPage === 'terms'
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                                        : 'text-gray-300 hover:text-amber-300'
                                }`}
                            >
                                Terms of Service
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {currentPage === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-amber-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src="/logo/PokePrint-Me-Logo.png"
                                    alt="PokePrint Me"
                                    className="w-25 h-16"
                                />
                            </div>
                            <p className="text-gray-300 mb-4">
                                Protecting your privacy and establishing clear terms of service for
                                our Pokémon card transformation service.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-amber-300 mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => setCurrentPage('privacy')}
                                        className="text-gray-300 hover:text-amber-300 transition-colors"
                                    >
                                        Privacy Policy
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setCurrentPage('terms')}
                                        className="text-gray-300 hover:text-amber-300 transition-colors"
                                    >
                                        Terms of Service
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-amber-300 mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>legal@pokeprint.me</li>
                                <li>privacy@pokeprint.me</li>
                                <li>support@pokeprint.me</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-amber-500/20 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 PokePrint Me. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LegalPages;
