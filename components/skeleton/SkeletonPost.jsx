import Skeleton from "./Skeleton";
const SkeletonPost = () => {
  return (
    <div className="post border border-gray-300 p-4 h-56 overflow-hidden">
      <Skeleton classes="skeleton image" />
      <Skeleton classes="title width-10" />
      <Skeleton classes="text width-25" />
      <div className="flex space-x-4">
        <Skeleton classes="title width-10" />
        <Skeleton classes="title width-10" />
      </div>

      {/* <Skeleton classes="text width-100" /> */}
    </div>
  );
};
export default SkeletonPost;
