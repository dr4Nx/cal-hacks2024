import Navbar from "./components/Navbar/NavBar.jsx";
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/index.jsx"
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"
import Ask from "./pages/ask.jsx"
import Provide from "./pages/provide.jsx"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Don't hardcode this, use environment variables



export default function App() {
  const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_APP_ID}`,
    measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`
  };

  
  const app = initializeApp(firebaseConfig);
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/ask" element={<Ask />}/>
        <Route path="/provide" element={<Provide />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login app={app} />}/>
      </Routes>

    </Router>
    
    
    </>
  )
}
