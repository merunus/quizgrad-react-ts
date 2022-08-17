import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MiddleContainerSkeleton: React.FC = () => {
  return (
    <section className="singleModuleMiddleContainer">
      <div className="singleModuleMiddleContainer__infoWrapper">
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton
            style={{ borderRadius: "50%" }}
            width={"38.75px"}
            height={38.75}
          />
        </SkeletonTheme>
        <div className="singleModuleMiddleContainer__infoCont">
          <div className="singleModuleMiddleContainer__info">
            <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
              <Skeleton
                style={{ marginLeft: "10px" }}
                width={"120px"}
                height={20}
              />
            </SkeletonTheme>
          </div>
          <div className="singleModuleMiddleContainer__info">
            <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
              <Skeleton
                style={{ marginLeft: "10px" }}
                width={"150px"}
                height={20}
              />
            </SkeletonTheme>
          </div>
        </div>
      </div>
      <div className="singleModuleMiddleContainer__buttons">
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton width={"186px"} height={46} />
        </SkeletonTheme>
      </div>
    </section>
  );
};

export default MiddleContainerSkeleton;
