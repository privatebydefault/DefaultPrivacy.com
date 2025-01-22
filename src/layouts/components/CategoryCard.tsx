import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { ResourceTypes } from "@/types";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { BsPatchExclamation } from "react-icons/bs";

const CategoryCard: React.FC<{ post: ResourceTypes; slug: string }> = ({
  post,
  slug,
}) => {
  const {
    title,
    featured,
    affiliated,
    redFlag,
    description,
    externalURL,
    image,
    tags,
  } = post.frontmatter;

  const generatedImagePath = `/images/resources/${slug}.png`;

  return (
    <article className="bg-theme-light size-full overflow-hidden group rounded-md">
      <div
        // target="_blank"
        // href={externalURL}
        className="overflow-hidden inline-block w-full relative"
      >
        {/* Show this red alert only if enabled */}
        {redFlag && (
          <Link target="_self" href={`/resources/${slug}`}>
            <ImageFallback
              width={25}
              height={25}
              src="/images/red-alert-icon.svg"
              alt=""
              className="absolute right-2 top-2"
            />
          </Link>
        )}

        <ImageFallback
          src={image ? image : generatedImagePath}
          fallback="/images/demo-thumbnail.png"
          width={533}
          height={300}
          alt="Link Preview Image for Default Privacy"
          className="w-full aspect-video object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <Link
            target="_blank"
            href={externalURL}
            className="hover:text-primary"
          >
            <h3
              className="text-h6 mb-4 text-inherit transition-colors duration-300"
              dangerouslySetInnerHTML={markdownify(title)}
            />
          </Link>

          <div className="flex items-center">
            {featured && (
              <span className="border-secondary text-secondary font-bold border-[1.5px] inline-block px-2 py-1 text-xs mr-4 rounded-md">
                Featured
              </span>
            )}
            {affiliated && (
              <div className="flex items-center gap-2">
                <BsPatchExclamation size={18} className="text-white" />
                <span>Affiliate</span>
              </div>
            )}
          </div>
          <p
            className="text-text mt-3 line-clamp-3"
            dangerouslySetInnerHTML={markdownify(description)}
          />
        </div>

        {/* tags */}

        <div className="flex justify-between items-end mt-5">
          <ul className="flex flex-wrap gap-2 tags">
            {tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className=" border text-white/90 px-3 py-1 text-xs list-disc list-inside rounded-md"
                >
                  {tag}
                </li>
              );
            })}
          </ul>
          <Link
            target="_blank"
            href={externalURL}
            className="bg-primary text-white mt-4 flex items-center gap-2 max-w-max px-4 py-1.5 rounded-md"
          >
            <span className="text-base font-medium">Visit</span>
            <BiLinkExternal size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
