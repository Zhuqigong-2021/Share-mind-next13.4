"use client";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useEffect, useState } from "react";
// import { reactionAdded } from "@app/redux/features/prompt/promptSlice";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { toast } from "react-toastify";
const ReactionButtons = ({ post }) => {
  const { data: session } = useSession();

  const [isThumbupToggle, setThumbupToggle] = useState(false);
  const [isThumbdownToggle, setThumbdownToggle] = useState(false);
  const [isHeartToggle, setHeartToggle] = useState(false);

  const [thumbupLength, setThumbupLength] = useState(post.thumbupEmail.length);
  const [thumbdownLength, setThumbdownLength] = useState(
    post.thumbdownEmail.length
  );
  const [heartLength, setHeartLength] = useState(post.heartEmail.length);

  let newThumbupArray = [];
  let newThumbdownArray = [];
  let newHeartArray = [];
  const thumbup = async () => {
    // setThumbupToggle(!isThumbupToggle);
    const userEmail = session?.user.email;

    if (post.thumbupEmail.includes(userEmail)) {
      newThumbupArray = [...post.thumbupEmail];
      let index = newThumbupArray.indexOf(userEmail);
      newThumbupArray.pop(index);
    } else {
      newThumbupArray = [...post.thumbupEmail, userEmail];
    }

    try {
      const response = await fetch(`/api/reactions/thumbup`, {
        method: "PATCH",
        body: JSON.stringify({
          id: post._id,
          thumbupEmail: newThumbupArray,
        }),
      });

      if (response.ok) {
        setThumbupToggle((prev) => !prev);
        if (isThumbupToggle) {
          setThumbupLength((prev) => prev - 1);
          toast.success("you cancel your thumbup");
        } else {
          setThumbupLength((prev) => prev + 1);
          toast.success("you thumbup this prompt");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const thumbdown = async () => {
    const userEmail = session?.user.email;

    if (post.thumbdownEmail.includes(userEmail)) {
      newThumbdownArray = [...post.thumbupEmail];
      let index = newThumbdownArray.indexOf(userEmail);
      newThumbdownArray.pop(index);
    } else {
      newThumbdownArray = [...post.thumbdownEmail, userEmail];
    }

    try {
      const response = await fetch(`/api/reactions/thumbdown`, {
        method: "PATCH",
        body: JSON.stringify({
          id: post._id,
          thumbdownEmail: newThumbdownArray,
        }),
      });

      if (response.ok) {
        setThumbdownToggle((prev) => !prev);
        if (isThumbdownToggle) {
          setThumbdownLength((prev) => prev - 1);
          toast.success("you cancel your thumbdown");
        } else {
          setThumbdownLength((prev) => prev + 1);
          toast.success("you thumbdown this prompt");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const heart = async () => {
    const userEmail = session?.user.email;

    if (post.heartEmail.includes(userEmail)) {
      newHeartArray = [...post.heartEmail];
      let index = newHeartArray.indexOf(userEmail);
      newHeartArray.pop(index);
    } else {
      newHeartArray = [...post.heartEmail, userEmail];
    }

    try {
      const response = await fetch(`/api/reactions/heart`, {
        method: "PATCH",
        body: JSON.stringify({
          id: post._id,
          heartEmail: newHeartArray,
        }),
      });

      if (response.ok) {
        console.log("heart successfully");
        setHeartToggle((prev) => !prev);
        if (isHeartToggle) {
          setHeartLength((prev) => prev - 1);
          toast.error("you remove this prompt card from your collection");
        } else {
          setHeartLength((prev) => prev + 1);
          toast.success("you add this prompt to your collection");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    let isThumbupToggle = post.thumbupEmail.includes(session?.user.email);
    let isThumbdownToggle = post.thumbdownEmail.includes(session?.user.email);
    let isHeartToggle = post.heartEmail.includes(session?.user.email);
    isThumbupToggle ? setThumbupToggle(true) : setThumbupToggle(false);
    isThumbdownToggle ? setThumbdownToggle(true) : setThumbdownToggle(false);
    isHeartToggle ? setHeartToggle(true) : setHeartToggle(false);
  }, []);

  return (
    <span className="flex space-x-3">
      <button onClick={thumbup} className="flex items-center">
        {!isThumbupToggle ? <AiOutlineLike /> : <AiFillLike />}
        {thumbupLength}{" "}
      </button>
      <button onClick={thumbdown} className="flex items-center">
        {!isThumbdownToggle ? <AiOutlineDislike /> : <AiFillDislike />}
        {thumbdownLength}
      </button>
      <button onClick={heart} className="flex items-center">
        {!isHeartToggle ? (
          <AiOutlineHeart />
        ) : (
          <AiFillHeart className="text-red-500" />
        )}
        {heartLength}
      </button>
    </span>
  );
};
export default ReactionButtons;
