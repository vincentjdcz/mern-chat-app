import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await login(username, password);
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">

        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-neutral-content'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 bg-neutral'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text text-neutral-content">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="w-full input input-bordered h-10 bg-neutral"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                    {"Don't"} have an account?
                </Link>
                <div>
                    <button className="btn btn-block btn-sm mt-2 bg-neutral text-neutral-content hover:text-neutral"
                    disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Login"}

                    </button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login

/*
Note: generated styling for w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0
at https://tailwindcss-glassmorphism.vercel.app/
*/

/*
STARTER CODE FOR THIS FILE:

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">

        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-neutral-content'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 bg-neutral' />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text text-neutral-content">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="w-full input input-bordered h-10 bg-neutral"
                    ></input>
                </div>
                <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                    {"Don't"} have an account?
                </a>
                <div>
                    <button className="btn btn-block btn-sm mt-2 bg-neutral text-neutral-content hover:text-neutral">Login</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login

*/