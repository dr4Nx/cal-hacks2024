import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getFirestore , doc, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Ask = () => {
  const [subject, setSubject] = useState("");
  const [specificTopic, setSpecificTopic] = useState("");
  const [studentUsername, setStudentUsername] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
        toast.error("You are not Logged In!");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const studentId = user.uid;

      try {
        const docRef = doc(db, 'users', studentId); // Reference to the specific request document
        const docSnap = await getDoc(docRef); // Get the document from Firestore

        if (docSnap.exists()) {
          setStudentUsername(docSnap.data().username); // If request exists, set it to state

          await addDoc(collection(db, "requests"), {
            topic: subject,
            description: specificTopic,
            complete: false,
            date_created: serverTimestamp(),
            student_id: studentId,
            student_username: studentUsername,
            tutor_id: null,
            tutor_username: null
          });
  
          // Reset form fields after submission
          setSubject("");
          setSpecificTopic("");
  
          // Optionally, show a success message or redirect
          alert("Request submitted successfully!");
        } else {
          setError('Request not found'); // If no such document, set an error message
        }
      } catch (err) {
        console.log(err)
        setError('Failed to fetch request'); // Handle any errors
      }

      try {
        // Add a new document to the 'requests' collection in Firestore

        

      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      navigate("/login");
      toast.error("you are not logged in")
    }

    if (error) return <div>{error}</div>;
  };

  return (
    <div className = "justify-center text-center mt-[125px]">
      <h1 className = "font-poppins font-bold text-[48px] mb-[20px] ">We are happy to help!</h1>
      <div className="bg-lightsage rounded drop-shadow-lg p-10 m-auto text-center min-w-[450px] w-5/12">
        <h1 className="font-bold font-figtree mb-[20px]">What do you need help with?</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="block shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            className="block shadow border-none resize-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Specific topic (the more specific you are, the better we can match you!)"
            value={specificTopic}
            onChange={(e) => setSpecificTopic(e.target.value)}
          />
          <input
            type="submit"
            className="bg-sage hover:bg-lightsage rounded my-3 p-2 text-white"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Ask;
