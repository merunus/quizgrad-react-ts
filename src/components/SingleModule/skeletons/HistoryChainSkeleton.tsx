import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HistoryChainSkeleton: React.FC = () => {
  return (
    <section className="historyChainContainer">
      <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
        <Skeleton width={"250px"} height={20} />
      </SkeletonTheme>
    </section>
  );
};

export default HistoryChainSkeleton;
