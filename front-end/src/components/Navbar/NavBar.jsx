
import { useEffect } from "react";
const Block= ({link,pagename})=>{
    return(
        <>
         <a href = {link}>
        <div className ='top-0 hover:bg-white text-white float-right text-center p-5'>
           <p>{pagename}</p>
        </div>
        </a>
        </>
    );
}
const JoinButton= ({link,pagename})=>{
    return(
        <>
         <a href = {link}>
        <div className ='top-0 rounded hover:bg-white text-white float-right text-center p-5 m-1'>
           <p>{pagename}</p>
        </div>
        </a>
        </>
    );
}
const Navbar =({loggedIn}) =>{
    return(
        <div className = "sticky top-0 bg-sage overflow-hidden">
            {loggedIn ? <Block link="/logout" pagename="Logout"/> : <Block link="/login" pagename="Join Us!"/>}
            <Block link="/ask" pagename="Ask"/>
            <Block link="/provide" pagename="Provide"/>
            {loggedIn ? <p>Logged In!</p> : <p>Not Logged In!</p>}
        </div>
    );
}

export default Navbar;