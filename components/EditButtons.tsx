"use client";

import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function EditButtons({
  id
}:{
  id:number
}){

  const [user,setUser] = useState<any>(null);


  useEffect(()=>{

    async function check(){

      const {
        data:{
          user
        }
      } = await supabase.auth.getUser();


      setUser(user);

    }


    check();


  },[]);



  if(!user){
    return null;
  }



  return (

    <div className="mt-6 flex gap-3">

      <Link
        href={`/edit/${id}`}
        className="rounded-xl bg-black px-5 py-3 text-white hover:bg-gray-800"
      >
        수정
      </Link>


      <DeleteButton id={id}/>


    </div>

  );

}