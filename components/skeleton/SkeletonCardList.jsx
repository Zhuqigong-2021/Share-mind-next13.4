import React from "react";

const SkeletonCardList = () => {
  return (
    <div className="mt-[565px] flex flex-col-reverse md:flex-row md:justify-center space-x-6">
      <div className="flex mx-auto">
        <div className="prompt_layout">
          {[...new Array(9)].map((p, index) => (
            <article key={index} className="prompt_card">
              <div className="skeleton-img skeleton-card-img "></div>
              <div className="skeleton-card-text">
                <h2 className="skeleton skeleton-card-title"></h2>
                {/* <h4 className="skeleton skeleton-card-brand"></h4> */}
                <p className="skeleton skeleton-card-description"></p>
                <p className="skeleton skeleton-card-description"></p>
                <p className="skeleton skeleton-card-description"></p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px 0",
                  }}
                >
                  <p className="skeleton skeleton-card-price"></p>
                  <p className="skeleton skeleton-card-rating"></p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="skeleton-rank-card flex flex-col h-20 w-40  ">
        <h1 className="skeleton skeleton-top">
          <span className="skeleton skeleton-card-rating h-5"></span>
        </h1>
        <div className="flex flex-col ">
          {[...new Array(9)].map((p, index) => (
            // <article className="skeleton_rank_card">
            <h4 key={index} className="skeleton skeleton-card-description"></h4>
            // </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardList;
