"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("야구");
  const [description, setDescription] = useState("");


  useEffect(() => {

    async function loadPost() {

      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();


      if (data) {
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
      }

    }

    loadPost();

  }, [id]);



  async function handleUpdate() {

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        category,
        description,
      })
      .eq("id", id);


    if (error) {
      alert("수정 실패");
      console.error(error);
      return;
    }


    alert("수정 완료");

    router.push(`/post/${id}`);

  }



  return (
    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        글 수정
      </h1>


      <input
        className="border p-3 w-full rounded mb-4"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />


      <select
        className="border p-3 w-full rounded mb-4"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      >

        <option>야구</option>
        <option>그림</option>
        <option>사진</option>
        <option>일상</option>

      </select>


      <textarea
        className="border p-3 w-full rounded mb-4"
        rows={10}
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />


      <button
        onClick={handleUpdate}
        className="bg-black text-white px-8 py-3 rounded-xl"
      >
        수정 완료
      </button>


    </div>
  );
}