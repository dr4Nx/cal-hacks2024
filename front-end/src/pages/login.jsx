const Login = () => {
    return (
        <>
        <div className="bg-white rounded shadow p-10 m-10 text-center">
            <h1 className ="font-bold">Login page</h1>
            <form>
                <input className = "shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder = "Username"></input>
                <br/>
                <input className = "shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder = "Password" type ="password"></input>
                <input type="submit" className = "bg-sage hover:bg-lightsage rounded my-3 p-2 text-white" value="submit"></input>
            </form>
        </div>
        </>
    );
};

export default Login;