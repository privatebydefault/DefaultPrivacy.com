"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { plainify, titleify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";

export interface ISearchItem {
  group: string;
  slug: string;
  frontmatter: {
    title: string;
    image?: string | null;
    externalURL?: string;
    description?: string;
    categories?: string[];
    category?: string;
    tags?: string[];
  };
  content: string;
}

export interface ISearchGroup {
  group: string;
  groupItems: {
    slug: string;
    frontmatter: {
      title: string;
      image?: string | null;
      externalURL?: string;
      description?: string;
      categories?: string[];
      redFlag?: boolean;
      tags?: string[];
    };
    content: string;
  }[];
}

// search result component
const SearchResult = ({
  searchResult,
  searchString,
}: {
  searchResult: ISearchItem[];
  searchString: string;
}) => {
  // Handle close modal
  const handleCloseModal = () => {
    const searchModal = document.getElementById("searchModal");
    if (searchModal) {
      searchModal.classList.remove("show");
    }
  };

  // generate search result group
  const generateSearchGroup = (searchResult: ISearchItem[]) => {
    const joinDataByGroup: ISearchGroup[] = searchResult.reduce(
      (groupItems: ISearchGroup[], item: ISearchItem) => {
        const groupIndex = groupItems.findIndex(
          (group) => group.group === item.group,
        );
        if (groupIndex === -1) {
          groupItems.push({
            group: item.group,
            groupItems: [
              {
                frontmatter: { ...item.frontmatter },
                slug: item.slug,
                content: item.content,
              },
            ],
          });
        } else {
          groupItems[groupIndex].groupItems.push({
            frontmatter: { ...item.frontmatter },
            slug: item.slug,
            content: item.content,
          });
        }

        return groupItems;
      },
      [],
    );
    return joinDataByGroup;
  };
  const finalResult = generateSearchGroup(searchResult);

  // match marker
  const matchMarker = (text: string, substring: string) => {
    const parts = text.split(new RegExp(`(${substring})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === substring.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      ),
    );
  };

  // match underline
  const matchUnderline = (text: string, substring: string) => {
    const parts = text?.split(new RegExp(`(${substring})`, "gi"));
    return parts?.map((part, index) =>
      part.toLowerCase() === substring.toLowerCase() ? (
        <span key={index} className="underline">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // match content
  const matchContent = (content: string, substring: string) => {
    const plainContent = plainify(content);
    const position = plainContent
      .toLowerCase()
      .indexOf(substring.toLowerCase());

    // Find the start of the word containing the substring
    let wordStart = position;
    while (wordStart > 0 && plainContent[wordStart - 1] !== " ") {
      wordStart--;
    }

    const matches = plainContent.substring(
      wordStart,
      substring.length + position,
    );
    const matchesAfter = plainContent.substring(
      substring.length + position,
      substring.length + position + 80,
    );
    return (
      <>
        {matchMarker(matches, substring)}
        {matchesAfter}
      </>
    );
  };

  const [activeGroupTab, setActiveGroupTab] = useState(0);

  return (
    <div className="search-wrapper-body">
      {/* Result Group Tab */}
      <div className="flex items-center gap-2 mb-5">
        {finalResult.length > 0 && (
          <>
            {finalResult.map((result, index) => (
              <button
                key={result.group}
                onClick={() => setActiveGroupTab(index)}
                className={`flex items-center px-4 py-2 text-base text-text border-primary border rounded-md ${
                  activeGroupTab === index ? "bg-primary " : "bg-transparent "
                }`}
              >
                {titleify(result.group)}
                <span className="inline-block bg-secondary text-xs px-1 py-0.5 rounded-md ml-2">
                  {result.groupItems.length}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
      {searchString ? (
        <div className="search-result">
          {finalResult.length > 0 ? (
            finalResult
              .filter(
                (item) => item.group === finalResult[activeGroupTab].group,
              )
              .map((result) => (
                <div className="search-result-group" key={result.group}>
                  {result.groupItems.map((item) => {
                    const isRedFlag = item.frontmatter.redFlag || false; // check if resource has red flag
                    return (
                      <div
                        key={item.slug}
                        id="searchItem"
                        className="search-result-item"
                      >
                        <div className="search-result-item-image relative">
                          {isRedFlag && (
                            <Link
                              className="absolute right-2 top-2 size-6"
                              target="_self"
                              href={`${item.slug}`}
                              onClick={handleCloseModal}
                            >
                              <ImageFallback
                                width={25}
                                height={25}
                                src="/images/red-alert-icon.svg"
                                alt=""
                                className="!aspect-auto"
                              />
                            </Link>
                          )}
                          <ImageFallback
                            src={
                              result.group === "resources"
                                ? item.frontmatter.image ||
                                  `/images/${item.slug}.png`
                                : item.frontmatter.image
                            }
                            fallback="/images/demo-thumbnail.png"
                            alt={item.frontmatter.title}
                            width={290}
                            height={165}
                          />
                        </div>

                        <div className="search-result-item-body">
                          <Link
                            href={
                              item.frontmatter.externalURL || `/${item.slug}`
                            }
                            target={"_blank"}
                            className="search-result-item-title "
                          >
                            {matchUnderline(
                              item.frontmatter.title,
                              searchString,
                            )}
                            {result.group === "resources" && (
                              <svg
                                stroke="currentColor"
                                className="inline-block ml-1 -translate-y-0.5 text-secondary"
                                fill="none"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            )}
                          </Link>
                          {item.frontmatter.description && (
                            <p className="search-result-item-description">
                              {matchUnderline(
                                item.frontmatter.description,
                                searchString,
                              )}
                            </p>
                          )}
                          {item.content && (
                            <p className="search-result-item-content hidden">
                              {matchContent(item.content, searchString)}
                            </p>
                          )}
                          <div className="search-result-item-taxonomies">
                            {item.frontmatter.categories && (
                              <div className="mr-2">
                                <svg
                                  stroke="currentColor"
                                  className="text-primary"
                                  fill="none"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                  ></path>
                                </svg>
                                {item.frontmatter.categories.map(
                                  (category, index) => (
                                    <span key={category}>
                                      {matchUnderline(category, searchString)}
                                      {item.frontmatter.categories &&
                                        index !==
                                          item.frontmatter.categories.length -
                                            1 && <>, </>}
                                    </span>
                                  ),
                                )}
                              </div>
                            )}
                            {item.frontmatter.tags && (
                              <div className="mr-2">
                                <svg
                                  stroke="currentColor"
                                  className="text-primary"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 24 24"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M11.707,2.293C11.52,2.105,11.265,2,11,2H6C5.735,2,5.48,2.105,5.293,2.293l-3,3C2.105,5.48,2,5.734,2,6v5 c0,0.266,0.105,0.52,0.293,0.707l10,10C12.488,21.902,12.744,22,13,22s0.512-0.098,0.707-0.293l8-8 c0.391-0.391,0.391-1.023,0-1.414L11.707,2.293z M13,19.586l-9-9V6.414L6.414,4h4.172l9,9L13,19.586z"></path>
                                  <circle
                                    cx="8.353"
                                    cy="8.353"
                                    r="1.647"
                                  ></circle>
                                </svg>
                                {item.frontmatter.tags.map((tag, index) => (
                                  <span key={tag}>
                                    {matchUnderline(tag, searchString)}
                                    {item.frontmatter.tags &&
                                      index !==
                                        item.frontmatter.tags.length - 1 && (
                                        <>, </>
                                      )}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
          ) : (
            <div className="search-result-empty">
              <svg
                className="mx-auto"
                width="42"
                height="42"
                viewBox="0 0 47 47"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.10368 33.9625C9.90104 36.2184 13.2988 37.6547 16.9158 38.0692C21.6958 38.617 26.5063 37.3401 30.3853 34.4939C30.4731 34.6109 30.5668 34.7221 30.6721 34.8304L41.9815 46.1397C42.5323 46.6909 43.2795 47.0007 44.0587 47.001C44.838 47.0013 45.5854 46.692 46.1366 46.1412C46.6878 45.5904 46.9976 44.8432 46.9979 44.064C46.9981 43.2847 46.6888 42.5373 46.138 41.9861L34.8287 30.6767C34.7236 30.5704 34.6107 30.4752 34.4909 30.3859C37.3352 26.5046 38.6092 21.6924 38.0579 16.912C37.6355 13.2498 36.1657 9.81322 33.8586 6.9977L31.7805 9.09214C34.0157 11.9274 35.2487 15.4472 35.2487 19.0942C35.2487 21.2158 34.8308 23.3167 34.0189 25.2769C33.207 27.2371 32.0169 29.0181 30.5167 30.5184C29.0164 32.0186 27.2354 33.2087 25.2752 34.0206C23.315 34.8325 21.2141 35.2504 19.0925 35.2504C16.9708 35.2504 14.8699 34.8325 12.9098 34.0206C11.5762 33.4682 10.3256 32.7409 9.18992 31.8599L7.10368 33.9625ZM28.9344 6.28152C26.1272 4.12516 22.671 2.93792 19.0925 2.93792C14.8076 2.93792 10.6982 4.64009 7.66829 7.66997C4.6384 10.6999 2.93623 14.8093 2.93623 19.0942C2.93623 21.2158 3.35413 23.3167 4.16605 25.2769C4.72475 26.6257 5.4625 27.8897 6.35716 29.0358L4.2702 31.1391C1.35261 27.548 -0.165546 23.0135 0.00974294 18.3781C0.19158 13.5695 2.18233 9.00695 5.58371 5.60313C8.98509 2.19932 13.5463 0.205307 18.3547 0.0200301C22.9447 -0.156832 27.4369 1.32691 31.0132 4.18636L28.9344 6.28152Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.13672 39.1367L38.3537 3.64355"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                ></path>
              </svg>
              <p className="mt-4">
                No results for &quot;<strong>{searchString}</strong>&quot;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-8 pb-14 text-center">
          Type something to search...
        </div>
      )}
    </div>
  );
};

export default SearchResult;
