import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { CategoryTypes, ResourceTypes } from "@/types";
import SidebarDrawerMenuClientComponent from "./SidebarDrawerMenuClientComponent";
const { resources_folder, categories_folder } = config.settings;

const SidebarDrawerMenu = () => {
  const posts: ResourceTypes[] = getSinglePage(resources_folder);
  const categories: CategoryTypes[] = getSinglePage(categories_folder);

  return (
    <SidebarDrawerMenuClientComponent posts={posts} categories={categories} />
  );
};

export default SidebarDrawerMenu;
