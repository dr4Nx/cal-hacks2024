import { useState, useEffect} from 'react';


const Home = () => {
    function button({whereTo,value}){
        <input
            type="submit"
            className="bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white"
            value={value} onclick ="something" //figure this out
          />
    }
    return (
        <>
        <div className ='w-full h-96'> {/*for the titlest page*/}
        <div className = 'text-center mt-[350px] mb-72'>
         <h1 className="text-5xl font-bold font-poppins">
            Tutoring.
            <br/>
            Anytime, Anywhere
         </h1>  
         <br/>
         <p className = 'font-figtree'>No more one am crying sessions. No more feeling like an academic victim. Become academia :D</p>
        </div>

        </div>
        <div className = 'bg-lightsage overflow-hidden rounded-xl py-24 h-[800px] my-24 mx-10'>{/*for the about section*/}
        <div className = 'drop-shadow-sm bg-white font-figtree float-left text-[32px] rounded-xl tracking-wide ml-10 w-5/12 h-[600px] p-10'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
        </div>
        <div className ="float-left text-center w-6/12 h-[600px] m-2">
        <h2 className ='font-bold font-poppins text-[42px] mt-48 mb-4 ml-6'>Education at your Fingertips</h2>
        <input
            type="submit"
            className="bg-sage hover:bg-darksage rounded font-figtree my-3 p-4 text-white"
            value="Let's go!"
          />
        </div>
        </div>
        <div className ="w-full h-[800px]">
            <h2 className ="font-bold text-[42px] font-poppins text-center">Help others, and win</h2>
            <p>Did you know that personally leaning a subject only makes up 60% of truly comprehending a subject? Well, it's true, and the last 40% of learning comes from successfully teaching someone else the subject. Here at *insert company name*, not only can you truly understand any subject through tutoring, but you can also win prizes via our points system.</p>
        </div>
        </>
    );
};

export default Home;