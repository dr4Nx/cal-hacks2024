import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Request = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const requestId = useParams().id;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
        toast.error('Not Logged In!');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const docRef = doc(db, 'requests', requestId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRequest(docSnap.data());
        } else {
          setError('Request not found');
        }
      } catch (err) {
        setError('Failed to fetch request');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [db, requestId]);

  const handleBecomeTutor = async () => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let username;
        let expertise;
        if (docSnap.exists()) {
          username = docSnap.data().username;
          expertise = docSnap.data().expertisetopics;
        } else {
          setError('Request not found');
        }

        const requestDocRef = doc(db, 'requests', requestId);
        await updateDoc(requestDocRef, {
          tutor_id: user.uid,
          tutor_username: username,
          tutor_expertise: expertise,
        });
        toast.success('You are now the tutor for this request!');
        setRequest((prevRequest) => ({
          ...prevRequest,
          tutor_id: user.uid,
          tutor_username: username,
        }));
      } catch (err) {
        console.log(err);
        toast.error('Failed to assign yourself as a tutor');
      }
    } else {
      toast.error('You need to be logged in to become a tutor');
    }
  };

  const handleComplete = async () => {
    if (user) {
      try {
        const requestDocRef = doc(db, 'requests', requestId);
        await updateDoc(requestDocRef, {
          complete: true,
        });
        toast.success('Request marked as complete!');
        setRequest((prevRequest) => ({
          ...prevRequest,
          complete: true,
        }));
      } catch (err) {
        console.log(err);
        toast.error('Failed to mark request as complete');
      }
    } else {
      toast.error('You need to be logged in to mark a request as complete');
    }
  }

  if (loading) return <Spinner loading={loading} />;
  if (error) return <div>{error}</div>;

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-200 p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Request</h1>
        {request ? (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Title:</label>
              <input
                type="text"
                value={request.topic}
                className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block font-semibold">Description:</label>
              <textarea
                value={request.description}
                className="w-full p-2 bg-gray-100 rounded-md h-24 focus:outline-none"
                disabled
              />
            </div>
            <div>
              <p className="font-semibold">Posted by: {request.student_username}</p>
            </div>
            <div>
              <p className="font-semibold">
                Status: {request.complete ? 'Complete' : 'Incomplete'}
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Created at: {request.date_created.toDate().toString()}
              </p>
            </div>
            <div>{request.tutor_id ? (
              <p className="font-semibold">
                Tutor: {request.tutor_username || 'unassigned'}
              </p>
            ) : (
              user &&
              user.uid !== request.student_id && (
                <input
                  type="button"
                  onClick={() => {handleBecomeTutor()}}
                  className="w-full p-2 bg-sage text-white rounded-md hover:bg-lightsage"
                  value="Become Tutor"
                />
              )
            )}
            </div>
            <div>{request.tutor_id && user.uid == request.tutor_id && (
              request.student_email
              && <a href={`mailto:${request.student_email}`} className="w-full my-2 p-2 bg-sage text-white rounded-md hover:bg-lightsage">Contact Student: {request.student_email}</a>)}
            </div>
            <div>
            {request.tutor_id && user.uid == request.student_id && !request.complete && (
              <>
              <p>
                Their Expertise: {request.tutor_expertise.join(", ")}
              </p>
              <input
                type="button"
                onClick={() => {handleComplete()}}
                className="w-full my-5 p-2 bg-sage text-white rounded-md hover:bg-lightsage"
                value="Mark as Complete"
                />
              </>
            )}
            </div>
          </div>
        ) : (
          <div>No request data available</div>
        )}
      </div>
    </div>
  );
};

export default Request;
