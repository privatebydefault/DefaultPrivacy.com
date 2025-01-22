import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { FaRegClock } from "react-icons/fa";

const { resources_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(resources_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const PostSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(resources_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const { title, meta_title, description, image, lastModifiedDate } =
    frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              <div className="mb-10">
                <ImageFallback
                  src={`/images/resources/${params.single}.png`}
                  height={800}
                  width={1200}
                  alt={title}
                  className="w-full rounded  object-cover"
                />
              </div>

              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-4"
              />
              <ul className="mb-4">
                {lastModifiedDate && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(lastModifiedDate)}
                  </li>
                )}
              </ul>
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
