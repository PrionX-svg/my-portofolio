"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const postData = async (data = {}) => {
    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export default function Login() {
    const router = useRouter();
    const [data, setData] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await postData(data);

            // Handle the response (e.g., store the JWT token or show an error)
            if (result.token) {
                // Successfully logged in, do something with the token
                console.log("Login successful", result.token);
                Cookies.set("token", result.token, { expires: new Date(Date.now() + 10 * 60 * 1000) });
                router.push("/");
                // Redirect, store token in localStorage, etc.
            } else {
                setErrorMessage(result.error || "Login failed");
            }
        } catch (err) {
            setErrorMessage("An error occurred while logging in" + err);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        width={100}
                        height={100}
                        alt="Your Company"
                        src="/images/logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Log In Into Your Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Show error message if login fails */}
                    {errorMessage && (
                        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={data.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="username"
                                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Do not have an account?{" "}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
