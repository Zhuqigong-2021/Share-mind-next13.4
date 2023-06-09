"use client";
import useSWR from "swr";
import Feed from "@components/Feed";
import { useState, useEffect } from "react";
import { selectAllPosts } from "./redux/features/prompt/postSlice";
// import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/features/prompt/postSlice";
import { ToastContainer } from "react-toastify";
import SkeletonCardList from "@components/skeleton/SkeletonCardList";
import SkeletonHero from "@components/skeleton/SkeletonHero";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/prompt", fetcher);
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // const fetchPosts = async () => {
  //   const response = await fetch("/api/prompt", { cache: "no-store" });
  //   const data = await response.json();
  //   setAllPosts(data);
  // };

  // console.log("data:", data);
  useEffect(() => {
    // fetchPosts();
    // setAllPosts([data]);

    // dispatch(fetchPosts());

    // if (posts.length !== 0) setAllPosts(data);
    if (data) {
      setAllPosts(data);
    }
  }, [data]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="w-full flex-center flex-col  ">
      {allPosts?.length == 0 ? (
        <SkeletonHero />
      ) : (
        <div className="background-video absolute top-0 left-0 right-0 sm:pt-0 md:pt-36  z-[10] flex-center flex-col ">
          <div className="video-wrapper ">
            <video
              autoPlay
              loop
              muted
              className="z-[-1]"
              // className="w-[100vw]  z-[-1] top-0 bottom-10 overflow-hidden "
            >
              <source src="/assets/videos/particle.mp4" type="video/mp4" />
            </video>
          </div>
          <h1 className="head_text text-center scale-50 md:scale-100 lg:scale-100 mb-0 pb-0 flex-wrap ">
            {/* text-2xl mb-0 sm:text-5xl md:text-5xl */}
            <span className=" textshadow text-center  ">Explore & Share</span>
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center min-w-[300px] ">
              {" "}
              AI-Generated Idea
            </span>
          </h1>
          <p className="desc text-center">
            {/* ShareMind is an open-source AI prompting tool for modern world to
              discover, create and share creative prompts */}
            ShareMind, an open-source AI tool, invigorates the discovery,
            creation, and exchange of creative prompts
          </p>

          <form className="relative sm:w-1/3 w-full translate-y-[-20px] md:translate-y-0 lg:translate-y-0 scale-75  md:scale-100 md:mt-5 lg:scale-100 lg:mt-5 px-4 ">
            <input
              type="text"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={handleSearchChange}
              required
              className="search_input peer "
            />
          </form>
        </div>
      )}

      {allPosts?.length == 0 ? (
        <SkeletonCardList />
      ) : (
        <Feed
          searchText={searchText}
          searchedResults={searchedResults}
          allPosts={allPosts}
          handleTagClick={handleTagClick}
          setAllPosts={setAllPosts}
        />
      )}

      <ToastContainer />
    </section>
  );
};

export default Home;
