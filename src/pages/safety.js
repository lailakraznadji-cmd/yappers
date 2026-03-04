import HeaderFooter from '../component/HeaderFooter';
import Link from 'next/link';

export default function SafetyGuidelines() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 mb-8 border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-red-600 mb-6 border-b pb-4">
                        Safety & Crisis Resources
                    </h1>

                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-10">
                        <h2 className="text-xl font-bold text-red-800 mb-2">IMPORTANT DISCLAIMER</h2>
                        <p className="text-gray-800 text-lg leading-relaxed">
                            <strong>Yappers is NOT a replacement for professional medical or mental health care.</strong>
                            <br /><br />
                            We are a peer-to-peer listening platform. Our volunteers are individuals offering a safe space to vent, not trained therapists. If you are experiencing a crisis, having thoughts of self-harm, or facing a medical emergency, please use the resources below immediately.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                📱 Immediate Crisis Lines
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <h4 className="font-bold text-lg text-[#7D5A9C]">United States</h4>
                                    <p className="text-gray-600 mb-2">Suicide & Crisis Lifeline</p>
                                    <a href="tel:988" className="text-2xl font-black text-blue-600 hover:underline">988</a>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <h4 className="font-bold text-lg text-[#7D5A9C]">United Kingdom</h4>
                                    <p className="text-gray-600 mb-2">National Suicide Prevention</p>
                                    <a href="tel:111" className="text-2xl font-black text-blue-600 hover:underline">111</a>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                🌍 International Resources
                            </h3>
                            <ul className="space-y-3 pl-4 list-none">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 text-xl">→</span>
                                    <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg">
                                        <strong>Find A Helpline</strong> - Search for crisis lines in over 130 countries.
                                    </a>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 text-xl">→</span>
                                    <a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-lg">
                                        <strong>Befrienders Worldwide</strong> - International volunteer action to prevent suicide.
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 mb-4">If you are safe but just need someone to talk to, we are here for you.</p>
                    <Link href="/requestSession" className="inline-block bg-[#7D5A9C] hover:bg-[#6b4787] text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform transform hover:-translate-y-1">
                        Return to Chat Request
                    </Link>
                </div>
            </div>
        </HeaderFooter>
    );
}
