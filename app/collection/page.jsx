"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import PromptCard from "@components/PromptCard";
import SkeletonProfileCard from "@components/skeleton/SkeletonProfileCard";
import SkeletonPost from "@components/skeleton/SkeletonPost";
import ProfileNav from "@components/ProfileNav";
import SkeletonPofilePage from "@components/skeleton/SkeletonPofilePage";
const page = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { data: session } = useSession();
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { cache: "no-store" });
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  let content;
  content = allPosts
    .filter((post) => post.heartEmail.includes(session?.user.email))
    .map((post) => <PromptCard post={post} />);

  return (
    // <div className="w-full max-w-7xl mt-24">
    //   {allPosts.length == 0 ? <SkeletonPost /> : <ProfileNav />}
    //   {allPosts.length == 0 ? (
    //     <SkeletonProfileCard />
    //   ) : (
    //     <div className=" prompt_layout">{content}</div>
    //   )}
    // </div>
    allPosts.length == 0 ? (
      <div className="mt-20">
        <SkeletonPofilePage />
      </div>
    ) : (
      <div className="w-full max-w-6xl mt-24">
        <ProfileNav />
        <div className=" prompt_layout">{content}</div>
      </div>
    )
  );
};

export default page;
