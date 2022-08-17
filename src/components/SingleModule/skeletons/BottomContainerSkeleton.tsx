import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const BottomContainerSkeleton: React.FC = () => {
  return (
    <section className="singleModuleBottomContainer">
      <header className="singleModuleBottomContainer__header">
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton width={"225px"} height={32} />
        </SkeletonTheme>
      </header>
      <div className="wordsListContainer"></div>
    </section>
  );
};

export default BottomContainerSkeleton;
