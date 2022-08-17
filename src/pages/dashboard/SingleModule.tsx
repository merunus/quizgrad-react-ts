import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  BottomContainer,
  HistoryChain,
  MainContainer,
  MiddleContainer,
} from "../../components/SingleModule";
import {
  HistoryChainSkeleton,
  MainContainerSkeleton,
  MiddleContainerSkeleton,
  BottomContainerSkeleton,
} from "../../components/SingleModule/skeletons";
import { selectModuleData } from "../../redux/module/selectors";
import { fetchSingleModule } from "../../redux/module/slice";
import { useAppDispatch } from "../../redux/store";

const SingleModule: React.FC = () => {
  const { module, isDeleting, isEditing, isLoading } =
    useSelector(selectModuleData);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(fetchSingleModule(id));
  }, [isDeleting, isEditing]);

  return (
    <>
      {isLoading ? (
        <>
          <HistoryChainSkeleton />
          <MainContainerSkeleton />
          <MiddleContainerSkeleton />
          <BottomContainerSkeleton />
        </>
      ) : (
        <>
          <HistoryChain title={module?.title} language={module?.language} />
          <MainContainer {...module} />
          <MiddleContainer {...module} moduleCreator={module?.user} />
          <BottomContainer
            moduleId={id}
            {...module}
            moduleCreator={module?.user}
          />
        </>
      )}
    </>
  );
};

export default SingleModule;
