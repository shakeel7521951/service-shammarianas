import React, { useState } from "react";
import background from "../../../src/assets/background.jpg";
import svg from "../../../src/assets/loginImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./LoginCss.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6 mx-auto md:mx-4 sm:mx-1 shadowBG rounded-3xl shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] bg-[#212121]/40 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 items-center gap-6">
          {/* Signup Form */}
          <div>
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-white text-3xl font-bold">
                  Create an account
                </h3>
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  Join us today! Sign up and start your journey.
                </p>
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">
                  User name
                </label>
                <input
                  value={user.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-500"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Email</label>
                <input
                  value={user.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div className="relative">
                <label className="text-white text-sm mb-2 block">Password</label>
                <input
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-500 pr-10"
                  placeholder="Enter password"
                />
                <span
                  className="absolute right-4 top-10 text-gray-300 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  console.log(user.username, user.password, user.email)
                }
                className="w-full py-2.5 px-4 text-sm rounded-lg bg-blue-500 text-white focus:outline-none shadow-lg hover:bg-blue-600"
              >
                Sign up
              </button>
              <p className="text-sm text-center text-gray-300">
                Already have an account? 
                <Link
                  onClick={() => navigate("/login")}
                  className="text-blue-400 ms-2 font-semibold hover:underline ml-1 cursor-pointer"
                >
                   Sign in here
                </Link>
              </p>
            </form>
          </div>
          {/* Image */}
          <div className="hidden md:block">
            <img
              src={svg}
              style={{
                mixBlendMode: "screen",
                filter: "grayscale(100) invert(1) brightness(1) contrast(10)",
              }}
              className="w-full object-cover rounded-lg"
              alt="Signup Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
