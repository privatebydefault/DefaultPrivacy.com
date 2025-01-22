import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";

const { contact_email } = config.params;

interface pageIndexProps {
  frontmatter: {
    title: string;
    meta_title: string;
    description: string;
    image: string;
    form: {
      title: string;
    };
  };
}

const Contact = () => {
  const data: pageIndexProps = getListPage("contact/_index.md");
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
                action={`https://formsubmit.co/${contact_email}`}
                method="post"
                className="space-y-4"
              >
                <div>
                  <label className="form-label" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-input"
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;