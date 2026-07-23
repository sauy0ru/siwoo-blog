export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] p-12">

      <h1 className="text-4xl font-bold">BLOG</h1>

      <p className="mt-2 text-sm text-gray-400">
        All posts and writings
      </p>

      <div className="my-8 border-t" />

      <div className="space-y-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition">
          <h2 className="font-semibold">두산베어스 직관</h2>
          <p className="text-gray-500 text-sm mt-2">야구 직관 이야기</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition">
          <h2 className="font-semibold">그림 그리기</h2>
          <p className="text-gray-500 text-sm mt-2">그림 제작 과정</p>
        </div>

      </div>

    </main>
  );
}