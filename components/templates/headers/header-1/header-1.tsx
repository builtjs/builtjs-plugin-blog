import React from "react";
import Image from "next/image";
import Link from "next/link";
import getConfig from "next/config";
import { ModeToggleBtn } from "@/plugin-elements/builtjs-blog";

export default function Header1({ content }: any) {
  const { publicRuntimeConfig } = getConfig();
  if (!content) return <></>;
  let { global = null } = { ...content };

  return (
    <header id="header-1" className="template">
      <section className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto">
          <nav className="flex flex-wrap items-center">
            <Link className="flex items-center pr-10 mr-auto" href="/">
              <span className="relative w-10">
                <Image
                  className="text-gray-400 bg-white fill-current dark:bg-gray-800"
                  src={`${publicRuntimeConfig.BACKEND_URL || ""}${
                    global?.logo?.data.attributes.url
                  }`}
                  width={global?.logo?.data.attributes.width || "40px"}
                  height={global?.logo?.data.attributes.height || "40px"}
                  layout="responsive"
                  alt=""
                />
              </span>
              <span className="ml-3 text-xl font-bold text-black uppercase dark:text-white">
                {global.name}
              </span>
            </Link>
            <ModeToggleBtn />
          </nav>
        </div>
      </section>
    </header>
  );
}
