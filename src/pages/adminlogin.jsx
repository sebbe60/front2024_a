import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { BACKEND_URL } from "../utils";
import { setAuthUser } from "../store/slices/authSlice";
import { setAuthState } from "../store/slices/authSlice";
const AdminLogin = () => {
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
      const response = await axios.post(`${BACKEND_URL}/adminlogin`, {
        email,
        password,
      });
      const userId = await response.data.userId;
      const token = await response.data.token;
      const freelancer = await response.data.freelancer;
      const employer = await response.data.employer;
      const mincom = await response.data.mincom;
      Cookies.set("userId", userId);
      dispatch(setAuthState(true));
      dispatch(setAuthUser(userId));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("freelancer", freelancer);
      localStorage.setItem("employer", employer);
      localStorage.setItem("mincom", mincom);

      router.push("/dash/dashindex");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-5 flex rounded-2xl shadow-lg max-w-7xl">
        <div className="w-full px-5">
          <h4 className="text-xl font-bold mb-4">Login</h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email address"
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className={`py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <Link href="/register">
              <span className="text-blue-300">Not registered?</span> Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
