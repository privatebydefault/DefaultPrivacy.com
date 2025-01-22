"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { useSidebarContext } from "@/context/SidebarProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { setIsNavbarDrawerOpen } = useSidebarContext();
  // distructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  // get current path
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <header
      className={` z-10 shadow-lg ${settings.sticky_header ? "sticky top-0" : ""}`}
      style={{ height: "var(--header-height)" }}
    >
      <nav className="flex items-center justify-between gap-8 px-8 bg-body shadow-lg w-full h-full">
        <RxHamburgerMenu
          size={24}
          className="lg:hidden cursor-pointer"
          onClick={() => setIsNavbarDrawerOpen(true)}
        />

        <Logo />

        <ul className=" items-center space-x-6 hidden lg:flex">
          {main.map((item, index) =>
            item.hasChildren ? (
              <li key={index} className="relative group">
                <p className="text-text group-hover:text-primary py-5 flex items-center gap-2">
                  {item.name}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </p>
                <ul className="hidden group-hover:block absolute top-full left-0 bg-theme-light py-2 shadow-lg">
                  {item.children?.map((child, index) => (
                    <li key={index}>
                      <Link
                        href={child.url}
                        className="text-text hover:text-primary py-2 px-6 inline-block min-w-max "
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={index}>
                <Link href={item.url} className="text-text hover:text-primary">
                  {item.name}
                </Link>
              </li>
            ),
          )}
        </ul>

        <Link
          href={navigation_button.link}
          className=" font-medium btn btn-outline-primary "
        >
          {navigation_button.label}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
