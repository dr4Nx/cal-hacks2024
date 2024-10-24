import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const RegisterForm = ({ setLoading }) => {
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
    try {
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
        expertisetopics: [],
      };
      const currdoc = doc(db, "users", userId);
      await setDoc(currdoc, user);
      setLoading(false);
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
      toast.error("Bad Registration");
      toast.error(err.message);
      navigate("/login");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold font-poppins text-[32px]">
          Unlock your academic potential
        </h1>

        <h3 className="font-figtree mt-1 mb-4">Enter your information</h3>
        <div className="font-figtree">
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
              className="transition ease-in-out delay-150 hover:scale-110 bg-sage hover:bg-darksage rounded my-3 p-2 text-white"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
