"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogin() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {
      alert("로그인 실패");
      console.error(error);
      return;
    }


    alert("로그인 성공");

    router.push("/write");

  }


  return (
    <div className="max-w-md mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        관리자 로그인
      </h1>


      <input
        className="border p-3 w-full rounded mb-4"
        placeholder="이메일"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />


      <input
        className="border p-3 w-full rounded mb-4"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      <button
        onClick={handleLogin}
        className="bg-black text-white px-8 py-3 rounded-xl"
      >
        로그인
      </button>


    </div>
  );
}