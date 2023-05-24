import React from "react";
import SkeletonPost from "./SkeletonPost";

import SkeletonProfileCard from "./SkeletonProfileCard";

const SkeletonPofilePage = () => {
  return (
    <div className="mt-6">
      <SkeletonPost />
      <SkeletonProfileCard />
    </div>
  );
};

export default SkeletonPofilePage;
