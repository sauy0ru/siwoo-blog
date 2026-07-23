export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] p-12">

      <h1 className="text-4xl font-bold">GALLERY</h1>

      <p className="mt-2 text-sm text-gray-400">
        Moments captured in time
      </p>

      <div className="my-8 border-t" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition">
          📷 잠실 야구장
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition">
          🌅 노을
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition">
          🌊 바다
        </div>

      </div>

    </main>
  );
}