import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  //   const submitLogin = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     try {
  //       if (isLogin) {
  //         // Sign in
  //         const userCredential = await signInWithEmailAndPassword(
  //           auth,
  //           email,
  //           password
  //         );
  //         toast.success("Login successful");
  //         setUserCredential(userCredential);
  //         setLoggedIn(true);
  //         navigate("/");
  //       } else {
  //         // Sign up
  //         const userCredential = await createUserWithEmailAndPassword(
  //           auth,
  //           email,
  //           password
  //         );
  //         toast.success("Login successful");
  //         setUserCredential(userCredential);
  //         setLoggedIn(true);
  //         navigate("/");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       console.log(err.message);
  //       toast.error("Incorrect Login");
  //     }
  //   };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        toast.success("Logged In!");
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            !isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="bg-white rounded shadow p-10 m-10 text-center">
        {isLogin ? <LoginForm setLoading={setLoading} /> : <RegisterForm setLoading={setLoading} />}
      </div>
    </>
  );
};

export default Login;
