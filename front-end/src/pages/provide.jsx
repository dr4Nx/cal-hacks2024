
import RequestRecyclerView from '../components/recyclerlistview/requestRecyclerview';
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";

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
      <XyzTransition appear xyz="fade down duration-10">
      <div>
      <h1 className ="text-center text-[48px] font-poppins font-bold">Available Requests</h1>
      </div>
      </XyzTransition>
      <XyzTransition appear xyz="fade down duration-10">
      <div>
      <p className ="text-center text-[24px] font-figtree">Click on any post for more details and/or to accept the request</p>
      </div>
      </XyzTransition>
      <RequestRecyclerView />
      <div className="text-[40px] font-bold italic font-figtree mt-[20dvh] w-full">
            <Marquee>
                    BE AT THE FRONTLINES OF EDUCATION FOR ALL.
            </Marquee>
      </div>      
    </div>
  );
};

export default Provide;
