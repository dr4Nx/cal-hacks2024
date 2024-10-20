import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import RequestCard from './RequestCard'; // Import the card component
import Spinner from '../Spinner';
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";

const RequestRecyclerView = () => {
  const [requests, setRequests] = useState([]);
  const [sortOption, setSortOption] = useState('earliest'); // New state for sorting option
  const db = getFirestore();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const requestsData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(request => request.tutor_id === null);
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
        return requests.sort((a, b) => a.date_created - b.date_created);
      case 'latest':
        return requests.sort((a, b) => b.date_created - a.date_created);
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
      <div className ="font-figtree mx-6 my-4">
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
      </div>

      {requests.length > 0 ? (
        <div>
          {sortRequests(requests).map((request) => (
            <XyzTransition appear xyz="fade down stagger duration-5">
            <div>
            <RequestCard
              key={request.id}
              id={request.id}
              topic={request.topic}
              description={request.description}
              studentUsername={request.student_username}
              tutorId={request.tutor_id}
              complete={request.complete}
              dateCreated={request.date_created}
            />
            </div>
            </XyzTransition>
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