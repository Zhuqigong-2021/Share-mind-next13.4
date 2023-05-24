import PromptCard from "./PromptCard";

import ProfileNav from "./ProfileNav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [user, setUser] = useState("");
  const pathName = usePathname();
  const userId = pathName.split("/")[2];

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(`api/users/${userId}`);
  //       if (response.ok) {
  //         const currentUser = await response.json();
  //         console.log("this is current user" + currentUser);
  //         return currentUser;
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <section className="w-full max-w-7xl  ">
      <ProfileNav post={data[0]} />

      <div className=" prompt_layout ">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
