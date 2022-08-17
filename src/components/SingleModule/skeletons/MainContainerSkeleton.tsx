import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const MainContainerSkeleton: React.FC = () => {
  return (
    <section className="singleModuleMainContainer">
      <header className="singleModuleMainContainer__header">
        <div
          style={{
            borderBottom: "0.0625rem solid #d8dee6",
            paddingBottom: "20px",
          }}
        >
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton width={"150px"} height={41} />
          </SkeletonTheme>
        </div>
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
          <Skeleton
            style={{ marginTop: "20px", marginBottom: "30px" }}
            width={"260px"}
            height={41}
          />
        </SkeletonTheme>
      </header>
      <div className="wordsSliderContainerWrapper">
        <div className="testsCardsContainer hideSkeleton">
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              style={{ marginBottom: "20px" }}
              width={"350px"}
              height={90}
            />
          </SkeletonTheme>
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              className="hideSkeleton"
              style={{ marginBottom: "20px" }}
              width={"350px"}
              height={90}
            />
          </SkeletonTheme>
        </div>
        <div className="wordsSliderContainer">
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton width={"700"} height={400} />
          </SkeletonTheme>
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              style={{ marginTop: "15px", marginBottom: "40px" }}
              width={"100"}
              height={21}
            />
          </SkeletonTheme>
        </div>
        <div className="testsCardsContainer showSkeleton">
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              className="fullWidthSkeleton"
              style={{ marginBottom: "20px" }}
              width={"350px"}
              height={90}
            />
          </SkeletonTheme>
          <SkeletonTheme baseColor="#e2e2e2" highlightColor="#f6f4f4">
            <Skeleton
              className="fullWidthSkeleton"
              width={"350px"}
              height={90}
            />
          </SkeletonTheme>
        </div>
      </div>
    </section>
  );
};

export default MainContainerSkeleton;
