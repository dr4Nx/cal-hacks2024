import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";


const RegisterForm = ({setLoading}) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getFirestore();
  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    const user = {
      fullName: fullName,
      email: email,
      username: username,
      requests: 0,
      expertisetopics: []
    };
    const currdoc = doc(db, "users", userId);
    await setDoc(currdoc, user);
    setLoading(false);
    navigate("/");
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-center my-10">
        Unlock your academic potential
      </h1>
      <div className="bg-lightsage rounded shadow p-10 m-10 text-center">
        <h3 className="font-bold">Enter your information</h3>
        <form onSubmit={submitLogin}>
          <input
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <br />
          <input
            className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            className="bg-sage hover:bg-lightsage rounded my-3 p-2 text-white"
            value="submit"
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
