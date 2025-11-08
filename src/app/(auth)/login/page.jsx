"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export default function LoginPage() {
  const r = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!res || res.error) throw new Error(res?.error || "Invalid credentials");
      r.push("/dashboard");
    } catch (e) {
      setSubmitError(e.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-black">Welcome back</h1>
          <p className="text-sm text-zinc-600">Log in to continue</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-zinc-200 bg-black p-6 shadow"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-400">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 pr-10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 flex items-center text-zinc-400 hover:text-yellow-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.39 18 12 18c.837 0 1.618-.07 2.351-.203l-1.86-1.86A6 6 0 016 12c0-.837.17-1.634.48-2.357l-2.5-1.42z"/>
                      <path d="M8.53 5.47l9.999 9.999 1.06-1.06L9.59 4.41 8.53 5.47z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 6c-5.61 0-8.774 2.662-10.066 6 .733 1.707 1.91 3.18 3.428 4.297l1.5-1.5A6 6 0 0112 6zm0 12c5.61 0 8.774-2.662 10.066-6a10.477 10.477 0 00-1.15-2.19l-1.47 1.47A6 6 0 0112 18z"/>
                      <path d="M9 12a3 3 0 104.243 2.829l-4.072-4.072A2.99 2.99 0 009 12zm6 0a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3z"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            <button
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-md bg-yellow-400 px-4 py-2 font-medium text-black shadow-sm hover:bg-yellow-300 disabled:opacity-60"
            >
              {isSubmitting && (
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        <p className="mt-3 text-center text-sm text-zinc-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-black hover:text-yellow-500 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
