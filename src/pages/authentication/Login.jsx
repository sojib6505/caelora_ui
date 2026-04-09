import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import UseAuth from "../../hook/UseAuth";
import { useNavigate, Link } from "react-router";

export default function Login() {
  const { signIn, signInWithGoogle, resetPassword } = UseAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const getError = (fieldName) => {
    return errors[fieldName]?.message || fieldErrors[fieldName] || "";
  };

  const onSubmit = (data) => {
    setFieldErrors({});
    const { email, password } = data;

    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          title: "Success!",
          text: `Welcome back ${user.email} 🎉`,
          icon: "success",
          confirmButtonColor: "#000",
        });
        navigate("/");
      })
      .catch((error) => {
        setFieldErrors({ firebase: error.message });
      });
  };

  const handleGoogleSignIn = () => {
    setFieldErrors({});
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "Success!",
          text: `Welcome ${user.displayName || user.email} 🎉`,
          icon: "success",
          confirmButtonColor: "#000",
        });
        navigate("/");
      })
      .catch((error) => {
        setFieldErrors({ firebase: error.message });
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#000",
        });
      });
  };
  const handleForgotPassword = () => {
    const email = prompt("Please enter your email for password reset:");
    if (!email) return;
    resetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Password reset email sent ✅",
          icon: "success",
          confirmButtonColor: "#000",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#000",
        });
      });
  };
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white py-5 px-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {fieldErrors.firebase && (
          <p className="text-red-500 font-medium text-sm mb-4 text-center">
            {fieldErrors.firebase}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-semibold text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", { required: "Email is required" })}
              className="w-full border font-medium p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {getError("email") && (
              <p className="text-red-500 font-medium text-sm mt-1">{getError("email")}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="font-semibold text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full border font-medium p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {getError("password") && (
              <p className="text-red-500 font-medium text-sm mt-1">{getError("password")}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Login
          </button>
          {/* Forgot Password */}
          <button onClick={handleForgotPassword} className="hover:underline font-bold">
            Forgot Password?
          </button>
        </form>
        {/* SignUp */}
        <div className="flex justify-between mt-3 text-sm text-gray-600">

          <Link to="/auth/sign_up" className=" font-bold">
            You have no account? <span className="hover:underline md:font-bold">Sign Up</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}