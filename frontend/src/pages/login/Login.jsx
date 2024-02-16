import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await login(username, password);
    
  }

  useEffect(() => {
    // Get the modal
    const modal = document.getElementById("readme");
    // Show the modal
    document.getElementById('readme').showModal()
    document.getElementById("welcome").scrollIntoView();

    // Clean up event listener on unmount
    return 
  }, []);
  
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
                    <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 '
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
                      className="w-full input input-bordered h-10 "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-neutral-content">
                    {"Don't"} have an account?
                </Link>
                <div>
                    <button className="btn btn-block btn-sm mt-2 hover:text-neutral"
                    disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Login"}

                    </button>
                </div>
            </form>
        </div>

        <dialog id="readme" className="modal">
            <div className="modal-box text-neutral-content rounded-md bg-gray-500">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg" id="welcome">Welcome!</h3>
                <p className="py-4">Welcome to this MERN Stack Real-Time Chat Application!</p>
                <p className="py-4">It is currently supported on desktop and laptop browsers, with mobile responsiveness being on the product roadmap.</p>
                <br />
                <hr />
                <p className="py-4">Feel free to create your own account and log in, or use the demo accounts below: </p>
                <p className="py-4">username: johndoe</p>
                <p className="py-4">password: johndoe12345</p>
                <br />
                <p className="py-4">username: janedoe</p>
                <p className="py-4">password: janedoe12345</p>
                <hr />
                <br />
                <p className="py-4">After signing in you will see everyone else who has an account on the site, and you can start a conversation with anyone!</p>
                <p className="py-4">You can also use the search functionality to search for a particular username and make that conversation that active chat.</p>
                <p className="py-4">You can open up an incognito tab (in Chrome for example) so that you can have a fresh tab with no cookies or data stored locally, then log in with a second account to test the live chatting functionality!</p>
                <br />
                <hr />
                <br/>
                <p className="py-4">For those interested, here are some of the libraries and frameworks used in this application: </p>
                <br />
                <h4 className="font-bold">Front End</h4>
                <ul>
                    <li>React</li>
                    <li>React Router</li>
                    <li>tailwindcss</li>
                    <li>daisyUI</li>
                    <li>Socket.IO</li>
                    <li>Zustand</li>
                </ul>
                <br />
                <h4 className="font-bold">Back End</h4>
                <ul>
                    <li>Node</li>
                    <li>Express</li>
                    <li>bcrypt</li>
                    <li>Socket.IO</li>
                    <li>cookie-parser</li>
                    <li>JWT (JSON Web Token)</li>
                </ul>
                <br />
                <h4 className="font-bold">Database</h4>
                <ul>
                    <li>MongoDB</li>      
                </ul>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn bg-gray-500 text-neutral-content">Close</button>
                </form>
                </div>
            </div>
            </dialog>
            
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