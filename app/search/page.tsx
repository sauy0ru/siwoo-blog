import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {


  const { query } = await searchParams;


  if (!query) {
    return (
      <div className="p-10">
        <h1 className="text-4xl font-bold">
          검색어를 입력해주세요
        </h1>
      </div>
    );
  }



  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .or(
      `title.ilike.%${query}%,description.ilike.%${query}%`
    )
    .order("id", {
      ascending:false
    });



  if(error){

    return (
      <div className="p-10">
        검색 오류
      </div>
    );

  }



  return (

    <div className="max-w-5xl mx-auto p-10">


      <h1 className="text-4xl font-bold mb-8">
        "{query}" 검색 결과
      </h1>



      {
        posts && posts.length > 0 ? (

          <div className="grid gap-8 md:grid-cols-2">


            {
              posts.map((post)=>(

                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                >

                  <div className="rounded-2xl bg-white shadow p-6 hover:shadow-xl transition">


                    {
                      post.image && (

                        <img
                          src={post.image}
                          className="w-full max-h-80 object-contain rounded-xl mb-5"
                        />

                      )
                    }



                    <h2 className="text-2xl font-bold">
                      {post.title}
                    </h2>



                    <p className="mt-3 text-gray-600">
                      {post.description}
                    </p>


                  </div>

                </Link>

              ))
            }


          </div>

        ) : (

          <p className="text-gray-500">
            검색 결과가 없습니다.
          </p>

        )
      }


    </div>

  );
}