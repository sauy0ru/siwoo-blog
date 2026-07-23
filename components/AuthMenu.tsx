"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";


export default function AuthMenu() {

  const [user, setUser] = useState<any>(null);

  const pathname = usePathname();
  const router = useRouter();



  useEffect(() => {


    async function checkUser() {

      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();


      setUser(user);

    }


    checkUser();



    // 로그인 상태 변화 감지
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUser(session?.user ?? null);

      }
    );



    return () => {

      subscription.unsubscribe();

    };


  }, []);





  async function logout() {


    const { error } = await supabase.auth.signOut();



    if(error){

      console.error(error);
      alert("로그아웃 실패");

      return;

    }



    setUser(null);

    router.push("/");

    router.refresh();


  }






  const active =
    pathname === "/login"
      ? "bg-white shadow font-semibold text-black"
      : "text-gray-600 hover:bg-white/60";






  if(user){


    return (

      <div className="space-y-2">


        <p className="px-4 py-3 text-sm text-gray-500">
          {user.email}
        </p>



        <button
          onClick={logout}
          className="
            block
            w-full
            text-left
            px-4
            py-3
            rounded-xl
            text-gray-600
            hover:bg-white/60
          "
        >
          LOGOUT
        </button>



      </div>

    );


  }






  return (

    <Link
      href="/login"
      className={`block px-4 py-3 rounded-xl transition ${active}`}
    >
      LOGIN
    </Link>

  );

}