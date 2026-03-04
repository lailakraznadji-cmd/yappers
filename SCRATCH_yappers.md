### Tactical
- [EVIDENCE] Firebase `window is not defined` execution path resolved: Next.js SSR executes `firebaseConfig.js` on the Node server where `window` does not exist. The resolution is `typeof window !== 'undefined' ? getAnalytics(app) : null;`.
- [EVIDENCE] `admin.js` dashboard now requires silent authentication (`signInAnonymously`) to interact with Firestore `chat_rooms`, otherwise security rules will block the `onSnapshot` listener.
- [EVIDENCE] `onSnapshot` sorting constraint: Firestore requires compound indices for queries using both `where()` and `orderBy()`. To avoid manual index creation in the console, sorting is handled client-side in `admin.js` (`rooms.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())`).

### Strategic
- [RESEARCH] **Real-time Architecture**: The application pivoted from statically storing session requests to a fully real-time chat architecture using Firebase Anonymous Auth and Firestore `onSnapshot`.
- [RESEARCH] **Data Flow**: `requestSession.js` silently authenticates the user, creates a `chat_rooms` document, and routes them to a dynamic `[roomId].js` page. `admin.js` listens to all rooms with `status: 'waiting'`.
- [PROPOSED] **Admin Route Security**: `AdminRoute.js` acts as an MVP Higher-Order Component. Currently, it allows any authenticated user (including anonymous) so the client can test the dashboard locally. Before true production launch, this MUST be updated to verify the user is a non-anonymous Admin (via custom claims or Firebase Google/Email auth).
- [PROPOSED] **Firebase Rules Setup Action**: The `firestore.rules` file has been written to disk but MUST be manually copy-pasted into the Firebase Console -> Firestore Database -> Rules tab by the system administrator to take effect.
