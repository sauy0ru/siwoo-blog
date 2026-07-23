import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const categoryName = decodeURIComponent(name);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", categoryName)
    .order("created_at", { ascending: false });

  if (error) {
    return <div>불러오기 실패</div>;
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        {categoryName}
      </h1>

      <div className="space-y-8">

        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
          >
            <div className="border p-5 rounded-xl hover:shadow-lg transition">

              {post.image && (
                <div className="w-full bg-gray-50 rounded-lg overflow-hidden flex justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-[700px] object-contain"
                  />
                </div>
              )}

              <h2 className="text-2xl font-bold mt-4">
                {post.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {post.description}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}