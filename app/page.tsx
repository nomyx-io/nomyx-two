import Home from "./home";

import { getFeaturedBlogs } from "@/lib/blogs";

export default async function Page() {
  const featuredBlogs = await getFeaturedBlogs(3);

  return <Home featuredBlogs={featuredBlogs} />;
}
