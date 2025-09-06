// components/Notifications.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "donationRequests"),
        where("toUserId", "==", currentUser.uid),
        where("status", "==", "pending")
      );

      const snapshot = await getDocs(q);
      const reqList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(reqList);
    };

    fetchRequests();
  }, [currentUser]);

  const respondToRequest = async (id, status) => {
    await updateDoc(doc(db, "donationRequests", id), { status });
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="notification-page">
      <h2>Donation Requests</h2>
      {requests.length === 0 ? (
        <p>No new requests.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="notification-card">
            <p><strong>{req.fromUserName}</strong> is requesting blood donation.</p>
            <button onClick={() => respondToRequest(req.id, "accepted")}>Accept</button>
            <button onClick={() => respondToRequest(req.id, "rejected")}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
