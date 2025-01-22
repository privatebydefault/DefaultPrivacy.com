import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByWeight } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { CategoryTypes, ResourceTypes } from "@/types";
import Link from "next/link";

const Categories = () => {
  const { resources_folder, categories_folder } = config.settings;
  const pageIndex = getListPage("categories/_index.md");
  const posts: ResourceTypes[] = getSinglePage(resources_folder);

  const categories: CategoryTypes[] = getSinglePage(categories_folder);
  const weightedCategories = sortByWeight(categories);

  const defaultImage = pageIndex.frontmatter.image;

  return (
    <>
      <SeoMeta {...pageIndex.frontmatter} />
      <PageHeader title={"Categories"} />
      <section className="section">
        <div className="container text-center">
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {weightedCategories.map((category) => {
              const count = posts.filter(
                (c) => c.frontmatter.category === category.frontmatter.title,
              ).length;
              return (
                <div
                  className=" bg-theme-light rounded-lg overflow-hidden p-1 flex flex-col lg:flex-row lg:items-center "
                  key={category.slug}
                >
                  <div className="lg:w-[40%]  size-full">
                    <Link
                      className="block size-full"
                      href={`/categories/${category.slug}`}
                    >
                      <ImageFallback
                        width={300}
                        height={250}
                        src={
                          weightedCategories.find(
                            (item) => item.slug === category.slug,
                          )?.frontmatter.image || defaultImage
                        }
                        className="size-full object-cover rounded-md mx-auto"
                        alt={category}
                      />
                    </Link>
                  </div>
                  <div className="text-left lg:w-[60%] p-5">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="block text-lg text-text mb-2 group/link "
                    >
                      <span className="group-hover/link:text-primary">
                        {category.frontmatter.title}{" "}
                      </span>
                      <span className="ml-2 rounded bg-secondary px-2 ">
                        {count}
                      </span>
                    </Link>
                    <p className="line-clamp-3 text-text/50 text-sm">
                      {
                        weightedCategories.find(
                          (item) => item.slug === category.slug,
                        )?.frontmatter.description
                      }
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
