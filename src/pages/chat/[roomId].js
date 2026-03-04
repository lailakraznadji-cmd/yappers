import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import HeaderFooter from '../../component/HeaderFooter';
import { db, auth } from '../../firebase/firebaseConfig';
import { collection, doc, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ChatRoom() {
    const router = useRouter();
    const { roomId } = router.query;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [roomStatus, setRoomStatus] = useState('waiting');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!roomId) return;

        // 1. Listen to Room Status (e.g., 'waiting', 'active', 'closed')
        const roomRef = doc(db, 'chat_rooms', roomId);
        const unsubscribeRoom = onSnapshot(roomRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setRoomStatus(docSnapshot.data().status);
            }
        });

        // 2. Listen to Messages Subcollection in Real-time
        const q = query(
            collection(db, 'chat_rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        );

        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        });

        // Cleanup listeners when component unmounts
        return () => {
            unsubscribeRoom();
            unsubscribeMessages();
        };
    }, [roomId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        if (!newMessage.trim() || !roomId || !currentUser) return;

        const messageText = newMessage;
        setNewMessage('');
        setSending(true);

        try {
            await addDoc(collection(db, 'chat_rooms', roomId, 'messages'), {
                text: messageText,
                sender: 'user', // Identifies this as the user who created the request
                userId: currentUser.uid,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error sending message: ", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <HeaderFooter>
            {/* Compute height dynamically but fallback to padding to match the rest of the site's spacing */}
            <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-120px)] min-h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="bg-yappersCream rounded-t-3xl shadow-md p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-[#7D5A9C] flex items-center justify-between">
                        Anonymous Chat Session
                        {roomStatus === 'waiting' && (
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yappersLightBlue opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        {roomStatus === 'waiting' ?
                            'Please wait. A listener will join this room shortly...' :
                            'A listener is here. Your connection is secure.'}
                    </p>
                </div>

                {/* Messages Container */}
                <div className="flex-1 bg-white p-6 overflow-y-auto shadow-inner border-x border-gray-100">
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <p className="text-center text-gray-400 mt-10">Starting connection...</p>
                        )}
                        {messages.map((msg) => {
                            // Check if the current client is the author of this message
                            const isCurrentUser = msg.userId === auth.currentUser?.uid;
                            return (
                                <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${isCurrentUser
                                            ? 'bg-yappersLightBlue text-gray-800 rounded-tr-sm'
                                            : 'bg-gray-100 text-gray-800 rounded-tl-sm border border-gray-200'
                                        }`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input Box relative to Chat block */}
                <div className="bg-yappersCream rounded-b-3xl shadow-md p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                            type="text"
                            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7D5A9C] transition-shadow shadow-sm"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={sending}
                        />
                        <button
                            type="submit"
                            disabled={sending || !newMessage.trim()}
                            className="bg-[#7D5A9C] hover:bg-[#6b4787] text-white px-8 py-3 rounded-full font-bold shadow-sm disabled:opacity-50 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </HeaderFooter>
    );
}
