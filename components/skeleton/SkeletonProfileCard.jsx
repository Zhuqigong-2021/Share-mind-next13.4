import React from "react";

const SkeletonProfileCard = () => {
  return (
    <div className=" flex flex-col-reverse md:flex-row md:justify-center space-x-6">
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
    </div>
  );
};

export default SkeletonProfileCard;
