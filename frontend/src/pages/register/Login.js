import React, { useState } from "react";
import background from "../../../src/assets/background.jpg";
import svg from "../../../src/assets/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginCss.css";
import { useSignInMutation } from "../../features/usersApi";

function Login() {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      console.log("Submitting data:", user); // ✅ Log user input
      const response = await signIn(user).unwrap(); // ✅ Ensure correct API call
      console.log("Login successful", response);

      navigate("/");
    } catch (err) {
      console.error("Login failed", err?.data?.message || err.message);
    }
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
      <div className="p-6 rounded-3xl shadowBG shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] bg-[#212121]/40 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 items-center gap-6">
          {/* Login Form */}
          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {" "}
              {/* ✅ Attach handleSubmit */}
              <div className="mb-8">
                <h3 className="text-white text-3xl font-bold">Sign in</h3>
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Email</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email" // ✅ Use correct type for validation
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-400"
                  placeholder="Enter Email"
                  value={user.email} // ✅ Bind state
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-white bg-transparent border border-gray-600 p-3 rounded-lg outline-none focus:border-blue-400"
                  placeholder="Enter password"
                  value={user.password} // ✅ Bind state
                />
              </div>
              <button
                type="submit" // ✅ Use submit instead of button
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
