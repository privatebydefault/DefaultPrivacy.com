import CategoryCard from "@/components/CategoryCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { humanize, slugify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ResourceTypes } from "@/types";

const { resources_folder } = config.settings;
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const posts: ResourceTypes[] = getSinglePage(resources_folder);
  const categories = [
    ...new Set(posts.map((post) => slugify(post.frontmatter.category)).flat()),
  ];

  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = async (props: {
  params: Promise<{ single: string }>;
}) => {
  const params = await props.params;
  const posts: ResourceTypes[] = getSinglePage(resources_folder);
  const filterByCategory = posts.filter((post) => {
    return slugify(post.frontmatter.category) === params.single;
  });
  const categoryName =
    filterByCategory[0].frontmatter.category || params.single;
  return (
    <>
      <SeoMeta title={humanize(categoryName)} />
      <PageHeader title={humanize(categoryName)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {filterByCategory.map((post: ResourceTypes, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <CategoryCard key={post.slug} post={post} slug={post.slug} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;
