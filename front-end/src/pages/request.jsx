import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom' 
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Request = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const requestId = useParams().id; 
  const [request, setRequest] = useState(null); // State to store the request data
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling
  const db = getFirestore();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
        toast.error("Not Logged In!")
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

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

  const handleBecomeTutor = async () => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid); // Reference to the specific request document
        const docSnap = await getDoc(docRef); // Get the document from Firestore
        let username;
        if (docSnap.exists()) {
          username = docSnap.data().username; // If request exists, set it to state
        } else {
          setError('Request not found'); // If no such document, set an error message
        }
        
        const requestDocRef = doc(db, 'requests', requestId);
        await updateDoc(requestDocRef, {
          tutor_id: user.uid, // Add the tutor_id field with the current user's ID
          tutor_username: username
        });
        toast.success('You are now the tutor for this request!');
        setRequest((prevRequest) => ({
          ...prevRequest,
          tutor_id: user.uid,
          tutor_username: username // Update the local state as well
        }));
      } catch (err) {
        console.log(err);
        toast.error('Failed to assign yourself as a tutor');
      }
    } else {
      toast.error('You need to be logged in to become a tutor');
    }
  };

  if (loading) return <Spinner loading={loading} />;
  if (error) return <div>{error}</div>;

  return (
    <div className="request-container">
      {request ? (
        <div className="request-details">
          <h2>Request ID: {requestId}</h2>
          <p><strong>Title:</strong> {request.topic}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Posted by:</strong> {request.student_username}</p>
          <p><strong>Status:</strong> {request.complete ? "Complete" : "Incomplete"}</p>
          <p><strong>Created at:</strong> {request.date_created.toDate().toString()}</p>
          {request.tutor_id ? (
            <p><strong>Tutor:</strong> {request.tutor_username ? request.tutor_username : "unassigned"}</p>
          ) : (
            user && user.uid !== request.student_id && ( // Only show the button if the current user is not the request poster
              <button onClick={handleBecomeTutor} className="btn-tutor">Become Tutor</button>
            )
          )}
        </div>
      ) : (
        <div>No request data available</div>
      )}
    </div>
  );
};

export default Request;
