import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { IoSearch } from "react-icons/io5";

const HomepageBanner: React.FC<{ banner: any }> = ({ banner }) => {
  const isSearchEnabled = config.settings.search;
  return (
    <section className="section py-14 lg:py-28 bg-gradient-to-b from-primary/25 via-primary/5 to-body">
      <div className="container">
        <div className="lg:col-10 mx-auto text-center">
          <h1
            className="mb-2 text-h2 lg:text-h1 xl:text-[4.5rem] font-extrabold gradient-text"
            dangerouslySetInnerHTML={markdownify(banner.title)}
          />
          <p className="font-normal text-h6 text-text mb-14">
            {banner.content}
          </p>

          {isSearchEnabled && (
            <div className="flex justify-center">
              <button
                aria-label="search"
                data-search-trigger
                className="bg-theme-light border-white h-14 rounded-full px-6 flex items-center gap-5 pr-20 w-3/4 sm:w-2/3 lg:w-1/2"
              >
                <IoSearch size={22} />
                <span className="text-lg font-medium">Search ...</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageBanner;
