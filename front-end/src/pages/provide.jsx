
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
    <div className="mt-[125px]">
      <h1 className ="text-center text-[48px] font-poppins font-bold">Available Requests</h1>
      <p className ="text-center text-[24px] font-figtree">Click on any post for more details and/or to accept the request</p>
      <RequestRecyclerView />
    </div>
  );
};

export default Provide;
