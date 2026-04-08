import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import UseAuth from "../../hook/UseAuth";
import { Link } from "react-router";

export default function SignUp() {
    const { signUp, signInWithGoogle } = UseAuth();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const onSubmit = (data) => {
        // Clear previous errors
        setFieldErrors({});
        const { email, password } = data;
        signUp(email, password)
            .then((userCredential) => {
                Swal.fire({
                    title: "Success!",
                    text: "Registration Completed 🎉",
                    icon: "success",
                    confirmButtonColor: "#000",
                });
                reset();
            })
            .catch((error) => {
                // Firebase error mapping
                let message = error.message || "Something went wrong";
                setFieldErrors({ firebase: message });
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "Success!",
                    text: `Welcome ${user.displayName || user.email} 🎉`,
                    icon: "success",
                    confirmButtonColor: "#000",
                });
            })
            .catch((error) => {
                setFieldErrors(error.message)
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#000",
                });
            })
    }
    // Helper function to show errors from react-hook-form , custom state
    const getError = (fieldName) => {
        return errors[fieldName]?.message || fieldErrors[fieldName] || "";
    };

    return (
        <div className="md:min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white py-5 px-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                {fieldErrors.firebase && (
                    <p className="text-red-500 font-medium text-sm mb-4 text-center">
                        {fieldErrors.firebase}
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="font-semibold text-sm">First Name</label>
                        <input
                            type="text"
                            placeholder="Your First Name"
                            {...register("firstName", {
                                required: "First name is required",
                            })}
                            className="w-full border font-medium p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {getError("firstName") && (
                            <p className="text-red-500 font-medium text-sm mt-1">
                                {getError("firstName")}
                            </p>
                        )}
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="font-semibold text-sm">Last Name</label>
                        <input
                            type="text"
                            placeholder="Your Last Name"
                            {...register("lastName", {
                                required: "Last name is required",
                            })}
                            className="w-full border font-medium p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        {getError("lastName") && (
                            <p className="text-red-500 font-medium text-sm mt-1">
                                {getError("lastName")}
                            </p>
                        )}
                    </div>
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
                            <p className="text-red-500 font-medium text-sm mt-1">
                                {getError("email")}
                            </p>
                        )}
                    </div>
                    {/* Password */}
                    <div>
                        <label className="font-semibold text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                        message: "Must include 1 Capital Letter & 1 Number",
                                    },
                                })}
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
                            <p className="text-red-500 font-medium text-sm mt-1">
                                {getError("password")}
                            </p>
                        )}
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
                {/* Divider */}
                <div className="flex items-center my-5">
                    <hr className="flex-1" />
                    <span className="px-2 text-gray-400 text-sm">OR</span>
                    <hr className="flex-1" />
                </div>
                {/* Google */}
                <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition font-medium">
                    <FcGoogle size={22} />
                    Continue with Google
                </button>
                <Link to="/auth/sign_in" className=" font-bold">
                   Already You have an account? <span className="hover:underline font-bold">Sign In</span>
                </Link>
            </div>
        </div>
    );
}