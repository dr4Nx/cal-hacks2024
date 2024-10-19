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
export default function App() {
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
        
      </Routes>
      
    </Router>
    
    
    </>
  )
}
