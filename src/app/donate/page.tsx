import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

interface SectionsProp extends RegularPage {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
    sections: {
      title: string;
      description: string;
      image?: string;
    }[];
  };
}

const Donate = () => {
  const data: SectionsProp = getListPage("donate/_index.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image, sections } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section">
        <div className="container">
          <div className="grid gap-36">
            {sections.map((section, index) => {
              return (
                <div
                  className="flex flex-col gap-24 items-center md:flex-row"
                  key={section.title}
                >
                  {/* LEFT */}
                  <div className="md:w-1/2 w-full">
                    <h2
                      className="text-h1 gradient-text mb-10 md:mb-14"
                      dangerouslySetInnerHTML={markdownify(section.title)}
                    />
                    <div
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                  </div>
                  {/* RIGHT */}
                  {section.image && (
                    <div className="md:w-1/2 w-full">
                      <ImageFallback
                        className="w-full"
                        src={section.image}
                        width={600}
                        height={400}
                        alt={section.title}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;