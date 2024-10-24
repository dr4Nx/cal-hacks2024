import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
// React Server Components


const Home = ({ loggedIn }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
        console.log(window.scrollY);
    }

    useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div onScroll={handleScroll} className="scrollable-element">
            <XyzTransition appear xyz="fade down duration-10">
                <div className='w-full h-[70dvh] triangle'> {/*for the titlest page*/}
                    <div className='text-center mt-[350px]'>

                        <h1 className="text-[5rem] font-bold font-poppins">
                            Tutoring.
                            <br />
                            Anytime, Anywhere
                        </h1>

                        <br />
                        <p className='font-figtree text-5xl mb-5'>Your path to learning starts here.</p>
                        <br />
                        <Link to={loggedIn ? "/profile" : "/login"} className="transition ease-in-out delay-150 bg-sage hover:bg-darksage rounded font-figtree my-5 p-4 text-white">Get Started</Link>
                    </div>
                </div>
            </XyzTransition>
            <div className="bg-lightsage w-full h-[10dvh]"></div>
            <div className="text-[80px] font-bold italic font-figtree">
            <Marquee>
                    BE AT THE FRONTLINES OF EDUCATION FOR ALL.
            </Marquee>
            </div>
            <div className='bg-lightsage flex overflow-hidden min-h-[80dvh]'>{/*for the about section*/}
                <XyzTransition appear xyz="fade down duration-10">
                {window.scrollY > 600 && <div className='drop-shadow-sm bg-white font-figtree float-left text-[32px] overflow-hidden rounded-md tracking-wide min-h-fit ml-10 my-[10%] min-w-[600px] w-5/12 p-10'>
                        <p>We believe that education should be accessible, flexible, and empowering for everyone. Our platform connects learners with experienced tutors from around the world, anytime and anywhere. Whether you're looking for help in mastering a challenging subject, preparing for exams, or exploring new skills, we have the perfect tutor for you.
 </p>
                    </div> }
                </XyzTransition>
                <XyzTransition appear xyz="fade down duration-10">
                    {window.scrollY > 600 && <div className="float-right  text-center w-[50%]">
                        {/*Fix 24/7 academic support heading not wrapping and going below the textbox :(*/}
                        <h2 className='font-bold font-poppins text-wrap text-[60px] mt-[40%]'>24/7 Academic Support</h2>
                        <br />
                        <Link to={loggedIn ? "/profile" : "/login"} className="transition ease-in-out delay-150 bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white">Get Started</Link>
                    </div>}
                </XyzTransition>
            </div>
            <div className="reverse-triangle">
            <div className="w-full pl-10 py-[20%] min-h-[100dvh]" >
                <XyzTransition appear xyz="fade left stagger duration-8">
                    {window.scrollY > 1400 && <div>
                        <h2 className="font-bold text-[42px] font-poppins ">Help others, and win</h2>
                    </div>}
                </XyzTransition>
                <XyzTransition appear xyz="fade left stagger duration-9">
                    {window.scrollY > 1550 && <div>
                        <p className="font-figtree text-[28px] mr-80">Did you know that personally leaning a subject only makes up 60% of truly comprehending a subject? Well, it's true, and the last 40% of learning comes from successfully teaching someone else the subject. Here at Tutori.ai, you can unlock your last 40% of understanding by becoming a tutor anytime, anywhere.</p>
                    </div>}
                </XyzTransition>
                <br></br>
                <Link to={loggedIn ? "/profile" : "/login"} className="transition ease-in-out delay-150 bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white">Become a tutor</Link>
                {/*change to /prizes once you make it*/}
            </div>
            
            </div>
            <div className="bg-white w-full h-[10dvh]"></div>
            </div>
    );
};

export default Home;