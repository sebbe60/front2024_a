import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { BACKEND_URL } from "../utils";
import { setAuthUser } from "../store/slices/authSlice";
import { setAuthState } from "../store/slices/authSlice";
import { FaApple } from "react-icons/fa";
import Image from "next/image";

const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });

      const userId = await response.data.userId;
      const token = await response.data.token;
      const freelancer = await response.data.freelancer;
      const employer = await response.data.employer;
      const mincom = await response.data.mincom;
      const token2 = await response.data.token2;
      Cookies.set("userId", userId);
      dispatch(setAuthState(true));
      dispatch(setAuthUser(userId));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("freelancer", freelancer);
      localStorage.setItem("employer", employer);
      localStorage.setItem("mincom", mincom);
      localStorage.setItem("token2", token2);

      router.push("/myprofile");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    
  <div className="min-h-screen flex  mt-24 items-center">
    <div className=" flex w-full">
      <div className="md:w-1/2 px-5 mt-10">
        <h2 className="text-4xl font-bold ">Login</h2>
        <p className="text-sm text-slate-300">If you have an account, please login</p>

        <div className="flex justify-between w-3/4 mt-4">

          <div className="flex rounded-3xl border items-center border-[#070707] py-3 px-5">
            <div className="bg-black p-1 rounded-full mr-2">
             <FaApple color="white"/>
            </div>
             <p className="text-sm">Continue with Apple</p>
          </div>

          <div className="flex justify-between rounded-3xl border items-center border-[#070707] py-3 px-5">
            <div className="bg-black p-1 rounded-full mr-2">
             <FaGoogle color="white"  />
             </div>
             <p className="text-sm">Continue with Google</p>
          </div>

        </div>
       
       {/* Horizontal Line */}
        <div class="mt-10 flex items-center text-center after:content-[''] after:flex-1 after:border after:border-b-slate-300 before:content-[''] before:border before:flex-1 before:border-b-slate-300 ">or</div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input 
                type="email"
                  id="email"
                  value={email}
                onChange={(event) => setEmail(event.target.value)} 
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 mt-2  border-[1.6px] border-black focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete 
                required
            />
          </div>
  
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter Password"
                minlength="6"
                className="w-full px-4 py-3  border-[1.8px] border-black mt-2  focus:border-blue-500 focus:bg-white focus:outline-none"
                required 
            />
          </div>
  
          <div className="text-right mt-2">
            <Link
             href="/resetpassword" 
             className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
                type="submit"
                className={`w-full block bg-black hover:bg-black focus:bg-black rounded-3xl text-white font-semibold px-4 py-3 mt-6 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Log In"}
          </button>
        </form>

        <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
          <hr className="border-gray-500" />
          <p className="text-center text-sm">OR</p>
          <hr className="border-gray-500" />
        </div>

        

        <div className="text-sm flex justify-between items-center mt-3">
          <p>If you don't have an account...</p>
          <Link href={`/register`} className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">Register</Link>
        </div>
      </div>

      <div className="opacity-80">
        <Image src="/home/loginImage.jpg" width={600} height={400} alt="page img" />
      </div>

    </div>
    </div>

  );
};

export default Login;
