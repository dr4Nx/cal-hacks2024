import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const LogOut = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    // Redirect to main page
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("firebaseCredential");
        // Assuming you have a way to set loggedIn to false, e.g., a context or a global state
        // setLoggedIn(false);
        setLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default LogOut;
