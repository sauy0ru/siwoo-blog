"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {

  const router = useRouter();


  async function handleDelete() {

    const ok = confirm("정말 삭제할까요?");

    if (!ok) return;


    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);


    if (error) {
      alert("삭제 실패");
      console.error(error);
      return;
    }


    alert("삭제되었습니다.");

    router.push("/");
    router.refresh();

  }


  return (
    <button
      onClick={handleDelete}
      className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
    >
      삭제
    </button>
  );
}