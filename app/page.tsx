import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("id", { ascending: false });


  if (error) {
    console.error(error);
    return <div>글을 불러오는 중 오류가 발생했습니다.</div>;
  }


  if (!posts || posts.length === 0) {
    return (
      <div className="mx-auto max-w-5xl p-10">
        <h1 className="text-3xl font-bold">
          아직 작성된 글이 없습니다.
        </h1>
      </div>
    );
  }



  const latestPost = posts[0];
  const otherPosts = posts.slice(1);



  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }



  return (
    <main className="mx-auto max-w-5xl p-10">


      {/* 최신 글 */}
      <section className="mb-20">


        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          Latest Post
        </p>



        <Link href={`/post/${latestPost.id}`}>

          <article className="mt-5 overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">


            {latestPost.image && (

              <div className="bg-gray-50 flex justify-center">

                <img
                  src={latestPost.image}
                  alt={latestPost.title}
                  className="max-h-[700px] w-auto object-contain"
                />

              </div>

            )}




            <div className="p-8">


              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                {latestPost.category}
              </span>




              <h1 className="mt-5 text-4xl font-bold">
                {latestPost.title}
              </h1>




              <p className="mt-4 text-lg text-gray-600">
                {latestPost.description}
              </p>




              <p className="mt-5 text-sm text-gray-400">
                {formatDate(latestPost.created_at)}
                {" · "}
                Personal Archive
              </p>


            </div>


          </article>

        </Link>


      </section>







      {/* 최근 글 */}
      <section>


        <h2 className="mb-8 text-2xl font-bold">
          Recent Posts
        </h2>





        <div className="grid gap-8 md:grid-cols-2">



          {otherPosts.map((post) => (


            <Link
              key={post.id}
              href={`/post/${post.id}`}
            >


              <article className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl">


                {post.image && (

                  <div className="bg-gray-50 flex justify-center">

                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-80 w-full object-contain"
                    />

                  </div>

                )}




                <div className="p-6">


                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                    {post.category}
                  </span>





                  <h3 className="mt-4 text-2xl font-bold">
                    {post.title}
                  </h3>





                  <p className="mt-3 text-gray-600">
                    {post.description}
                  </p>





                  <p className="mt-4 text-sm text-gray-400">
                    {formatDate(post.created_at)}
                  </p>




                </div>



              </article>



            </Link>



          ))}


        </div>


      </section>



    </main>
  );
}