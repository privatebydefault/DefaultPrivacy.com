"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_description } = config.params;
  const { column_1, column_2, column_3 } = menu.footer;
  function replaceYear(text: string) {
    const year = new Date().getFullYear();

    return text.replace("{year}", year.toString());
  }

  return (
    <footer>
      <div className="bg-theme-light  py-20">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap gap-20 xl:gap-36">
            {/* column 1 (logo and description) */}
            <div className="lg:w-[25%]">
              <div className="mb-5">
                <Logo />
              </div>
              <p dangerouslySetInnerHTML={markdownify(footer_description)} />
            </div>

            {/* column 2 (hosted on) */}
            <div className="lg:w-[25%]">
              <h2
                className="text-h5 mb-4"
                dangerouslySetInnerHTML={markdownify(column_1.title)}
              />
              <ul className="space-y-2">
                {column_1.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      target={column_1.external_link ? "_blank" : "_self"}
                      className="footer_link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* column 3 (legal) */}
            <div className="lg:w-[25%]">
              <h2
                className="text-h5 mb-4"
                dangerouslySetInnerHTML={markdownify(column_2.title)}
              />
              <ul className="space-y-2">
                {column_2.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      target={column_2.external_link ? "_blank" : "_self"}
                      className="footer_link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* column 4 (company) */}
            <div className="lg:w-[25%]">
              <h2
                className="text-h5 mb-4"
                dangerouslySetInnerHTML={markdownify(column_3.title)}
              />
              <ul className="space-y-2">
                {column_3.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      target={column_3.external_link ? "_blank" : "_self"}
                      className="footer_link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-body py-10">
        <div className="container">
          <p
            className="text-text text-sm text-center"
            dangerouslySetInnerHTML={markdownify(replaceYear(copyright))}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;