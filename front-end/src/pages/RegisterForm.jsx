import React from 'react'

const RegisterForm = ({submitLogin, email, password, setEmail, setPassword}) => {
  return (
    <>
        <h1 className="font-bold text-2xl text-center my-10">Unlock your academic potential</h1>
        <div className="bg-lightsage rounded shadow p-10 m-10 text-center">
            <h3 className ="font-bold">Enter your information</h3>
            <form onSubmit={submitLogin}>
                <input 
                    className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Full name"
                />
                <input 
                    className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Username"
                />
                <br/>
                <input 
                    className="shadow border-none appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
        </div>
        </>
  )
}

export default RegisterForm;