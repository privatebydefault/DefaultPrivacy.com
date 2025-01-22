import SidebarNavGroup from "@/components/SidebarNavGroup";
import { sortByWeight } from "@/lib/utils/sortFunctions";
import { CategoryTypes, ResourceTypes } from "@/types";

const Sidebar: React.FC<{
  handleSidebarDrawerLinkClick?: () => void;
  posts: ResourceTypes[];
  isExpanded?: boolean;
  disableMaxHeight?: boolean;
  categories: CategoryTypes[];
}> = ({
  handleSidebarDrawerLinkClick,
  posts,
  categories,
  isExpanded,
  disableMaxHeight = false,
}) => {
  const weightedCategories = sortByWeight(categories);

  return (
    <div
      className={`p-5 lg:p-6 lg:py-8 ${disableMaxHeight ? "" : "sticky custom-scrollbar"}`}
      style={{
        top: disableMaxHeight ? "" : "var(--header-height)",
        height: disableMaxHeight
          ? "height: auto"
          : "calc(100vh - var(--header-height))",
        overflowY: "auto",
      }}
    >
      <h3 className="text-[18px] text-text mb-5">
        All Resources by Categories
      </h3>

      <div className="space-y-4 lg:space-y-8">
        {weightedCategories.length > 0 &&
          weightedCategories.map((category, index) => (
            <SidebarNavGroup
              key={index}
              posts={posts}
              category={category}
              handleSidebarDrawerLinkClick={handleSidebarDrawerLinkClick}
              isExpanded={isExpanded}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
