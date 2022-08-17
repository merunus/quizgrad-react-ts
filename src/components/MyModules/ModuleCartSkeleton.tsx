import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ModuleCartSkeleton: React.FC = () => {
  return (
    <div className="myModuleCartSkeleton">
      <div className="myModuleCartSkeleton__column">
        <Skeleton
          style={{ borderRadius: "0", marginBottom: "0rem" }}
          width={"100%"}
          height={"24px"}
        />

        <div className="bottomCont">
          <Skeleton
            style={{
              borderRadius: "0",
              marginBottom: "1rem",
            }}
            width={100}
            height={"21px"}
            inline={true}
            containerClassName="bottomCont"
          />
          <Skeleton
            inline={true}
            style={{
              borderRadius: "0",
              marginBottom: "1rem",
            }}
            width={70}
            containerClassName="bottomCont"
            height={"21px"}
          />
        </div>
      </div>
    </div>
  );
};

export default ModuleCartSkeleton;
