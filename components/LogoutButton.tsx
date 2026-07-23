"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();


  async function logout() {

    await supabase.auth.signOut();

    alert("로그아웃 됐습니다.");

    router.push("/");

    router.refresh();

  }


  return (
    <button
      onClick={logout}
      className="block w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-white/60"
    >
      LOGOUT
    </button>
  );
}