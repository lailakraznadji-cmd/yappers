import HeaderFooter from '../component/HeaderFooter';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
    return (
        <HeaderFooter>
            <Head>
                <title>Page Not Found | Yappers</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Head>

            <div className="flex-1 flex items-center justify-center min-h-[70vh] px-4">
                <main className="max-w-xl w-full text-center">
                    <div className="bg-white rounded-[2rem] shadow-xl p-10 sm:p-16 border border-gray-100 relative overflow-hidden">

                        {/* Decorative Background Element */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7D5A9C] to-yappersLightBlue"></div>

                        <div className="mb-8">
                            {/* Giant Animated Error Code */}
                            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 mb-2 leading-none select-none">
                                404
                            </h1>
                            <h2 className="text-3xl font-extrabold text-[#7D5A9C] mb-4">
                                Oops! Lost in the void.
                            </h2>
                            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
                                We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed at all.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-8 py-4 bg-[#7D5A9C] hover:bg-[#6b4787] text-white font-bold rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-1 text-lg"
                            >
                                Take Me Home
                            </Link>
                            <Link
                                href="/requestSession"
                                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#7D5A9C] text-[#7D5A9C] hover:bg-gray-50 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
                            >
                                Find a Listener
                            </Link>
                        </div>

                    </div>

                    {/* Floating Help Text */}
                    <p className="mt-8 text-gray-500 font-medium">
                        Need immediate help? Visit our <Link href="/safety" className="text-blue-500 hover:underline">Safety Resources</Link>.
                    </p>
                </main>
            </div>
        </HeaderFooter>
    );
}
