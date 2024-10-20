import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Ask = () => {
  const [subject, setSubject] = useState("");
  const [specificTopic, setSpecificTopic] = useState("");
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
            // Add a new document to the 'requests' collection in Firestore
            
            await addDoc(collection(db, "requests"), {
              topic: subject,
              description: specificTopic,
              complete: false,
              date_created: serverTimestamp(),
              student_id: studentId,
              tutor_id: null
            });
      
            // Reset form fields after submission
            setSubject("");
            setSpecificTopic("");
      
            // Optionally, show a success message or redirect
            toast.success("Request submitted successfully!");
            navigate("/profile");
      
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    } else {
        navigate("/login");
        toast.error("You are not Logged In!")
    }
    
    
  };

  return (
    <div>
      <div className="bg-lightsage rounded shadow p-10 m-10 text-center">
        <h1 className="font-bold">What is subject hurting you</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select 
            className = "shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            name="Days Dropdown" 
            id="Days_Dropdown" 
            multiple 
            size="5">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
        </select>
          <textarea
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
