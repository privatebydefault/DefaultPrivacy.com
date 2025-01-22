"use client";

import CategoryCard from "@/components/CategoryCard";
import { useGeneralStateContext } from "@/context/GeneralStateProvider";
import { useSidebarContext } from "@/context/SidebarProvider";
import { ResourceTypes } from "@/types";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const CategoryListView: React.FC<{
  posts: ResourceTypes[];
}> = ({ posts }) => {
  const [finalPosts, setFinalPosts] = useState<ResourceTypes[]>([]);
  const { activeSortedNavGroup } = useSidebarContext();

  useEffect(() => {
    setFinalPosts(
      activeSortedNavGroup.length > 0
        ? posts.filter((item) =>
            item.frontmatter.tags.some((tag) =>
              activeSortedNavGroup.includes(tag),
            ),
          )
        : posts,
    );
  }, [activeSortedNavGroup, posts]);

  // handle sort-by select options
  const { sortBy } = useGeneralStateContext();
  const finalPostsStringified = JSON.stringify(finalPosts);
  useEffect(() => {
    setFinalPosts((prev) => {
      if (sortBy === "newest") {
        return [...prev].sort((a, b) => {
          return (
            Number(new Date(b.frontmatter.lastModifiedDate)) -
            Number(new Date(a.frontmatter.lastModifiedDate))
          );
        });
      } else if (sortBy === "oldest") {
        return [...prev].sort((a, b) => {
          return (
            Number(new Date(a.frontmatter.lastModifiedDate)) -
            Number(new Date(b.frontmatter.lastModifiedDate))
          );
        });
      } else if (sortBy === "featured") {
        return [...prev].sort((a, b) => {
          return (
            (b.frontmatter.featured === true ? 1 : 0) -
            (a.frontmatter.featured === true ? 1 : 0)
          );
        });
      } else {
        return prev;
      }
    });
  }, [sortBy, finalPostsStringified]);

  // handle infinite scroll
  const [item, setItem] = useState(8);
  const [page, setPage] = useState(finalPosts.slice(0, item));
  const fetchData = () => {
    setItem(item + 20);
  };

  useEffect(() => {
    setPage(finalPosts.slice(0, item));
  }, [item, finalPosts]);

  return (
    <InfiniteScroll
      dataLength={page.length}
      next={fetchData}
      hasMore={true}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 "
      loader={""}
    >
      {page.length > 0
        ? page.map((post) => (
            <div key={post.slug}>
              <div>
                <CategoryCard key={post.slug} post={post} slug={post.slug} />
              </div>
            </div>
          ))
        : null}
    </InfiniteScroll>
  );
};

export default CategoryListView;
