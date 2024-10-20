import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
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
        className="text-center bg-opacity-20 hover:bg-lightsage text-white font-figtree w-full py-3"
        value={text}
        onClick={() => {
          setPage(page);
        }}
      ></input>
    </>
  );
};
const Sidebar = ({ name, setPage }) => {
  return (
    <>
      <div className="fixed top-0 bg-darksage h-full w-1/4 pt-32 text-center">
        <h2 className="text-white font-bold text-[48px] font-poppins">
          {name}
        </h2>
        <Tabs text="Profile" setPage={setPage} page={0} />
        <Tabs text="Requests Manager" setPage={setPage} page={1} />
        {/* <Tabs text="Store" setPage={setPage} page={2} /> */}
      </div>
    </>
  );
};
const TabProfile = ({ userId, userInfo, setUserInfo, requests }) => {
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
        <h1 className="text-center font-poppins font-bold text-[48px] mb-[20px]">
          Hi {userInfo.username}!
        </h1>
        <div className="flex justify-center items-start space-x-8">
          <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-5/12">
            {" "}
            <h3 className="font-poppins font-bold text-[24px]">
              {userInfo.fullName}
            </h3>
            <div className="font-figtree">
              <p>Note: Password is not changeable</p>
              <p>Real Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.fullName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, fullName: e.target.value })
                  }
                  className="rounded-lg font-figtree bg-white text-black p-2 w-full"
                />
              ) : (
                <p className="text-sage">{userInfo.fullName}</p>
              )}
              <p>Email</p>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="rounded-lg font-figtree bg-white text-black p-2 w-full"
                />
              ) : (
                <p className="text-sage">{userInfo.email}</p>
              )}
              <p>Username</p>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                  className="rounded-lg font-figtree bg-white text-black p-2 w-full"
                />
              ) : (
                <p className="text-sage">{userInfo.username}</p>
              )}
            </div>
            {isEditing ? (
              <input
                type="button"
                value="Save"
                onClick={handleSave}
                className="rounded-lg font-figtree bg-sage text-white p-2 mt-2"
              />
            ) : (
              <input
                type="button"
                value="Edit Profile"
                onClick={() => setIsEditing(true)}
                className="rounded-lg font-figtree bg-sage text-white p-2"
              />
            )}
          </div>
          <div className="flex flex-col space-y-8 w-5/12">
            <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full">
              {" "}
              {/*Tutoring*/}
              <h3 className="font-poppins font-bold text-[24px]">Tutoring</h3>
              <div className="font-figtree">
                <p className="font-bold">Subjects</p>
                <p className="text-sage">
                  {userInfo.expertisetopics.length > 0
                    ? userInfo.expertisetopics.join(", ")
                    : "None Exist"}
                </p>
              </div>
              {isEditing ? (
                <>
                  <p className="font-bold">Add Expertise, Comma Seperated!</p>
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    className="rounded-lg font-figtree bg-white text-black p-2 w-full"
                  />
                  <input
                    type="button"
                    value="Save"
                    onClick={handleSave}
                    className="rounded-lg font-figtree bg-sage text-white p-2 mt-2"
                  />
                </>
              ) : (
                <input
                  type="button"
                  value="Edit Expertise"
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg font-figtree bg-sage text-white p-2"
                />
              )}
            </div>
            <div className="bg-lightsage rounded-lg drop-shadow-lg text-center p-5 w-full">
              {" "}
              {/*profile*/}
              <h3 className="font-poppins font-bold text-[24px]">Stats</h3>
              <p>
                Number requested:{" "}
                {
                  requests.filter((request) => request.student_id === userId)
                    .length
                }
              </p>
              <p>
                Number claimed:{" "}
                {
                  requests.filter((request) => request.tutor_id === userId)
                    .length
                }
              </p>
            </div>
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
        <h2>Requests</h2>
        {requests
          .filter((request) => request.student_id === userId)
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
        <h2>Tutoring</h2>
        {requests
          .filter((request) => request.tutor_id === userId)
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
      <div className="fixed top-0 right-0 w-9/12 shadow font-figtree ml-3/12 mt-[80px]">
        <Marquee>
          There are currently -
          {totalRequests.filter((request) => request.tutor_id === null).length}-
          open tutoring requests and -
          {totalRequests.filter((request) => request.tutor_id !== null).length}-
          fulfilled requests!
        </Marquee>
      </div>
      <Sidebar name={userInfo.fullName} setPage={setPage} />
      {choosePage()}
    </>
  );
};

export default Profile;
