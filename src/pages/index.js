import Link from "next/link";
import HeaderFooter from "../component/HeaderFooter";

export default function Home() {
    return (
        <HeaderFooter>
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <h1 className="text-5xl font-extrabold text-[#7D5A9C] mb-6 tracking-tight">Welcome to Yappers</h1>
                <p className="text-xl text-gray-700 mb-10 max-w-xl">
                    A safe, bilingual space to share your stories, seek support, and be heard.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link href="/submitStory" className="bg-yappersLightBlue hover:bg-[#86c8e6] text-slate-800 font-semibold py-4 px-8 rounded-2xl shadow-sm transition-all duration-200 transform hover:-translate-y-1">
                        Submit Your Story
                    </Link>
                    <Link href="/requestSession" className="bg-yappersPeach hover:bg-[#e8a361] text-slate-800 font-semibold py-4 px-8 rounded-2xl shadow-sm transition-all duration-200 transform hover:-translate-y-1">
                        Request a Session
                    </Link>
                </div>
            </div>
        </HeaderFooter>
    );
}