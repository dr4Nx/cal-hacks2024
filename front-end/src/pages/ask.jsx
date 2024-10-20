import React, { useState } from "react";

import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Ask = () => {
  const [subject, setSubject] = useState("");
  const [specificTopic, setSpecificTopic] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

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
        alert("Request submitted successfully!");

      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      navigate("/login");
      toast.error("you are not logged in")
    }


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
          <select
            className="block shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder ="Choose a day"
            > {/*figure out way to default this textbox to be choose a day */}
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
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
