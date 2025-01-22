import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { plainify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";

const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { title, image, date } = data.frontmatter;
  return (
    <div className="bg-body group ">
      {image && (
        <div className="overflow-hidden rounded-lg  mb-6 ">
          <Link href={`/${blog_folder}/${data.slug}`}>
            <ImageFallback
              className="size-full aspect-video object-cover"
              src={image}
              alt={title}
              width={445}
              height={230}
            />
          </Link>
        </div>
      )}
      <h4 className="mb-3 text-h5">
        <Link
          href={`/${blog_folder}/${data.slug}`}
          className="hover:text-primary transition-colors duration-200"
        >
          {title}
        </Link>
      </h4>
      <p className="inline-block mb-4">{dateFormat(date as string)}</p>

      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
      <Link
        className="btn btn-outline-primary btn-sm"
        href={`/${blog_folder}/${data.slug}`}
      >
        read more
      </Link>
    </div>
  );
};

export default BlogCard;
