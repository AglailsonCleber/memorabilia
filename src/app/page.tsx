'use client';
import SignIn from "@/app/sign-in/SignIn";
import Dashboard from "./dashboard/Dashboard";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Dashboard />
    </div>
  )
}
