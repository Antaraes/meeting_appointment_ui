

export default function Login() {
    return <div className="z-1000 flex justify-center items-center bg-white w-screen h-screen">
        <form className="flex flex-col justify-start items-center gap-10 md:w-[40vw] h-auto p-3 border-4 border-green-300 bg-blue-950 rounded-xl">
            <div className="text-white text-4xl font-mono font-bold mb-4">LOGIN</div>
            <div className="w-full px-10">
                <input className="w-full h-[40px] rounded-lg text-gray-500 text-xl font-mono p-3" placeholder="Username" type="text" />
            </div>
            <div className="w-full px-10">
                <input className="w-full h-[40px] rounded-lg text-gray-500 text-xl font-mono p-3" placeholder="Password" type="password" />
            </div>
            <div className="w-full flex justify-between px-10 mt-5 mb-3">
                <button type="button" className="w-[90px] h-[40px] bg-white hover:border-2 hover:border-green-300 font-mono rounded-lg">Back</button>
                <button type="submit" className="w-[90px] h-[40px] bg-white hover:border-2 hover:border-green-300 font-mono rounded-lg">Login</button>
            </div>
        </form>
    </div>
}