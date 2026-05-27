"use client";

import { useState } from "react";

const FORMSPREE_ID = "xrgvkpwl";

interface EmailSignupProps {
  dark?: boolean;
}

export default function EmailSignup({
  dark = false,
}: EmailSignupProps) {
  const formspreeId = FORMSPREE_ID;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "Tennessee Starts Here Signup",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`p-4 rounded-sm ${
          dark ? "bg-white/10 text-white" : "bg-green-50 text-green-800"
        }`}
      >
        Thank you for subscribing. We will keep you updated on America 250 programming.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="email-signup" className="sr-only">Email address</label>
      <input
        id="email-signup"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        autoComplete="email"
        className={`flex-1 px-4 py-3 rounded-sm border ${
          dark
            ? "bg-white/10 border-white/30 text-white placeholder:text-white/60"
            : "bg-white border-gray-300 text-foreground"
        } focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`px-6 py-3 rounded-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
          dark
            ? "bg-accent text-primary hover:bg-accent/90"
            : "bg-primary text-white hover:bg-primary/90"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p role="alert" className={`text-sm ${dark ? "text-red-300" : "text-red-600"}`}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
