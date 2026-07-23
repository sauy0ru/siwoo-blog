"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthMenu from "@/components/AuthMenu";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname();



  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-xl transition ${
      pathname === path || pathname.startsWith(path + "/")
        ? "bg-white shadow font-semibold text-black"
        : "text-gray-600 hover:bg-white/60"
    }`;



  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >


      <body className="min-h-screen flex bg-white">



        {/* 사이드바 */}
        <aside className="w-72 bg-[#f1f5f9] border-r border-gray-200 p-8 flex flex-col h-screen">



          {/* 상단 */}
          <div>



            {/* 타이틀 */}
            <div className="mb-8 text-center">


              <p className="text-xs tracking-[0.35em] text-gray-500 uppercase">
                personal space
              </p>


              <h1 className="mt-3 text-2xl font-semibold">
                crooked shrimp
              </h1>


              <p className="mt-2 text-xs text-gray-500">
                art · baseball · photography
              </p>


            </div>





            {/* 프로필 */}
            <div className="flex flex-col items-center text-center mb-8">


              <div className="w-24 h-24 rounded-full overflow-hidden">


                <img
                  src="/profile.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />


              </div>


              <p className="mt-3 text-sm">
                꾸부렁새우
              </p>


            </div>






            {/* 검색 */}
            <form
              action="/search"
              className="mb-8"
            >


              <input
                type="text"
                name="query"
                placeholder="Search..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-black
                "
              />


            </form>



          </div>







          {/* 메뉴 */}
          <nav className="space-y-2">



            <Link
              href="/"
              className={linkClass("/")}
            >
              HOME
            </Link>





            <p className="mt-6 mb-2 text-xs tracking-[0.2em] text-gray-500 uppercase">
              Category
            </p>





            <Link
              href="/category/야구"
              className={linkClass("/category/야구")}
            >
              ⚾ 야구
            </Link>





            <Link
              href="/category/그림"
              className={linkClass("/category/그림")}
            >
              🎨 그림
            </Link>





            <Link
              href="/category/사진"
              className={linkClass("/category/사진")}
            >
              📷 사진
            </Link>





            <div className="mt-6" />





            <Link
              href="/about"
              className={linkClass("/about")}
            >
              ABOUT
            </Link>





            {/* 로그인 상태 메뉴 */}
            <AuthMenu />



          </nav>




        </aside>







        {/* 메인 */}
        <main className="flex-1 p-12 bg-white">

          {children}

        </main>





      </body>


    </html>
  );
}