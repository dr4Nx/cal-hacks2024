import React from "react";

const LoginForm = ({ submitLogin, email, password, setEmail, setPassword }) => {
  return (
    <>
      <h1 className="font-bold">Login Page</h1>
      <p>Welcome back! Please login to continue. Your email is your username</p>
      <form onSubmit={submitLogin}>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          className="bg-sage hover:bg-lightsage rounded my-3 p-2 text-white"
          value="submit"
        />
      </form>
    </>
  );
};

export default LoginForm;
