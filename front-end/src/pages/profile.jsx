import { useState } from 'react';
import Marquee from "react-fast-marquee";
const Tabs =({text}) =>{
    return (
        <>
        <div className ="text-center bg-opacity-20 hover:bg-lightsage text-white font-figtree w-full py-3">
        <p>{text}</p>
        </div>
        </>
    );
}
const Sidebar =({name, lastName}) =>{
    return(
        <>
            <div className ="fixed bg-darksage h-full w-1/4 pt-32 text-center">
                <h2 className ="text-white font-bold text-[48px] font-poppins">{name + " "+ lastName}</h2>
                <Tabs text="Profile"/>
                <Tabs text="Requests Manager"/>
                <Tabs text="Store"/>
            </div>
        </>
    );

}
const TabProfile =() =>{
    return(
        <>
        <div className = "float-right">
        <div className ="bg-lightsage text-center mt-10 mr-[100px] p-5 w-[500px]"> {/*profile*/}
            <p>hello</p>
        </div>
        <div className = "float-right"> {/*Tutoring*/}

        </div>
        <div> {/*stats*/}

        </div>
        </div>
        </>
    );
}

const Profile = () => {

    return (
        <>
        <div className = "float-right w-9/12 shadow font-figtree mt-[80px]">
        <Marquee>
            There are currently 2014 open tutoring requests and 10523 available tutors!
                      
        </Marquee>
        </div>
        <Sidebar name ="John" lastName ="Doe"/>
        <TabProfile />
        </>

           
        
    );
};

export default Profile;