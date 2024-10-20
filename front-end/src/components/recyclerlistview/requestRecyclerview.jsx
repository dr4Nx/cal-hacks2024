import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // To get the current user's expertise
import RequestCard from './RequestCard'; // Import the card component
import Spinner from '../Spinner';
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";

const RequestRecyclerView = () => {
  const [requests, setRequests] = useState([]);
  const [sortOption, setSortOption] = useState('earliest'); // New state for sorting option
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false); // State to toggle filtered view
  const [expertiseList, setExpertiseList] = useState([]); // State to hold user's expertise
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [isMatchingSkills, setIsMatchingSkills] = useState(false); // New state to track if skill match is enabled
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    // Fetch current user's expertise
    const fetchUserExpertise = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setExpertiseList(docSnap.data().expertisetopics);
          }
        }
      });
    };

    fetchUserExpertise();
  }, [auth, db]);

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

  // Filter requests by user expertise (only used when search is empty)
  const filterRequestsByExpertise = (requests) => {
    return requests.filter((request) => {
      const requestText = `${request.topic} ${request.description}`.toLowerCase();
      return expertiseList.some(expertise => requestText.includes(expertise.toLowerCase()));
    });
  };

  // Filter requests by search term, but only if the search input is not empty
  const filterRequestsBySearchTerm = (requests) => {
    if (!searchTerm.trim()) {
      return requests; // If search is empty, return all requests
    }

    const searchTermLowerCase = searchTerm.toLowerCase();

    return requests.filter((request) =>
      request.topic.toLowerCase().includes(searchTermLowerCase) ||
      request.description.toLowerCase().includes(searchTermLowerCase) ||
      request.student_username.toLowerCase().includes(searchTermLowerCase)
    );
  };

  // Determine which filter to apply based on search term
  const getFilteredRequests = () => {
    let filtered = requests;

    // If search term is not empty, use the search filter (overrides skill matching)
    if (searchTerm.trim()) {
      filtered = filterRequestsBySearchTerm(requests);
    } else if (isMatchingSkills) {
      // If search is empty and skill matching is enabled, use skill matching
      filtered = filterRequestsByExpertise(requests);
    }

    // Sort the filtered requests
    return sortRequests(filtered);
  };

  // Reset the search and skill matching
  const handleReset = () => {
    setSearchTerm(''); // Clear search term
    setIsMatchingSkills(false); // Disable skill matching
  };

  return (
    <div className="request-list-container" style={styles.container}>
      {/* Dropdown for sorting */}
      <div className="font-figtree mx-6 my-4">
        <div style={styles.dropdown}>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            className=" border-darksage border-2 rounded-md p-2"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="earliest">Earliest to Latest</option>
            <option value="latest">Latest to Earliest</option>
            <option value="alphabetical">Alphabetical A-Z</option>
            <option value="reverseAlphabetical">Reverse Alphabetical Z-A</option>
          </select>
        </div>
        <button
          onClick={() => setIsMatchingSkills(true)} // Enable skill matching
          className="p-2 bg-sage text-white rounded-md hover:bg-lightsage"
        >
          Match Questions to Your Skills
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset} // Call reset handler
          className="p-2 bg-red text-white rounded-md hover:bg-red-700 ml-2"
        >
          Reset
        </button>
      </div>

      {/* Search Bar */}
      <div className="font-figtree mx-6 my-4">
        <input
          type="text"
          placeholder="Search by topic, description, or username"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsMatchingSkills(false); // Disable skill matching if search is active
          }}
          className="p-2 w-1/2 border-darksage border-2 rounded-md"
        />
      </div>

      {requests.length > 0 ? (
        <div>
          {getFilteredRequests().map((request) => (
            <XyzTransition appear xyz="fade down stagger duration-5" key={request.id}>
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