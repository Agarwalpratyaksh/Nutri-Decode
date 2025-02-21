import { Link } from "react-router-dom";
import google from "./assets/google.svg"
import apple from "./assets/apple.svg"

function Signup(){
    return(
        <div className="flex flex-col max-w-full justify-center items-center h-screen w-screen bg-green-100">
            <div className="flex flex-col text-center w-2/3 h-2/3 shadow-2xl bg-white rounded-lg p-8 gap-4">
                <p className="text-4xl">Get Started Now</p>
                <form className="flex flex-col items-center gap-5 text-lg">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-left">Email ID</label>
                        <input id="email" type="email" className="border-purple-400 border w-144 h-15 rounded-2xl"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="pass" className="text-left">Password</label>
                        <input id="pass" type="password" className="border-purple-400 border w-144 h-15 rounded-2xl"/>
                    </div>

                    <div className="flex gap-3 -ml-76 -mb-5">
                        <input id="terms" type="checkbox"></input>
                        <p>I agree to the terms & policy</p>
                    </div>

                    <button className="bg-purple-600 h-12 w-32 mt-8 text-white text-xl rounded-xl mb-3">Sign up</button>
                </form>

                <div className="flex items-center justify-center w-112 gap-6 mx-auto">
                    <hr className="flex-grow h-0.5 border-none bg-black"></hr>
                    <p className="text-xl">OR</p>
                    <hr className="flex-grow h-0.5 border-none bg-black"></hr>
                </div>

                <div className="flex items-center justify-center gap-60 font-light text-sm">
                    <div className="flex gap-2 border-2 p-1.5 border-purple-300 rounded-xl">
                        <img src={google} alt="google" className="size-7 cursor-pointer"></img>
                        <button>Sign in with google</button>
                    </div>
                    
                    <div className="flex gap-2 border-2 p-1.5 border-purple-300 rounded-xl">
                        <img src={apple} alt="apple" className="size-7 cursor-pointer"></img>
                        <button>Sign in with Apple</button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xl">
                    <p className="font-light">Have an account?</p>
                    <Link to="/login" className="text-purple-600">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;