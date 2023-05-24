"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SiAbbrobotstudio } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
const Nav = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  let className;
  className = pathName === "/" ? "btn_outline" : "black_btn";
  let signOutName;
  signOutName = pathName === "/" ? "btn_cyan" : "outline_btn";
  let navName;
  navName =
    pathName === "/"
      ? "flex-between w-full mb-16 pt-3 absolute top-0  z-50 px-6  lg:px-12 "
      : "flex-between w-full mb-16 pt-3 absolute top-0  z-50 max-w-7xl px-6 sm:px-0  ";
  return (
    <nav className={navName}>
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        /> */}
        <SiAbbrobotstudio
          style={{ color: "#a78bfa" }}
          className="scale-[2] rotate mr-2 "
        />
        {/* <BsRobot style={{ color: "#a78bfa" }} className="scale-150 " /> */}
        <p
          className="logo_text "
          style={{ color: pathName === "/" ? "#a78bfa" : "" }}
        >
          *&nbsp;ShareMind
        </p>
      </Link>
      {/* mobile navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className={className}>
              Create Post
            </Link>
            <button type="button" onClick={signOut} className={signOutName}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={signOutName}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
