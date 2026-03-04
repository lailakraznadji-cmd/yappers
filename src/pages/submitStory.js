import { useState } from 'react';
import HeaderFooter from '../component/HeaderFooter';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SubmitYourStory() {
    const [story, setStory] = useState('');
    const [consent, setConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (story.length < 10) {
            setError('Please write at least 10 characters to share your story meaningfully.');
            return;
        }
        if (!consent) {
            setError('You must explicitly consent to sharing your anonymously submitted story.');
            return;
        }

        setSubmitting(true);
        try {
            await addDoc(collection(db, 'stories'), {
                text: story,
                timestamp: serverTimestamp(),
            });
            setMessage('Your story has been successfully submitted to a safe space. Thank you for sharing.');
            setStory('');
            setConsent(false);
        } catch (err) {
            console.error("Error adding document: ", err);
            setError('An error occurred submitting your story. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="bg-yappersCream rounded-3xl shadow-lg p-8 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-[#7D5A9C] mb-4 text-center">Submit Your Story</h1>
                    <p className="text-gray-700 text-lg mb-8 text-center">
                        Share your experiences anonymously in a safe and supportive environment.
                    </p>

                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 shadow-sm" role="alert">
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-sm" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="story" className="block text-gray-800 font-semibold mb-2">
                                Your Story
                            </label>
                            <textarea
                                id="story"
                                rows="8"
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yappersLightBlue focus:border-transparent transition-all shadow-sm resize-y"
                                placeholder="Start writing here... (minimum 10 characters)"
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                                disabled={submitting}
                            />
                            <p className="text-sm text-gray-500 mt-2 text-right">
                                {story.length} / 10 characters minimum
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    className="w-5 h-5 text-yappersLightBlue bg-white border-gray-300 rounded focus:ring-yappersLightBlue transition-all cursor-pointer"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    disabled={submitting}
                                />
                            </div>
                            <label htmlFor="consent" className="ml-3 text-sm text-gray-700 cursor-pointer">
                                I explicitly consent to autonomously sharing this story anonymously on Yappers.
                            </label>
                        </div>

                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                disabled={submitting || story.length < 10 || !consent}
                                className={`w-full sm:w-auto px-8 py-4 font-bold text-gray-800 rounded-2xl shadow-sm transition-all duration-200 ${submitting || story.length < 10 || !consent
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-yappersLightBlue hover:bg-[#86c8e6] transform hover:-translate-y-1'
                                    }`}
                            >
                                {submitting ? 'Submitting...' : 'Share My Story'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderFooter>
    );
}
