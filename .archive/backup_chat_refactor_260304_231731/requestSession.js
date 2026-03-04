import { useState } from 'react';
import HeaderFooter from '../component/HeaderFooter';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RequestSession() {
    const [topic, setTopic] = useState('');
    const [contactMethod, setContactMethod] = useState('');
    const [availability, setAvailability] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!topic || !contactMethod || !availability) {
            setError('Please fill out all fields so we can best assist you.');
            return;
        }

        setSubmitting(true);
        try {
            await addDoc(collection(db, 'session_requests'), {
                topic,
                contactMethod,
                availability,
                timestamp: serverTimestamp(),
                status: 'pending' // Simple default status
            });
            setMessage('Your request has been securely submitted. A listener will reach out to you via your preferred contact method shortly.');
            setTopic('');
            setContactMethod('');
            setAvailability('');
        } catch (err) {
            console.error("Error submitting session request: ", err);
            setError('An error occurred while submitting your request. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="bg-yappersCream rounded-3xl shadow-lg p-8 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-[#7D5A9C] mb-4 text-center">Request a Session</h1>
                    <p className="text-gray-700 text-lg mb-8 text-center">
                        Need someone to talk to? Fill out the form below to connect with a listener in a safe, non-judgmental space.
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
                            <label htmlFor="topic" className="block text-gray-800 font-semibold mb-2">
                                Topic / Reason for Session
                            </label>
                            <select
                                id="topic"
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yappersLightBlue focus:border-transparent transition-all shadow-sm appearance-none"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                disabled={submitting}
                            >
                                <option value="" disabled>Select a topic...</option>
                                <option value="Venting">I just need to vent</option>
                                <option value="Advice">I'm seeking advice</option>
                                <option value="Loneliness">I feel lonely and want to chat</option>
                                <option value="Stress">I'm feeling stressed/anxious</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="contactMethod" className="block text-gray-800 font-semibold mb-2">
                                Preferred Contact Method
                            </label>
                            <input
                                type="text"
                                id="contactMethod"
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yappersLightBlue focus:border-transparent transition-all shadow-sm"
                                placeholder="e.g., Discord (Username#1234), Email (you@example.com)"
                                value={contactMethod}
                                onChange={(e) => setContactMethod(e.target.value)}
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label htmlFor="availability" className="block text-gray-800 font-semibold mb-2">
                                Availability / Preferred Times
                            </label>
                            <textarea
                                id="availability"
                                rows="4"
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yappersLightBlue focus:border-transparent transition-all shadow-sm resize-y"
                                placeholder="Let us know when you are generally available (include your timezone)."
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                                disabled={submitting}
                            />
                        </div>

                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                disabled={submitting || !topic || !contactMethod || !availability}
                                className={`w-full sm:w-auto px-8 py-4 font-bold text-gray-800 rounded-2xl shadow-sm transition-all duration-200 ${submitting || !topic || !contactMethod || !availability
                                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                        : 'bg-yappersLightBlue hover:bg-[#86c8e6] transform hover:-translate-y-1'
                                    }`}
                            >
                                {submitting ? 'Requesting...' : 'Request Listening Session'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderFooter>
    );
}
