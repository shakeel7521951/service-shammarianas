import React, { useState } from "react";
import background from "../../../src/assets/background.jpg";
import svg from "../../../src/assets/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginCss.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center text-white"
      style={{
        backgroundImage: `url(${background})`, // Fixed incorrect usage
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-6 rounded-3xl shadowBG shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] bg-[#212121]/40 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 items-center gap-6">
          {/* Login Form */}
          <div>
            <form className="space-y-4">
              <div className="mb-8">
                <h3 className="text-white text-3xl font-bold">Sign in</h3>
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
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
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-400"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">
                  Password
                </label>
                <input
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-400"
                  placeholder="Enter password"
                />
              </div>
              {/* <div className="flex justify-between text-sm text-white">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div> */}
              <button
                type="button"
                onClick={() =>
                  console.log("Login Clicked", user.username, user.password)
                }
                className="w-full py-2.5 px-4 text-sm rounded-lg bg-black text-white focus:outline-none shadow-lg hover:bg-gray-900"
              >
                Sign in
              </button>
              <p className="text-sm text-center text-gray-300">
                Don't have an account?
                <a
                  onClick={() => navigate("/sign-up")}
                  className="text-blue-400 font-semibold hover:underline ml-1 cursor-pointer"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>

          {/* Image - Hidden on extra-small screens */}
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
}

export default Login;
