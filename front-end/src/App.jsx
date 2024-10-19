import Navbar from "./components/Navbar/NavBar.jsx";
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/index.jsx"
import About from "./pages/about.jsx"
import Login from "./pages/login.jsx"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Don't hardcode this, use environment variables



export default function App() {
  // const firebaseConfig = {
  //   apiKey: `${import.meta.env.API_KEY}`,
  //   authDomain: `${import.meta.env.AUTH_DOMAIN}`,
  //   projectId: `${import.meta.env.PROJECT_ID}`,
  //   storageBucket: `${import.meta.env.STORAGE_BUCKET}`,
  //   messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  //   appId: `${import.meta.env.APP_ID}`,
  //   measurementId: `${import.meta.env.MEASUREMENT_ID}`
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyCNCkueEOa_YsTg4AvREfKBOmyX0WNPf88",
    authDomain: "calhacks-2024-d14cb.firebaseapp.com",
    projectId: "calhacks-2024-d14cb",
    storageBucket: "calhacks-2024-d14cb.appspot.com",
    messagingSenderId: "997204657070",
    appId: "1:997204657070:web:3be4f71b699796f4dcbe3f",
    measurementId: "G-1ZYP2WF6PY"
  };
  
  const app = initializeApp(firebaseConfig);
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login app={app} />}/>
      </Routes>

    </Router>
    
    
    </>
  )
}
