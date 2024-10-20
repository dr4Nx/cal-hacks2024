import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import Marquee from "react-fast-marquee";

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
    return <Spinner loading={loading} />;
  }

  return (
    <>
    <XyzTransition appear xyz="fade down duration-10">
    <div className ="mt-[150px]">
    <h1 className ="text-center m-20 font-poppins font-bold text-[48px]">It's great to see you!</h1>
      <div className="justify-center mx-auto mb-4 w-5/12 min-w-[450px]">
        
        <button
          className={`px-4 py-2 rounded-t-lg shadow-l-md font-figtree ml-10 float-left h-[50px] ${
            isLogin ? "transition ease-in-out bg-lightsage" : "transition ease-in-out bg-darksage  text-white"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2  rounded-t-lg shadow-l-md font-figtree h-[50px] ${
            !isLogin ? "transition ease-in-out bg-lightsage" : "transition ease-in-out bg-darksage text-white"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
     
        <div className="bg-lightsage rounded-b-lg rounded-tr-lg shadow-lg p-10 mx-10 my-text-center">
        {isLogin ? <LoginForm setLoading={setLoading} /> : <RegisterForm setLoading={setLoading} />}
      </div>
      </div>
      </div>
      </XyzTransition>
      <div className="text-[40px] font-bold italic font-figtree mt-[20dvh] w-full">
            <Marquee>
                    BE AT THE FRONTLINES OF EDUCATION FOR ALL.
            </Marquee>
      </div>
    </>
  );
};

export default Login;
