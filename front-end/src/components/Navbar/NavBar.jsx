
import { useEffect } from "react";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
const Block= ({link,pagename})=>{
    return(
        <>
         <a href = {link}>
         <div className = 'transition ease-in-out text-white font-figtree hover:text-sage'>
        <div className ='transition ease-in-out top-0 hover:bg-white float-right text-center w-[110px] p-7'>
            
           <p> {pagename}</p>
        </div>
        </div>
        </a>
        </>
    );
}
const JoinButton= ({link,pagename})=>{
    return(
        <>
         <a href = {link}>
        <div className ='transition ease-in-out delay-150 hover:scale-110 hover:bg-lightsage rounded bg-white font-figtree text-sage float-right text-center p-2 my-5 mx-5 hover:drop-shadow-lg '>
           <p>{pagename}</p>
        </div>
        </a>
        </>
    );
}
const Home = ({link}) =>{
    return(
        
        <>
        <a href = {link}>
        {/* <div className = 'bg-lightsage rounded-full float-left w-[45px] h-[45px] my-4 ml-4'><p> </p></div> */}
        <img src="../../../public/whale1.png" className ="size-[5%] float-left my-1 ml-7"></img>
        </a>
        </>
    );
}
const Navbar =({loggedIn}) =>{
    return(
        <div className = "top-0 fixed w-full bg-sage opacity-100 shadow-2xl overflow-hidden z-10">
            <Home link = "/" />
            {loggedIn ? <JoinButton link="/logout" pagename="Log Out"/> : <JoinButton link="/login" pagename="Join Us!"/>}
            {loggedIn ? (<><Block link="/profile" pagename="Profile"/>
            <Block link="/ask" pagename="Ask"/>
            <Block link="/provide" pagename="Provide"/></>): null} 
        </div>
       
    );
}

export default Navbar;