import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { blog_folder, pagination } = config.settings;

// generate static params
export const generateStaticParams = async () => {
  const allPost: Post[] = getSinglePage(blog_folder);
  const totalPages = Math.ceil(allPost.length / pagination);
  let paths: { page: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    });
  }

  return paths;
};

// for all regular pages
const Posts = async ({ params }: { params: Promise<{ page: string }> }) => {
  const paramValue = await params;
  const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(blog_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage = paramValue.page && !isNaN(Number(paramValue.page)) ? Number(paramValue.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {currentPosts.map((post: Post, index: number) => (
              <BlogCard data={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>
      <Pagination
        section={blog_folder}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Posts;