import React, { useMemo } from "react";
import { selectModuleData } from "../../redux/module/selectors";
import { useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";

const ProfileUserInfo: React.FC = () => {
  const { totalMyModules, myModules } = useAppSelector(selectModuleData);
  const { user } = useAppSelector(selectUserData);

  const wordsAmount = useMemo(
    () =>
      myModules.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.words.length;
      }, 0),
    [myModules]
  );

  return (
    <div className="profileContainer__userInfo">
      <header>
        <h4>User Information</h4>
      </header>
      <div className="profileContainer__userInfo__info">
        <p>
          Total modules : <span>{totalMyModules}</span>
        </p>
        <p>
          Total words created : <span>{wordsAmount}</span>
        </p>
        <p>
          Account created at :
          <span>
           
            {user && new Date(user.createdAt).toString().slice(0, 16)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
