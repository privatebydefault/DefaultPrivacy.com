import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import HomepageBanner from "@/partials/HomepageBanner";
import SeoMeta from "@/partials/SeoMeta";
import Showcase from "@/partials/Showcase";
import { Button, CategoryTypes, ResourceTypes } from "@/types";
const { resources_folder, categories_folder } = config.settings;

const Home = () => {
  // --------- SERVER SIDE ---------
  const homepage = getListPage("homepage/_index.md");
  const posts: ResourceTypes[] = getSinglePage(resources_folder);
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
  } = frontmatter;

  const categories: CategoryTypes[] = getSinglePage(categories_folder);
  // --------- SERVER SIDE ---------
  return (
    <>
      <SeoMeta />
      <HomepageBanner banner={banner} />
      <Showcase posts={posts} categories={categories} />
    </>
  );
};

export default Home;
