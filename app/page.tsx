'use client'
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    const { error } = await supabase.from("waitlist").insert({
      email,
      name,
      source: "landing_v1",
      consent: true,
    });
    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Thanks — you're on the list!");
      setEmail(""); setName("");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-6">
      <img src="/logo.png" alt="Snatcho Logo" className="w-32 mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Snatch the Best Deals ⚡</h1>
      <p className="max-w-2xl text-lg md:text-xl mb-8">
        Compare prices from Amazon, Flipkart, Blinkit, Zepto & more. Get exclusive discounts and student offers – all in one app.
      </p>

      <form onSubmit={subscribe} className="w-full max-w-md bg-white/10 p-6 rounded-xl">
        <input className="w-full mb-3 p-3 rounded text-black" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full mb-3 p-3 rounded text-black" placeholder="Email" required value={email} type="email" onChange={e=>setEmail(e.target.value)} />
        <div className="flex items-center mb-4 text-sm">
          <input id="consent" type="checkbox" defaultChecked className="mr-2" />
          <label htmlFor="consent">I agree to receive emails from Snatcho.</label>
        </div>
        <button className="w-full rounded-full px-6 py-3 bg-yellow-400 text-black font-bold" type="submit">Join the Waitlist</button>
        <p className="mt-3 text-sm">{status}</p>
      </form>
    </main>
  );
}
