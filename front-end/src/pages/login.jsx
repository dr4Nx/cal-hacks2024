import LoginForm  from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";


const Login = ({ app, setUserCredential, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        // Sign in
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login successful");
        setUserCredential(userCredential);
        setLoggedIn(true);
        navigate("/");
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Login successful");
        setUserCredential(userCredential);
        setLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      toast.error("Incorrect Login");
    }
  };

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
            {isLogin ? (
                <LoginForm
                    submitLogin={submitLogin}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            ) : (
                <RegisterForm
                    submitLogin={submitLogin}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            )}
        </div>
    </>
);
};

export default Login;
