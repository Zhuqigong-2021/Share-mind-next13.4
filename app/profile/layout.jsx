"use client";
import ProfileNav from "@components/ProfileNav";

import SkeletonPost from "@components/skeleton/SkeletonPost";
import SkeletonProfileCard from "@components/skeleton/SkeletonProfileCard";
import "@styles/globals.css";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Promptopia",
//   description: "Discover & Share AI Prompts",
// };

const profileLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);
  return (
    <div className="absolute top-24">
      {/* {isLoading ? <SkeletonPost /> : <ProfileNav />} */}
      {children}
    </div>
  );
};

export default profileLayout;
