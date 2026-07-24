"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import AuthMenu from "@/components/AuthMenu";
import PopularPosts from "@/components/PopularPosts";


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

  const [open, setOpen] = useState(false);



  const linkClass = (path: string) => {

    const active =
      path === "/"
        ? pathname === "/"
        : pathname.startsWith(path);


    return `
      block
      px-3
      py-2
      transition
      ${
        active
          ? "text-black font-semibold border-l-2 border-black"
          : "text-gray-500 hover:text-black"
      }
    `;
  };



  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >


      <body
        className="
          min-h-screen
          flex
          bg-white
          relative
          overflow-x-hidden
        "
      >



        {/* 모바일 프로필 버튼 */}


        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="
              md:hidden
              fixed
              top-5
              left-5
              z-[100]
              pointer-events-auto
            "
          >

            <Image
              src="/profile.png"
              alt="profile"
              width={48}
              height={48}
              priority
              className="
                w-12
                h-12
                rounded-full
                object-cover
                border
                border-gray-200
              "
            />

          </button>
        )}





        {/* 모바일 배경 */}


        {open && (
          <div
            onClick={() => setOpen(false)}
            className="
              md:hidden
              fixed
              inset-0
              bg-black/30
              z-[80]
              pointer-events-auto
            "
          />
        )}







        {/* 사이드바 */}


        <aside
          className={`

            fixed
            md:static

            top-0
            left-0
            bottom-0

            z-[90]
            isolate

            w-72
            h-screen

            overflow-hidden

            border-r
            border-gray-200

            bg-white
            dark:bg-black

            p-8

            flex
            flex-col

            transition-transform
            duration-300


            ${
              open
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }

          `}
        >



          <button
            onClick={() => setOpen(false)}
            className="
              md:hidden
              mb-5
              text-sm
              text-gray-500
              text-left
            "
          >
            닫기
          </button>






          <div>


            <div className="mb-10">


              <p
                className="
                  text-xs
                  tracking-[0.35em]
                  text-gray-400
                  uppercase
                "
              >
                personal archive
              </p>



              <h1
                className="
                  mt-3
                  text-2xl
                  font-semibold
                  tracking-tight
                "
              >
                crooked shrimp
              </h1>



              <p
                className="
                  mt-2
                  text-xs
                  text-gray-400
                "
              >
                art · baseball · photography · daily
              </p>


            </div>
                        <div
              className="
                mb-10
                flex
                flex-col
                items-center
              "
            >

              <Image
                src="/profile.png"
                alt="profile"
                width={96}
                height={96}
                priority
                className="
                  w-24
                  h-24
                  rounded-full
                  object-cover
                "
              />


              <p className="mt-4 text-sm">
                꾸부렁새우
              </p>


            </div>





            <form
              action="/search"
              className="mb-10"
            >

              <input
                type="text"
                name="query"
                placeholder="Search..."
                className="
                  w-full
                  border
                  border-gray-200
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-black
                "
              />

            </form>


          </div>




          <nav className="space-y-3">


            <Link
              href="/"
              className={linkClass("/")}
              onClick={() => setOpen(false)}
            >
              HOME
            </Link>



            <Link
              href="/about"
              className={linkClass("/about")}
              onClick={() => setOpen(false)}
            >
              ABOUT
            </Link>





            <p
              className="
                mt-8
                mb-3
                text-sm
                font-semibold
                tracking-wide
                text-gray-800
              "
            >
              분류
            </p>





            <Link
              href="/category/일상"
              className={linkClass("/category/일상")}
              onClick={() => setOpen(false)}
            >
              일상
            </Link>




            <Link
              href="/category/야구"
              className={linkClass("/category/야구")}
              onClick={() => setOpen(false)}
            >
              야구
            </Link>




            <Link
              href="/category/그림"
              className={linkClass("/category/그림")}
              onClick={() => setOpen(false)}
            >
              그림
            </Link>




            <Link
              href="/category/사진"
              className={linkClass("/category/사진")}
              onClick={() => setOpen(false)}
            >
              사진
            </Link>






            <p
              className="
                mt-8
                mb-3
                text-sm
                font-semibold
                tracking-wide
                text-gray-800
              "
            >
              인기글
            </p>


            <PopularPosts />







            <p
              className="
                mt-8
                mb-3
                text-sm
                font-semibold
                tracking-wide
                text-gray-800
              "
            >
              태그
            </p>





            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              <span className="tag">
                야구
              </span>

              <span className="tag">
                일상
              </span>

              <span className="tag">
                미술
              </span>

              <span className="tag">
                사진
              </span>

            </div>





            <AuthMenu />


          </nav>



        </aside>







        <main
          className="
            flex-1
            min-h-screen
            p-5
            pt-20
            md:p-12
            bg-white
            dark:bg-black
          "
        >

          {children}

        </main>



      </body>


    </html>
  );
}