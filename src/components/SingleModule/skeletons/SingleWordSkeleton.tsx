import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleWordSkeleton: React.FC = () => {
  return (
    <article className="singleModuleWordCartContainer">
      <div className="singleModuleWordCartContainer__word">
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton width={75} height={20} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton width={150} height={20} />
        </SkeletonTheme>
      </div>
      <div className="singleModuleWordCartContainer__translate">
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton style={{ marginTop: "5.5px" }} width={75} height={20} />
        </SkeletonTheme>
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton style={{ marginTop: "5.5px" }} width={150} height={20} />
        </SkeletonTheme>
      </div>

      <div>
        <div className="singleModuleWordCartContainer__icons">
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton inline width={25} height={25} />
          </SkeletonTheme>
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              style={{ marginLeft: "20px", marginRight: "5px" }}
              inline
              width={25}
              height={25}
            />
          </SkeletonTheme>
        </div>
      </div>

      <div className="singleModuleWordCartContainer__edit"></div>
    </article>
  );
};

export default SingleWordSkeleton;
