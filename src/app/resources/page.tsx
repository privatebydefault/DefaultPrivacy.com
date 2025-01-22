import { redirect } from "next/navigation";

const page = () => {
  redirect(`/`); // Navigate to the new post page
  return null;
};

export default page;
