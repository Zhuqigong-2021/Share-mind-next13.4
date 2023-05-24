import Skeleton from "./Skeleton";
const SkeletonProfile = () => {
  return (
    <div className="hero h-[250px] bg-violet-300 mx-auto flex flex-col justify-end items-center py-5 w-[800px]  max-w-7xl   ">
      <Skeleton classes="title width-25 height-30 " />
      <Skeleton classes="title width-33 height-30" />
      <Skeleton classes="text width-40" />
      <Skeleton classes="text width-33" />
      <Skeleton classes="title width-33 height-30" />
    </div>
  );
};

export default SkeletonProfile;
