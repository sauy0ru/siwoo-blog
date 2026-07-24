"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PopularPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("posts")
        .select("id,title,views")
        .order("views", { ascending: false })
        .limit(5);

      setPosts(data ?? []);
    }

    load();
  }, []);

  if (posts.length === 0) return null;

  return (
    <div className="space-y-1">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="block px-3 py-2 text-sm text-gray-600 hover:text-black"
        >
          {post.title}
          <span className="ml-2 text-xs text-gray-400">
            👁 {post.views ?? 0}
          </span>
        </Link>
      ))}
    </div>
  );
}