"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function WritePage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("야구");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);



  // 로그인 확인
  useEffect(() => {

    async function checkUser() {

      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();


      if (!user) {

        router.push("/login");
        return;

      }


      setUser(user);

    }


    checkUser();


  }, [router]);





  async function handleSubmit() {


    if (loading) return;


    if (!user) {

      alert("로그인이 필요합니다.");
      router.push("/login");
      return;

    }



    if (!title || !description) {

      alert("제목과 내용을 입력해주세요.");
      return;

    }



    setLoading(true);



    try {


      let imageUrl = "";



      // 이미지 업로드
      if (image) {


        const fileExt = image.name.split(".").pop();

        const fileName =
          `${Date.now()}.${fileExt}`;



        const {
          error: uploadError
        } = await supabase.storage
          .from("posts")
          .upload(fileName, image);



        if (uploadError) {

          throw new Error(
            `사진 업로드 실패: ${uploadError.message}`
          );

        }




        const {
          data
        } = supabase.storage
          .from("posts")
          .getPublicUrl(fileName);



        imageUrl = data.publicUrl;


      }







      // 글 저장
      const {
        error
      } = await supabase
        .from("posts")
        .insert({

          title,
          category,
          description,
          image: imageUrl,
          user_id: user.id,

        });





      if (error) {

        throw error;

      }





      alert("글이 저장되었습니다!");





      // 초기화

      setTitle("");
      setCategory("야구");
      setDescription("");
      setImage(null);
      setPreview("");



      router.refresh();



    } catch(error:any) {


      alert(error.message);
      console.error(error);



    } finally {


      setLoading(false);


    }


  }







  return (

    <div className="max-w-3xl mx-auto p-10">


      <h1 className="text-4xl font-bold mb-8">
        새 글 작성
      </h1>





      <input

        className="border p-3 w-full rounded mb-4"

        placeholder="제목"

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

        placeholder="내용"

        value={description}

        onChange={(e)=>setDescription(e.target.value)}

      />







      <input

        type="file"

        accept="image/*"

        className="mb-6"

        onChange={(e)=>{


          const file = e.target.files?.[0];


          if(file){

            setImage(file);


            const url = URL.createObjectURL(file);

            setPreview(url);

          }


        }}

      />







      {/* 이미지 미리보기 */}

      {preview && (

        <div className="mb-6 rounded-2xl bg-gray-50 p-5">

          <img

            src={preview}

            alt="preview"

            className="max-h-96 mx-auto rounded-xl object-contain"

          />

        </div>

      )}







      <button

        onClick={handleSubmit}

        disabled={loading}

        className="bg-black text-white px-8 py-3 rounded disabled:opacity-50"

      >

        {loading ? "업로드 중..." : "게시하기"}

      </button>



    </div>

  );

}