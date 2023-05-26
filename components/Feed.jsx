"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";
import { AiFillFire } from "react-icons/ai";
import SkeletonHero from "./skeleton/SkeletonHero";
import SkeletonCardList from "./skeleton/SkeletonCardList";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = ({
  searchedResults,
  allPosts,
  handleTagClick,
  searchText,
  setAllPosts,
}) => {
  const frequency = {};

  // Step 2-3: Count the frequency of the specified tag
  allPosts?.map((item) => {
    const tag = item.tag.trim().toLowerCase();
    frequency[tag] = (frequency[tag] || 0) + 1;
  });

  // Step 4: Sort the tags based on frequency in descending order
  const sortedTags = Object.keys(frequency).sort(
    (a, b) => frequency[b] - frequency[a]
  );
  // Step 5: Retrieve the first 5 tags
  const topTags = sortedTags.slice(0, 10);

  return (
    <section className=" flex flex-col-reverse md:flex-row  mt-[500px] ">
      <>
        <div className="flex  ">
          {/* All Prompts */}
          {searchText ? (
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
          )}
        </div>

        <div className="rank_card">
          <div className="flex pt-10 mb-4 pl-4 items-center" type="button">
            {/* 🔥{" "} */}
            <AiFillFire className="text-red-500 scale-150" />
            <span className="text-red-500 font-bold text-[15px]  ">
              &nbsp;&nbsp;&nbsp;&nbsp;TOP 10
            </span>
          </div>

          <div className=" z-10 w-full p-2 list-none border-1 border-gray-500  ">
            {topTags.map((tag, i) => (
              <li key={tag} className="flex items-center mb-4 ">
                <span className="px-2  rounded-full">
                  {i == 0
                    ? "🥇"
                    : i == 1
                    ? "🥈"
                    : i == 2
                    ? "🥉"
                    : i == 3
                    ? "⭐"
                    : "⭐"}
                </span>
                &nbsp; {tag}
              </li>
            ))}
          </div>
        </div>
      </>
    </section>
  );
};

export default Feed;
