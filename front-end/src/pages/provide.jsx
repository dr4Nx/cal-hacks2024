
import RequestRecyclerView from '../components/recyclerlistview/requestRecyclerview';
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Provide = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
        toast.error("You are not Logged In!");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Available Requests</h1>
      <RequestRecyclerView />
    </div>
  );
};

export default Provide;
