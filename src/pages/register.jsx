import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BACKEND_URL } from "../utils";
import Link from "next/link";
import Image from "next/image";
import { FaApple, FaGoogle } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    is_provider: false,
    is_user: false,
    username: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const checkBoxName = e.target.name;
    const value = e.target.checked;
    let is_user = formData.is_user;
    let is_provider = formData.is_provider;

    if (checkBoxName === "is_provider") {
      is_user = false;
      is_provider = true;
    } else if (checkBoxName === "is_user") {
      is_provider = false;
      is_user = true;
    }

    setFormData({
      ...formData,
      is_provider: is_provider,
      is_user: is_user,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/register`, formData);
      toast.success(res.data.message);
      if (res.data.message === "registered successfully") {
        router.push("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const handleUsernameInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toLowerCase(),
    }));

    if (name === "username" && value.length >= 4) {
      // Make the API request to check the availability of the username
      fetch(`${BACKEND_URL}/check_username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ goopim_username: value }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            // Username is taken
            setIsUsernameAvailable(false);
          } else {
            // Username is available
            setIsUsernameAvailable(true);
          }
        })
        .catch((error) => {
          console.error("Error checking username availability:", error);
        });
    }
  };

  return (
    <>
      {/* <div className="min-h-screen bg-gray-100 flex justify-center items-center mt-12">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/4 p-6 bg-white rounded-md shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                formData?.username?.length >= 4
                  ? isUsernameAvailable
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }`}
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleUsernameInputChange}
              onBlur={handleUsernameInputChange}
            />
            {formData?.username?.length >= 4 ? (
              isUsernameAvailable ? (
                <p className="text-green-500">Username is available</p>
              ) : (
                <p className="text-red-500">Username is taken</p>
              )
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="is_provider"
              className="block text-gray-700 font-bold mb-2"
            >
              Register as a freelancer?
            </label>
            <input
              type="checkbox"
              name="is_provider"
              checked={formData.is_provider}
              onChange={handleCheckboxChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm">I am a freelancer</span>

            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
              <input
                type="checkbox"
                name="is_user"
                checked={formData.is_user}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">I want to hire a freelancer</span>
            </label>
          </div>
          <div>
            {" "}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8"
            >
              Register
            </button>
          </div>
          <Link href="/login">
            <span className="text-blue-400">Already registed?</span>Login
          </Link>
        </form>
      </div> */}

    <div className="min-h-screen flex  mt-24 items-center">
        <div className=" flex w-full">
          <div className="md:w-1/2 px-5 mt-10">
            <h2 className="text-4xl font-bold ">Create Account</h2>
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

              <ToastContainer />
              <form className="mt-6" onSubmit={handleSubmit}>
                
                <div>
                  <label className="block text-gray-700">First Name</label>
                  
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mt-2  border-[1.6px] border-black focus:border-blue-500 focus:bg-white focus:outline-none"
                    required 
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mt-2  border-[1.6px] border-black focus:border-blue-500 focus:bg-white focus:outline-none"
                    
                    required 
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    placeholder="Enter Username"
                    className={`w-full px-4 py-3   mt-2 border-[1.6px] bg-white border-black focus:border-blue-500 focus:bg-white focus:outline-none ${
                      formData?.username?.length >= 4
                        ? isUsernameAvailable
                          ? "border-green-500"
                          : "border-red-500"
                        : ""
                    }`}
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleUsernameInputChange}
                    onBlur={handleUsernameInputChange}
                  />
                  {formData?.username?.length >= 4 ? (
                    isUsernameAvailable ? (
                      <p className="text-green-500">Username is available</p>
                    ) : (
                      <p className="text-red-500">Username is taken</p>
                    )
                  ) : (
                    ""
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Email Address"
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mt-2  border-[1.6px] border-black focus:border-blue-500 focus:bg-white focus:outline-none"
                    required 
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 mb-3">Register as a freelancer?</label>
                    <input
                      type="checkbox"
                      name="is_provider"
                      checked={formData.is_provider}
                      onChange={handleCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    <span className="text-sm">I am a freelancer</span>

                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                      <input
                        type="checkbox"
                        name="is_user"
                        checked={formData.is_user}
                        onChange={handleCheckboxChange}
                        className="mr-2 leading-tight"
                      />
                      <span className="text-sm">I want to hire a freelancer</span>
                    </label>
                </div>
                <button
                  type="submit"
                  className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                    Register
                </button>
              </form>
              <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>

              <div className="text-sm flex justify-between items-center mt-3">
                <p>If you have an account...</p>
                <Link href={`/login`} className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">Log In</Link>
              </div>
            </div>

            <div className="opacity-80">
              <Image src="/home/loginImage.jpg" width={600} height={400} alt="page img" />
            </div>

          </div>
      </div>

    </>
  );
};

export default Register;
