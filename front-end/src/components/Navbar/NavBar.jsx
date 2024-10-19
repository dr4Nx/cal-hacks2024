
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
const Navbar =() =>{
    return(
        <div className = "sticky top-0 bg-sage overflow-hidden">
          
            <Block link="/about" pagename="About"/>
            <Block link="/login" pagename="Login"/>
            
        </div>
    );
}

export default Navbar;