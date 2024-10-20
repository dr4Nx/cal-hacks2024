import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import { getAuth } from "firebase/auth";
import RequestCard from "../components/recyclerlistview/RequestCard"; // Import the card component
import { Link } from "react-router-dom";

import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    getFirestore,
    collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";


const Tabs = ({ text, setPage, page }) => {
    return (
        <>
            <input
                type="button"
                className="transition ease-in-out delay-150 text-center bg-opacity-20 hover:bg-lightsage hover:text-darksage text-white font-figtree w-full py-3"
                value={text}
                onClick={() => {
                    setPage(page);
                }}
            ></input>
        </>
    );
};
const Sidebar = ({ name, setPage }) => {
    const navigate = useNavigate();
    return (

        <>
            <div className="fixed top-0 bg-darksage h-full w-1/4 pt-32 text-center">
                <h2 className="text-white font-bold text-[48px] font-poppins">
                    {name}
                </h2>
                {/* <hr className="border-white my-4" /> */}
                <Tabs text="Profile" setPage={setPage} page={0} />
                <Tabs text="Your Requests/Tutoring" setPage={setPage} page={1} />
                <Tabs text="Make Request" setPage={() => navigate("/ask")} />
                <Tabs text="Provide Help" setPage={() => navigate("/provide")} />
                <Tabs text="Logout" setPage={() => navigate("/logout")} />
                {/* <Tabs text="Store" setPage={setPage} page={2} /> */}
            </div>
        </>
    );
};
const TabProfile = ({ userId, userInfo, setUserInfo, requests, setLoading }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newExpertise, setNewExpertise] = useState(
        userInfo.expertisetopics.join(", ")
    );

    const handleSave = async () => {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setLoading(true);
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(
                userDocRef,
                {
                    username: userInfo.username,
                    fullName: userInfo.fullName,
                    email: userInfo.email,
                    expertisetopics: newExpertise.split(",").map((topic) => topic.trim()),
                },
                { merge: true }
            );
            setLoading(false);
            const updatedUserDoc = await getDoc(userDocRef);
            if (updatedUserDoc.exists()) {
                setUserInfo(updatedUserDoc.data());
            }
            setIsEditing(false);
        }
    };

    return (
        <>
            <div className="ml-[25%] mt-[125px]">
                <XyzTransition appear xyz="fade down duration-8">
                    <div>
                        <h1 className="text-center font-poppins font-bold text-[48px] mb-[20px]">
                            Hi {userInfo.username}!
                        </h1>
                    </div>
                </XyzTransition>
                <div className="flex justify-center items-start space-x-8">
                    <XyzTransition appear xyz="fade down duration-10">
                        <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-5/12">
                            {" "}
                            <h3 className="font-poppins font-bold text-[30px] my-4">
                                {userInfo.fullName}
                            </h3>
                            <div className="font-figtree">
                                {/* <p>Note: Password is not changeable</p> */}
                                <div className="flex justify-between items-center  my-2">
                                    <p>Real Name</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={userInfo.fullName}
                                            onChange={(e) =>
                                                setUserInfo({ ...userInfo, fullName: e.target.value })
                                            }
                                            className="rounded-lg font-figtree bg-white text-black p-2 w-3/4 my-2"
                                        />
                                    ) : (
                                        <p className="text-sage">{userInfo.fullName}</p>
                                    )}
                                </div>
                                <div className="flex justify-between items-center my-2">
                                    <p>Email</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={userInfo.email}
                                            onChange={(e) =>
                                                setUserInfo({ ...userInfo, email: e.target.value })
                                            }
                                            className="rounded-lg font-figtree bg-white text-black p-2 w-3/4 my-2"
                                        />
                                    ) : (
                                        <p className="text-sage">{userInfo.email}</p>
                                    )}
                                </div>
                                <div className="flex justify-between items-center my-2">
                                    <p>Username</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={userInfo.username}
                                            onChange={(e) =>
                                                setUserInfo({ ...userInfo, username: e.target.value })
                                            }
                                            className="rounded-lg font-figtree bg-white text-black p-2 w-3/4 my-2"
                                        />
                                    ) : (
                                        <p className="text-sage">{userInfo.username}</p>
                                    )}
                                </div>
                            </div>
                            {isEditing ? (
                                <input
                                    type="button"
                                    value="Save"
                                    onClick={handleSave}
                                    className="transition ease-in-out delay-150 hover:bg-darksage hover:scale-110 rounded-lg font-figtree bg-sage text-white p-2 mt-2"
                                />
                            ) : (
                                <input
                                    type="button"
                                    value="Edit Profile"
                                    onClick={() => setIsEditing(true)}
                                    className="transition ease-in-out delay-150 hover:bg-darksage hover:scale-110 rounded-lg font-figtree bg-sage text-white p-2 mt-5"
                                />
                            )}
                        </div>
                    </XyzTransition>
                    <div className="flex flex-col space-y-8 w-5/12">
                        <XyzTransition appear xyz="fade down duration-11">
                            <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full">
                                {" "}
                                {/*Tutoring*/}
                                <h3 className="font-poppins font-bold text-[30px] my-4">Tutoring</h3>
                                <div className="font-figtree">
                                    <p className="font-bold my-2">Subjects</p>
                                    <p className="text-sage mt-2 mb-4">
                                        {userInfo.expertisetopics.length > 0
                                            ? userInfo.expertisetopics.join(", ")
                                            : "None Exist"}
                                    </p>
                                </div>
                                {isEditing ? (
                                    <>
                                        <p className="font-semibold my-2 font-figtree">Add Expertise, Comma Seperated!</p>
                                        <input
                                            type="text"
                                            value={newExpertise}
                                            onChange={(e) => setNewExpertise(e.target.value)}
                                            className="rounded-lg font-figtree bg-white mb-4 text-black p-2 w-full"
                                        />
                                        <input
                                            type="button"
                                            value="Save"
                                            onClick={handleSave}
                                            className="transition ease-in-out delay-150 hover:bg-darksage hover:scale-110 rounded-lg font-figtree bg-sage text-white p-2 mt-2"
                                        />
                                    </>
                                ) : (
                                    <input
                                        type="button"
                                        value="Edit Expertise"
                                        onClick={() => setIsEditing(true)}
                                        className="transition ease-in-out delay-150 hover:bg-darksage hover:scale-110 rounded-lg font-figtree bg-sage text-white p-2"
                                    />
                                )}
                            </div>
                        </XyzTransition>
                        <XyzTransition appear xyz="fade down duration-12">
                            <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full">
                                {" "}
                                {/*profile*/}
                                <h3 className="font-poppins font-bold text-[30px] my-4">Stats</h3>
                                <div className = "flex justify-between items-center font-figtree mt-6 mb-2">
                                <p>
                                    Requests Made
                                </p>
                                <p className ="text-sage">
                                {" "}
                                    {
                                        requests.filter((request) => request.student_id === userId)
                                            .length
                                    }
                                </p>
                                </div>
                                <div className = "flex justify-between items-center font-figtree my-2">
                                <p>
                                    Requests Claimed
                                </p>
                                <p className ="text-sage">
                                {" "}
                                    {
                                        requests.filter((request) => request.tutor_id === userId)
                                            .length
                                    } 
                                </p>
                                </div>
                                <div className = "flex justify-between items-center font-figtree my-2">
                                <p>
                                    Requests Completed as a Student
                                </p>
                                <p className ="text-sage">
                                {" "}
                                    {
                                        requests.filter((request) => request.student_id === userId && request.complete)
                                            .length
                                    } 
                                </p>
                                </div>
                                <div className = "flex justify-between items-center font-figtree my-2">
                                <p>
                                    Requests Completed as a Tutor
                                </p>
                                <p className ="text-sage">
                                {" "}
                                    {
                                        requests.filter((request) => request.tutor_id === userId && request.complete)
                                            .length
                                    } 
                                </p>
                                </div>
                            </div>
                        </XyzTransition>
                    </div>
                </div>
            </div>
        </>
    );
};


const TabRequests = ({ userId, requests }) => {
    return (
        <>
            <div className="ml-[25%] mt-[125px]">
                <XyzTransition appear xyz="fade down duration-5">
                <div>
                <h2 className="text-center font-poppins font-bold text-[48px] mb-[20px]">Requests</h2>
                </div>
                </XyzTransition>
                <XyzTransition appear xyz="fade down duration-12">
                <div>
                {requests
                    .filter((request) => request.student_id === userId).sort((a, b) => b.date_created - a.date_created)
                    .map((request) => (
                        <RequestCard
                            key={request.id}
                            id={request.id}
                            topic={request.topic}
                            description={request.description}
                            studentUsername={request.student_username}
                            tutorId={request.tutor_id}
                            complete={request.complete}
                            dateCreated={request.date_created}
                        />
                    ))}
                </div>
                </XyzTransition>
                <XyzTransition appear xyz="fade down duration-5">
                <div>
                <h2 className="text-center font-poppins font-bold text-[48px] mb-[20px]">Tutoring</h2>
                </div>
                </XyzTransition>
                <XyzTransition appear xyz="fade down duration-12">
                    <div>
                {requests
                    .filter((request) => request.tutor_id === userId).sort((a, b) => b.date_created - a.date_created)
                    .map((request) => (
                        <RequestCard
                            key={request.id}
                            id={request.id}
                            topic={request.topic}
                            description={request.description}
                            studentUsername={request.student_username}
                            tutorId={request.tutor_id}
                            complete={request.complete}
                            dateCreated={request.date_created}
                        />
                    ))}
                    </div>
                    </XyzTransition>
            </div>
        </>
    );
};
const TabStore = () => {
    return <></>;
};
const Profile = () => {
    const [userId, setUserId] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [totalRequests, setTotalRequests] = useState(0);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const db = getFirestore();
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserInfo(userDoc.data());
                    setUserId(user.uid);
                    const requestsRef = collection(db, "requests");
                    const requestsSnapshot = await getDocs(requestsRef);
                    const requestsData = requestsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setTotalRequests(requestsData);
                    setLoading(false);
                }
            } else {
                toast.error("Not Logged In!");
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const [page, setPage] = useState(0);

    const choosePage = () => {
        switch (page) {
            case 0:
                return (
                    <TabProfile
                        userId={userId}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        requests={totalRequests}
                        setLoading={setLoading}
                    />
                );
            case 1:
                return <TabRequests userId={userId} requests={totalRequests} />;
            case 2:
                return <TabStore />;
        }
    };
    if (loading) {
        return <Spinner loading={loading} />;
    }

    return (
        <>
            <div className="fixed top-0 right-0 w-9/12 shadow font-figtree ml-3/12 mt-[80px] bg-white">
                <Marquee>
                    There are currently <p className="text-white">c</p>
                    <p className="font-bold text-sage">
                    {totalRequests.filter((request) => request.tutor_id === null).length}
                    </p> 
                    <p className="text-white">c</p>
                    open tutoring requests!
                </Marquee>
            </div>
            <Sidebar name={userInfo.fullName} setPage={setPage} />
            {choosePage()}
        </>
    );
};

export default Profile;
