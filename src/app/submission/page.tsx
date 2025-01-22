import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";

const { submission_email } = config.params;

interface pageIndexProps {
  frontmatter: {
    title: string;
    meta_title: string;
    description: string;
    image: string;
    form: {
      title: string;
      category_options: {
        name: string;
        value: string;
      }[];
    };
  };
}

const About = () => {
  const data: pageIndexProps = getListPage("submission/_index.md");
  const { frontmatter } = data;
  const { title, meta_title, description, image, form } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <h2
                className="text-h3 font-bold mb-6"
                dangerouslySetInnerHTML={markdownify(form.title)}
              />
              <form
                action={`https://formsubmit.co/${submission_email}`}
                method="post"
                className="space-y-4"
              >
                <div>
                  <label className="form-label" htmlFor="resource-name">
                    Resource Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="resource-name"
                    name="resource-name"
                    placeholder="VPN Service"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="website">
                    Website <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="form-input"
                    id="category"
                    name="category"
                    defaultValue={""}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {form.category_options.map((category) => (
                      <option key={category.name} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label" htmlFor="description">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-input"
                    id="description"
                    name="description"
                    placeholder="A brief description of the resource"
                    rows={3}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;