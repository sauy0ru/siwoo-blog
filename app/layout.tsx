"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
          overflow-x-hidden
        "
      >

        {/* 모바일 프로필 버튼 */}
        <button
          onClick={() => setOpen(true)}
          className={`
            md:hidden
            fixed
            top-5
            left-5
            z-[9999]
            transition
            ${open ? "hidden" : "block"}
          `}
          style={{ touchAction: "manipulation" }}
        >
<Image
  src="/profile.png"
  alt="profile"
  width={56}
  height={56}
  priority
  className="w-14 h-14 rounded-full object-cover"
  style={{ objectPosition: "center" }}
/>
        </button>

        {/* 배경 */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="
              md:hidden
              fixed
              inset-0
              bg-black/40
              z-[9000]
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
            z-[9500]
            h-screen
            w-72
            overflow-y-auto
            border-r
            border-gray-200
            bg-white
            p-8
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
            "
          >
            닫기
          </button>

          <div className="mb-10">

            <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
              PERSONAL ARCHIVE
            </p>

            <h1 className="mt-3 text-2xl font-semibold">
              crooked shrimp
            </h1>

            <p className="mt-2 text-xs text-gray-400">
              art · baseball · photography · daily
            </p>

          </div>

<div className="mb-10 flex flex-col items-center">

  <div className="relative w-[72px] h-[72px] overflow-hidden rounded-full">
    <Image
      src="/profile.png"
      alt="profile"
      fill
      priority
      className="object-cover"
      sizes="72px"
    />
  </div>

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

            <p className="mt-8 mb-3 text-sm font-semibold">
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

            <p className="mt-8 mb-3 text-sm font-semibold">
              인기글
            </p>

            <PopularPosts />
                        <p className="mt-8 mb-3 text-sm font-semibold">
              태그
            </p>

            <div className="flex flex-wrap gap-2">

              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                야구
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                일상
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                그림
              </span>

              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                사진
              </span>

            </div>

            <div className="mt-8">
              <AuthMenu />
            </div>

          </nav>

        </aside>

        {/* 메인 */}
        <main
          className="
            relative
            z-0
            flex-1
            min-h-screen
            overflow-y-auto
            bg-white
            p-5
            pt-20
            md:p-12
          "
          onClick={() => {
            if (open) setOpen(false);
          }}
        >
          {children}
        </main>

      </body>
    </html>
  );
}