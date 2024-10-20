import { useState } from 'react';
import Marquee from "react-fast-marquee";
const Tabs = ({ text, setPage, page }) => {
    return (
        <>

            <input type="button" className="text-center bg-opacity-20 hover:bg-lightsage text-white font-figtree w-full py-3" value={text} onClick={() => { setPage(page) }}>
            </input>


        </>
    );
}
const Sidebar = ({ name, lastName, setPage }) => {
    return (
        <>
            <div className="fixed top-0 bg-darksage h-full min-w-[300px] w-1/4 pt-32 text-center">
                <h2 className="text-white font-bold text-[48px] font-poppins">{name + " " + lastName}</h2>
                <Tabs text="Profile" setPage={setPage} page={0} />
                <Tabs text="Requests Manager" setPage={setPage} page={1} />
                <Tabs text="Store" setPage={setPage} page={2} />
            </div>
        </>
    );

}
const TabProfile = () => {
    return (
        <>
            <div className="ml-[25%] mt-[125px]">
                <h1 className="text-center font-poppins font-bold text-[48px] mb-[20px]">Hi John!</h1>
                <div className="flex justify-center items-start space-x-8">
                    <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-5/12"> {/*stats*/}
                        <h3 className="font-poppins font-bold text-[24px]">John Doe</h3>
                        <div className="font-figtree">
                            <p>Email</p>
                            <p className="text-sage">johndo@berkeley.edu</p>
                            <p>Username</p>
                            <p className="text-sage">john-doe-21</p>
                            <p>Education</p>
                            <p className="text-sage">UC Berkeley - Bachelors in Bear Business</p>
                            <p>Preferred meeting format</p>
                            <p className="text-sage">Zoom, Google Meets, in the great wide world ~~</p>
                        </div>
                        <input type="button" value="Edit Profile" className="rounded-lg font-figtree bg-sage text-white p-2"></input>
                    </div>
                    <div className="flex flex-col space-y-8 w-5/12">
                        <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full"> {/*Tutoring*/}
                            <h3 className="font-poppins font-bold text-[24px]">Tutoring</h3>
                            <div className="font-figtree">
                                <p className="font-bold">Subjects</p>
                                <p className="text-sage">Calculus, Linear Algebra, Diffrential Equations, Bear Physics</p>
                            </div>
                        </div>
                        <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full"> {/*profile*/}
                            <h3 className="font-poppins font-bold text-[24px]">Stats</h3>



                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

const TabRequests = () => {
    return (
        <>
        <div className="mt-[125px] ml-[25%]">
            <h1 className ="font-poppins font-bold text-[48px] text-center">Requests Manager</h1>
            <p className = "font-poppins font-semibold text-[30px] ml-[5%] my-10">Active Requests</p>
            <p className = "font-figtree text-sage italic ml-[5%]">There are currently no active requests</p>
            <p className = "font-poppins font-semibold text-[30px] ml-[5%] my-10">Past Requests</p>

            

        </div>
        </>
    );
}
const TabStore = () => {
    return (
        <>
        </>
    );
}
const Profile = () => {
    const [page, setPage] = useState(0);
    const [activeReq, setActiveRec] = useState(false);

    const choosePage = () => {
        switch (page) {
            case 0:
                return <TabProfile />
            case 1:
                return <TabRequests />;
            case 2:
                return <TabStore />
        }

    }

    return (
        <>
            <div className="fixed top-0 right-0 w-9/12 shadow font-figtree ml-3/12 mt-[80px]">
                <Marquee>
                    There are currently 2014 open tutoring requests and 10523 available tutors!

                </Marquee>
            </div>
            <Sidebar name="John" lastName="Doe" setPage={setPage} />
            {choosePage()}
        </>



    );
};

export default Profile;