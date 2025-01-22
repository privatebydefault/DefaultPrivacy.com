"use client";

import { useSidebarContext } from "@/context/SidebarProvider";
import { CategoryTypes, ResourceTypes } from "@/types";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const SidebarNavGroup: React.FC<{
  category: CategoryTypes;
  posts: ResourceTypes[];
  handleSidebarDrawerLinkClick?: () => void;
  isExpanded?: boolean;
}> = ({
  posts,
  category,
  handleSidebarDrawerLinkClick,
  isExpanded: isExpandedProps = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProps);
  const { activeSortedNavGroup, setActiveSortedNavGroup } = useSidebarContext();

  const handleNavGroupSorting = (sortedItem: string) => {
    // scroll to category_list_view id when finalPosts change, avoid at first render

    document
      .getElementById("category_list_view")
      ?.scrollIntoView({ behavior: "smooth" });

    setActiveSortedNavGroup((prev) =>
      prev.includes(sortedItem)
        ? prev.filter((item) => item !== sortedItem)
        : [...prev, sortedItem],
    );
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // tags are used as subcategories
  const tagsAsSubcategory = [
    ...new Set(
      posts
        .filter(
          (post) => post.frontmatter.category === category.frontmatter.title,
        )
        .map((post) => post.frontmatter.tags)
        .flat(),
    ),
  ];

  // Category tags
  const categoryUniqueTagsCount = [
    ...new Set(
      posts
        .filter(
          (post) => post.frontmatter.category === category.frontmatter.title,
        )
        .map((post) => post.frontmatter.tags)
        .flat(),
    ),
  ].length;

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-between w-full"
          onClick={handleToggle}
        >
          <p
            className={`text-base font-medium text-left  ${isExpanded ? "text-text" : "text-text"}`}
          >
            {category.frontmatter.title}
            <span> ({categoryUniqueTagsCount})</span>
          </p>

          <RiArrowDropDownLine
            size={26}
            className={`transition-transform duration-300 ${isExpanded ? "-rotate-0 text-text" : "-rotate-90 text-text"}`}
          />
        </button>
      </div>
      {isExpanded && (
        <ul className="flex flex-col gap-1 mt-2">
          {tagsAsSubcategory.map((tag: string) => {
            const count = posts.filter((post) =>
              post.frontmatter.tags.includes(tag),
            ).length;
            return (
              <li key={tag}>
                <button
                  className="px-6 py-2 text-text text-sm flex items-center gap-2 group "
                  onClick={() => {
                    handleNavGroupSorting(tag);
                    handleSidebarDrawerLinkClick;
                  }}
                >
                  <div
                    className={`size-4 aspect-square bg-body  rounded-sm transition-colors duration-150 border-[1.5px] border-transparent group-hover:border-primary ${activeSortedNavGroup.some((item) => item === tag) ? "bg-primary border-secondary" : "bg-body"}`}
                  ></div>
                  <div>
                    <span>{tag} </span>
                    {count && (
                      <span className="text-[12px] text-secondary">
                        ({count})
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SidebarNavGroup;
