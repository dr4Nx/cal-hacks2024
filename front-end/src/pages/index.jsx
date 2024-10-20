import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
// React
import { motion } from "framer-motion"
// React Server Components


const Home = ({ loggedIn }) => {
    
    return (
        <>
            <div className='w-full h-dvh'> {/*for the titlest page*/}
                <div className='text-center mt-[350px]'>
                    <h1 className="text-5xl font-bold font-poppins">
                        Tutoring.
                        <br />
                        Anytime, Anywhere
                    </h1>
                    <br />
                    <p className='font-figtree'>No more one am crying sessions. No more feeling like an academic victim. Become academia :D</p>
                    <br />
                    <Link to={loggedIn ? "/profile" : "/login"} className="bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white">Get Started</Link>
                </div>

            </div>
            <div className='bg-lightsage flex overflow-hidden rounded-xl min-h-fit my-24 mx-10'>{/*for the about section*/}
                <div className='drop-shadow-sm bg-white font-figtree float-left text-[32px] overflow-hidden rounded-xl tracking-wide min-h-fit ml-10 my-[10%] min-w-[600px] w-5/12 p-10'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                </div>
                <div className="float-right  text-center w-[50%]">
                    {/*Fix 24/7 academic support heading not wrapping and going below the textbox :(*/}
                    <h2 className='font-bold font-poppins text-wrap text-[42px] mt-[50%]'>24/7 Academic Support</h2>
                    <br />
                    <Link to={loggedIn ? "/profile" : "/login"} className="bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white">Get Started</Link>
                </div>
            </div>
            <div className="w-full h-lvh pl-10">
                <h2 className="font-bold text-[42px] font-poppins mt-[30%]">Help others, and win</h2>
                <p className="font-figtree text-[28px] mr-80">Did you know that personally leaning a subject only makes up 60% of truly comprehending a subject? Well, it's true, and the last 40% of learning comes from successfully teaching someone else the subject. Here at *insert company name*, not only can you truly understand any subject through tutoring, but you can also win prizes via our points system.</p>
                <br></br>
                <Link to={loggedIn ? "/profile" : "/login"} className="bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white">Get Started</Link>
                {/*change to /prizes once you make it*/}
            </div>
            <div className ="text-[40px] font-bold italic font-figtree">
            <Marquee>
                BE AT THE FRONTLINES OF EDUCATION FOR ALL
            </Marquee>
            </div>
        </>
    );
};

export default Home;