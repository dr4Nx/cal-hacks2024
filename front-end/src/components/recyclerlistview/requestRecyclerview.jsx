import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import RequestCard from './RequestCard'; // Import the card component

const RequestRecyclerView = () => {
  const [requests, setRequests] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const requestsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };

    fetchRequests();
  }, [db]);

  return (
    <div className="request-list-container" style={styles.container}>
      {requests.length > 0 ? (
        <div>
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              topic={request.topic}
              description={request.description}
              studentId={request.student_id}
              tutorId={request.tutor_id}
              complete={request.complete}
              dateCreated={request.date_created}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
};

export default RequestRecyclerView;
