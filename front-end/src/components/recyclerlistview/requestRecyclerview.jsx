import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import RequestCard from './RequestCard'; // Import the card component
import Spinner from '../Spinner';

const RequestRecyclerView = () => {
  const [requests, setRequests] = useState([]);
  const [sortOption, setSortOption] = useState('earliest'); // New state for sorting option
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

  // Sorting function
  const sortRequests = (requests) => {
    switch (sortOption) {
      case 'earliest':
        return requests.sort((a, b) => a.date_created.toDate() - b.date_created.toDate());
      case 'latest':
        return requests.sort((a, b) => b.date_created.toDate() - a.date_created.toDate());
      case 'alphabetical':
        return requests.sort((a, b) => a.topic.localeCompare(b.topic));
      case 'reverseAlphabetical':
        return requests.sort((a, b) => b.topic.localeCompare(a.topic));
      default:
        return requests;
    }
  };

  return (
    <div className="request-list-container" style={styles.container}>
      {/* Dropdown for sorting */}
      <div style={styles.dropdown}>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="earliest">Earliest to Latest</option>
          <option value="latest">Latest to Earliest</option>
          <option value="alphabetical">Alphabetical A-Z</option>
          <option value="reverseAlphabetical">Reverse Alphabetical Z-A</option>
        </select>
      </div>

      {requests.length > 0 ? (
        <div>
          {sortRequests(requests).map((request) => (
            <RequestCard
              key={request.id}
              id={request.id}
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
        <Spinner loading={true} />
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    marginBottom: '15px',
  },
};

export default RequestRecyclerView;
