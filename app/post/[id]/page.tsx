import Link from "next/link";
import { supabase } from "@/lib/supabase";
import EditButtons from "@/components/EditButtons";


export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;


  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();



  if (error || !post) {
    return (
      <div className="p-10">
        글을 찾을 수 없습니다.
      </div>
    );
  }



  const date = new Date(post.created_at)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });



  return (
    <article className="max-w-5xl mx-auto px-10 py-16">



      {/* 뒤로가기 */}
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-black"
      >
        ← Back
      </Link>





      {/* 카테고리 */}
      <div className="mt-10">

        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">

          {post.category}

        </span>

      </div>






      {/* 제목 */}
      <h1 className="mt-8 text-6xl font-bold tracking-tight">

        {post.title}

      </h1>






      {/* 수정 삭제 버튼 */}
      <EditButtons id={post.id} />







      {/* 날짜 */}
      <p className="mt-6 text-sm text-gray-400">

        {date}
        {" · "}
        Personal Archive

      </p>







      {/* 이미지 */}
      {post.image && (

        <div className="mt-12 rounded-3xl bg-gray-50 p-5 flex justify-center">


          <img
            src={post.image}
            alt={post.title}
            className="max-h-[900px] w-auto object-contain rounded-2xl"
          />


        </div>

      )}







      {/* 내용 */}
      <div className="mt-12 text-lg leading-9 whitespace-pre-wrap text-gray-700">

        {post.description}

      </div>





    </article>
  );
}