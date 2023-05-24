import Skeleton from "./Skeleton";
// import Skeleton from "react-loading-skeleton";
const SkeletonHero = () => {
  return (
    <div className="hero h-[450px] bg-violet-300 mx-auto flex flex-col justify-end items-center py-5 w-full absolute top-0 left-0 right-0  ">
      <Skeleton classes="title width-25 height-30 " />
      <Skeleton classes="title width-33 height-30" />
      <Skeleton classes="text width-40" />
      <Skeleton classes="text width-33" />
      <Skeleton classes="title width-33 height-30" />
    </div>
  );
};
export default SkeletonHero;
