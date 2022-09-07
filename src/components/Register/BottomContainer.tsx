import React from "react";
import { useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";

type TBottomContainerProps = {
  isValid: boolean;
  handleIsMember: () => void;
};

const BottomContainer: React.FC<TBottomContainerProps> = ({
  isValid,
  handleIsMember,
}) => {
  const { isMember, isLoading } = useAppSelector(selectUserData);

  return (
    <>
      <div className="formContainer__bottomCont">
        <button
          disabled={!isValid || isLoading}
          type="submit"
          className={
            isValid
              ? "button button--registerButton"
              : "button button--registerButton button--registerButton__disabled"
          }
        >
          {isMember ? "Login" : "Sign Up"}
        </button>
        <h3>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button disabled={isLoading} onClick={handleIsMember} type="button">
            {!isMember ? "Login" : "Sign Up"}
          </button>
        </h3>
      </div>
    </>
  );
};

export default BottomContainer;
