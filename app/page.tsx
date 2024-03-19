"use client";
import { Link } from "@/components/typography/link";
import { api } from "@/convex/_generated/api";
import {
  useQueryWithAuth,
  useSessionId,
} from "@convex-dev/convex-lucia-auth/react";
import AuthForm from "./actions/auth";


export default function Home() {
  const sessionId = useSessionId();

  return (
    <main className="container max-w-2xl flex flex-col gap-1 min-h-screen">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Venity Mall
      </h1>
      {sessionId ? <SignedIn /> : <AuthForm />}
    </main>
  );
}

function SignedIn() {
  const viewer = useQueryWithAuth(api.myFunctions.getUser, {});

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome, {viewer?.email}!</h2>
      <p className="text-lg mb-8">Thank you for signing in.</p>
      <Link href="/pages/shop" className="text-blue-500 underline">
      Go to the Shop
      </Link>
      
    </div>
    );
}


