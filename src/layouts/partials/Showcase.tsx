import Sortby from "@/components/Sortby";
import { CategoryTypes, ResourceTypes } from "@/types";
import CategoryListView from "./CategoryListView";
import Sidebar from "./Sidebar";

const Showcase: React.FC<{
  posts: ResourceTypes[];
  categories: CategoryTypes[];
}> = ({ posts, categories }) => {
  // --------- SERVER SIDE ---------
  // Sort posts by featured
  const featuredPosts = posts.filter((post) => post.frontmatter.featured);
  const nonFeaturedPosts = posts.filter((post) => !post.frontmatter.featured);
  const sortedPosts = [...featuredPosts, ...nonFeaturedPosts];
  // --------- SERVER SIDE ---------

  return (
    <section className="section">
      <div className="flex">
        {/* Categories Section */}
        <aside className="bg-theme-light hidden lg:block w-[400px] ">
          <Sidebar posts={posts} categories={categories} />
        </aside>

        {/* Cards Section */}
        <main
          className="w-full scroll-mt-[var(--header-height)]"
          id="category_list_view"
        >
          <div className="grid grid-cols-1 gap-6 px-10 py-8 ">
            <div className="flex items-center justify-between">
              <h2 className="text-h4">Resources</h2>
              <Sortby />
            </div>

            <CategoryListView posts={sortedPosts} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Showcase;
