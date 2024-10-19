
import { useEffect } from "react";
const Block= ({link,pagename})=>{
    return(
        <>
         <a href = {link}>
         <div className = 'text-white font-figtree hover:text-sage'>
        <div className ='top-0 hover:bg-white float-right text-center w-[110px] p-7'>
            
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
        <div className ='rounded bg-white font-figtree text-sage float-right text-center p-2 my-5 mx-5'>
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
        <div className = 'bg-lightsage rounded-full float-left w-[45px] h-[45px] my-4 ml-4'><p> </p></div>
        </a>
        </>
    );
}
const Navbar =() =>{
    return(
        <div className = "top-0 fixed w-full bg-sage opacity-90 drop-shadow-md overflow-hidden z-10">
            <Home link = "/" />
            {loggedIn ? <JoinButton link="/logout" pagename="Logout"/> : <JoinButton link="/login" pagename="Join Us!"/>}
            <Block link="/profile" pagename="Profile"/>
            <Block link="/ask" pagename="Ask"/>
            <Block link="/provide" pagename="Provide"/>
        </div>
    );
}

export default Navbar;