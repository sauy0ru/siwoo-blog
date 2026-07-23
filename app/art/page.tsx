export default function ArtPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] p-12">

      {/* 제목 */}
      <h1 className="text-4xl font-bold">ART</h1>

      {/* 부제 */}
      <p className="mt-2 text-sm text-gray-400">
        Drawing · Illustration · Sketch
      </p>

      {/* 구분선 */}
      <div className="my-8 border-t" />

      {/* 내용 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-xl font-semibold">Sketch #1</h2>
          <p className="text-gray-500 mt-2">연습 드로잉</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-xl font-semibold">Illustration</h2>
          <p className="text-gray-500 mt-2">캐릭터 작업</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-xl font-semibold">Concept Art</h2>
          <p className="text-gray-500 mt-2">아이디어 스케치</p>
        </div>

      </div>
    </main>
  );
}