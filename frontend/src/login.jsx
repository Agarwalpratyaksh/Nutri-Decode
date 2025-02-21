function Login(){
    return(
        <div className="flex flex-col max-w-full justify-center items-center h-screen w-screen bg-green-100">
            <div className="flex flex-col text-center w-2/3 h-2/3 shadow-2xl bg-white rounded-lg p-8 gap-4">
                <p className="text-4xl mt-4">Welcome Back!</p>
                <p className="text-2xl font-light mb-5">Enter your credentials to log in</p>
                <form className="flex flex-col items-center gap-5 text-lg">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-left">Email ID</label>
                        <input id="email" type="email" className="border-purple-400 border w-144 h-15 rounded-2xl"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="pass" className="text-left">Password</label>
                        <input id="pass" type="password" className="border-purple-400 border w-144 h-15 rounded-2xl"/>
                    </div>

                    <button className="bg-purple-600 h-12 w-32 mt-8 text-white text-xl rounded-xl">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;