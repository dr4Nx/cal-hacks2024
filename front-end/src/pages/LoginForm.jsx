import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setLoading }) => {
  const auth = getAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    

    e.preventDefault();
    setError("");
    try {
      // Sign in
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      toast.error("Incorrect Login");
    }
  };
  return (
    <>
      <h1 className="font-bold">Login Page</h1>
      <p>Welcome back! Please login to continue.</p>
      <form onSubmit={submitLogin}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          className="bg-sage hover:bg-lightsage rounded my-3 p-2 text-white"
          value="submit"
        />
      </form>
    </>
  );
};

export default LoginForm;
