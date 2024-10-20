import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom' 
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Request = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
        toast.error("Not Logged In!")
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const requestId = useParams().id; 
  const [request, setRequest] = useState(null); // State to store the request data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling
  const db = getFirestore();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const docRef = doc(db, 'requests', requestId); // Reference to the specific request document
        const docSnap = await getDoc(docRef); // Get the document from Firestore

        if (docSnap.exists()) {
          setRequest(docSnap.data()); // If request exists, set it to state
        } else {
          setError('Request not found'); // If no such document, set an error message
        }
      } catch (err) {
        setError('Failed to fetch request'); // Handle any errors
      } finally {
        setLoading(false); // Always set loading to false when the data is fetched or error occurs
      }
    };

    fetchRequest();
  }, [db, requestId]); // Fetch the request whenever the requestId changes

  if (loading) return <Spinner loading={loading} />;
  if (error) return <div>{error}</div>;

  return (
    <div className="request-container">
      {request ? (
        <div className="request-details">
          <h2>Request ID: {requestId}</h2>
          <p><strong>Title:</strong> {request.topic}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Posted by:</strong> {request.student_id}</p>
          <p><strong>Created at:</strong> {request.date_created.toDate().toString()}</p>
        </div>
      ) : (
        <div>No request data available</div>
      )}
    </div>
  );
};

export default Request;