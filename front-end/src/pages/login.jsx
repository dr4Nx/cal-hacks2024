import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({app}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLogin = true;
  
  const auth = getAuth(app);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        // Sign in
        await signInWithEmailAndPassword(auth, username, password);
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, username, password);
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }

    console.log("Submitted login");
  };

  return (
    <>
      <div className="bg-white rounded shadow p-10 m-10 text-center">
        <h1 className="font-bold">Login Page</h1>
        <p>
          Welcome back! Please login to continue. Your email is your username
        </p>
        <form onSubmit={submitLogin}>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
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
      </div>
    </>
  );
};

export default Login;
