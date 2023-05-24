import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
  return (
    <div className="w-full flex-center">
      {/* <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
        
      /> */}
      {/* <Skeleton count={5} /> */}
    </div>
  );
};

export default Loading;
