import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section className="bg-gradient-to-b from-primary/25 via-primary/5 to-body mb-28">
      <div className="container text-center">
        <div className="rounded-2xl px-8 py-28  ">
          <h1 className="gradient-text">{humanize(title)}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
