const Profile = () => {
    return (
        <div>
        <>
        <div className="bg-lightsage rounded shadow p-10 m-10 text-center">
            <h1 className ="font-bold">What is subject hurting you</h1>
            <form>
                <input className = "shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder = "Subject"></input>
                <textarea className = "shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder = "Specific topic (the more specific you are, the better we can match you!"></textarea>

                <input type="submit" className = "bg-sage hover:bg-lightsage rounded my-3 p-2 text-white" value="submit"></input>
            </form>
        </div>
        </>

           
        </div>
    );
};

export default Profile;