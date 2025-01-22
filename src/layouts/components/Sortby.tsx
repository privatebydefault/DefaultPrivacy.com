"use client";

import { useGeneralStateContext } from "@/context/GeneralStateProvider";

const Sortby = () => {
  const { sortBy, setSortBy } = useGeneralStateContext();

  const options = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <select
      aria-label="Sort by"
      onChange={handleChange}
      className="bg-theme-light text-text py-1 rounded-md border-border/10"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} label={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Sortby;
