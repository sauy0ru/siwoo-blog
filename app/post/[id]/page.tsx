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



  // 조회수 증가
  const newViews = (post.views ?? 0) + 1;


  await supabase
    .from("posts")
    .update({
      views: newViews,
    })
    .eq("id", id);



  const date = new Date(post.created_at)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });



  return (
    <article className="max-w-5xl mx-auto px-10 py-16">


      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-black"
      >
        ← Back
      </Link>




      <div className="mt-10">

        <span className="
          rounded-full
          bg-gray-100
          px-4
          py-2
          text-sm
          text-gray-600
        ">
          {post.category}
        </span>

      </div>





      <h1 className="
        mt-8
        text-6xl
        font-bold
        tracking-tight
      ">
        {post.title}
      </h1>






      <EditButtons id={post.id} />






      <p className="mt-6 text-sm text-gray-400">

        {date}

        {" · "}

        Personal Archive

        {" · "}

        👁 {newViews}

      </p>







      {post.image && (

        <div className="
          mt-12
          rounded-3xl
          bg-gray-50
          p-5
          flex
          justify-center
        ">

          <img
            src={post.image}
            alt={post.title}
            className="
              max-h-[900px]
              w-auto
              object-contain
              rounded-2xl
            "
          />

        </div>

      )}








      <div className="
        mt-12
        text-lg
        leading-9
        whitespace-pre-wrap
        text-gray-700
      ">

        {post.description}

      </div>




    </article>
  );
}