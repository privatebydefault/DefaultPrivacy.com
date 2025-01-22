"use client";

import Logo from "@/components/Logo";
import menu from "@/config/menu.json";
import { useSidebarContext } from "@/context/SidebarProvider";
import { CategoryTypes, ResourceTypes } from "@/types";
import Link from "next/link";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useOnClickOutside } from "usehooks-ts";
import { INavigationLink } from "./Header";
import Sidebar from "./Sidebar";

const SidebarDrawerMenuClientComponent: React.FC<{
  posts: ResourceTypes[];
  categories: CategoryTypes[];
}> = ({ posts, categories }) => {
  const { isNavbarDrawerOpen, setIsNavbarDrawerOpen } = useSidebarContext();
  const { main }: { main: INavigationLink[] } = menu;

  // Handle Click Outside
  const navRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(navRef, () => {
    setIsNavbarDrawerOpen(false);
  });

  const handleSidebarDrawerLinkClick = () => {
    setIsNavbarDrawerOpen(false);
  };

  return (
    <div
      className={`bg-theme-light/40 backdrop-blur-sm fixed inset-0 z-20 size-full lg:hidden ${isNavbarDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div
        ref={navRef}
        className={`relative bg-theme-light left-0 top-0 max-w-[300px] min-h-full transition-transform duration-500 h-screen overflow-y-auto custom-scrollbar ${isNavbarDrawerOpen ? "block translate-x-0" : "block -translate-x-full "}`}
      >
        <div className="flex justify-between items-center gap-5 p-5">
          <div>
            <Logo />
          </div>
          <button
            aria-label="close drawer"
            className="text-primary"
            onClick={() => setIsNavbarDrawerOpen(false)}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* PAGES */}
        <nav className="p-5">
          <h3 className="text-h6 mb-5">Navigation Menu</h3>
          <ul className="flex flex-col items-stretch   ">
            {main.map((item, index) =>
              item.hasChildren ? (
                <li key={index} className="relative group">
                  <div className="flex justify-between items-center">
                    <Link
                      href={item.url}
                      className="text-text group-hover:text-primary py-1 font-medium text-base block"
                    >
                      {item.name}
                    </Link>
                    <RiArrowDropDownLine
                      size={26}
                      className={`transition-transform duration-300 group-hover:-rotate-0 group-hover:text-primary -rotate-90 text-text`}
                    />
                  </div>
                  <ul className="hidden group-hover:block bg-theme-light py-2">
                    {item.children?.map((child, index) => (
                      <li key={index}>
                        <Link
                          href={child.url}
                          className="text-text hover:text-primary py-2 px-6 inline-block"
                          onClick={handleSidebarDrawerLinkClick}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="text-text hover:text-primary py-1 font-medium text-base inline-block"
                    onClick={handleSidebarDrawerLinkClick}
                  >
                    {item.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <Sidebar
          handleSidebarDrawerLinkClick={handleSidebarDrawerLinkClick}
          isExpanded={false}
          disableMaxHeight={true}
          posts={posts}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default SidebarDrawerMenuClientComponent;
