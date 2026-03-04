import { useState, useEffect } from 'react';
import HeaderFooter from '../component/HeaderFooter';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { signInAnonymously } from 'firebase/auth';

export default function AdminDashboard() {
    const [waitingRooms, setWaitingRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Authenticate the admin/volunteer silently
        signInAnonymously(auth).catch((error) => {
            console.error("Admin Auth Error:", error);
        });

        // Listen for rooms that are 'waiting'
        const q = query(
            collection(db, 'chat_rooms'),
            where('status', '==', 'waiting')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const rooms = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort by createdAt client-side (since Firestore requires compound indices for where + orderBy)
            rooms.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return b.createdAt.toMillis() - a.createdAt.toMillis();
            });

            setWaitingRooms(rooms);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAcceptSession = async (roomId) => {
        try {
            // Update room status to 'active' so it drops off the waiting list
            const roomRef = doc(db, 'chat_rooms', roomId);
            await updateDoc(roomRef, {
                status: 'active',
                listenerId: auth.currentUser?.uid || 'anonymous-listener'
            });

            // Redirect the volunteer into the active chat room
            router.push(`/chat/${roomId}`);
        } catch (error) {
            console.error("Error accepting session: ", error);
            alert("Failed to accept session. Someone else may have grabbed it.");
        }
    };

    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="bg-yappersCream rounded-3xl shadow-lg p-8 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-[#7D5A9C] mb-4 text-center">Listener Dashboard</h1>
                    <p className="text-gray-700 text-lg mb-8 text-center">
                        Active waitlist of users requesting a chat session right now.
                    </p>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading open requests...</div>
                        ) : waitingRooms.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <span className="block text-4xl mb-3">☕</span>
                                No users are currently waiting. Great job!
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {waitingRooms.map((room) => (
                                    <li key={room.id} className="p-6 transition-colors hover:bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="bg-yappersLightBlue text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    {room.topic || 'General'}
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    {room.createdAt ? new Date(room.createdAt.toMillis()).toLocaleTimeString() : 'Just now'}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                ID: <span className="font-mono">{room.id}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAcceptSession(room.id)}
                                            className="w-full sm:w-auto bg-[#7D5A9C] hover:bg-[#6b4787] text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-transform transform hover:-translate-y-1"
                                        >
                                            Accept & Join
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </HeaderFooter>
    );
}
