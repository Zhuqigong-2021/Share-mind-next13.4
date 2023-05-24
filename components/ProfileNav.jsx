"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AiOutlineVideoCameraAdd, AiOutlineSave } from "react-icons/ai";
const ProfileNav = ({ post }) => {
  const [photo, setPhoto] = useState("");
  const [profileBackground, setProfileBackground] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  let active =
    pathName === "/profile"
      ? "text-white border-white border rounded-full py-1 px-4 text-sm font-bold"
      : pathName === "/collection"
      ? "bg-white text-dark border-white border rounded-full py-1 px-4 text-sm font-bold"
      : "";
  let inactive =
    pathName === "/profile"
      ? "bg-white text-dark border-white border rounded-full py-1 px-4 text-sm font-bold"
      : pathName === "/collection"
      ? "text-white border-white border rounded-full py-1 px-4 text-sm font-bold"
      : "";

  const UPLOAD_PRESET = "next13.4UploadAIPowerTool";
  const CLOUD_NAME = "df12mkxoo";
  const uploadImage = async () => {
    if (!photo) {
      setProfileBackground("");
      console.log("photo doesnt exisit");
      return;
    }

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await uploadImage();

    try {
      const response = await fetch(`/api/users/${session?.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          url: data,
        }),
      });

      if (response.ok) {
        console.log("successfully updated link");
        setProfileBackground(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(session);
  return (
    <div className=" w-full max-w-7xl relative py-5 px-3 rounded-t-lg  overflow-hidden  ">
      {profileBackground ? (
        <img
          src={profileBackground}
          className="absolute top-0 bottom-0 left-0 right-0 z-[-1] overflow-hidden"
        />
      ) : (
        <div className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 absolute top-0 bottom-0 left-0 right-0 z-[-1]"></div>
      )}
      <h1 className="head_text text-left">
        {session ? (
          <Image
            // src={session?.user.image}
            src={post?.creator.image ? post.creator.image : session?.user.image}
            alt="user_image"
            width={70}
            height={70}
            className="rounded-full object-contain  border-white border-2"
          />
        ) : (
          <img
            src={
              "https://i.pinimg.com/280x280_RS/77/0f/b7/770fb75f5e81e4c2dbe8934f246aeeab.jpg"
            }
            alt="user_image"
            width={70}
            height={70}
            className="rounded-full object-contain  border-white border-2"
          />
        )}
      </h1>
      <p className="text-white font-bold leading-3 mt-3">
        {/* {session?.user.name} */}
        {post?.creator.username ? post.creator.username : session?.user.name}
      </p>
      <p className="text-gray-200  leading-3 mt-3">
        {/* {session?.user.email} */}
        {post?.creator.email ? post.creator.email : session?.user.email}
      </p>

      {pathName == "/profile" || pathName == "/collection" ? (
        <nav className=" mt-10 space-x-4 z-10">
          <Link href={"/profile"}>
            <span className={active}>My profile</span>
          </Link>
          <Link href={"/collection"}>
            <span className={inactive}>My collections</span>
          </Link>
        </nav>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className="z-10">
        {session ? (
          <label htmlFor="image">
            <AiOutlineVideoCameraAdd className="absolute top-6 right-6 text-black font-bold scale-125  " />
          </label>
        ) : null}
        <input
          id="image"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        {session ? (
          <button
            type="submit"
            className="w-6 h-6 bg-green rounded-full absolute text-white bottom-2 right-2 scale-125"
          >
            <AiOutlineSave />
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ProfileNav;
