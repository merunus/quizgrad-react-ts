import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { selectModuleData } from "../../redux/module/selectors";
import { fetchMyModules } from "../../redux/module/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { updateUser } from "../../redux/user/slice";

interface IUpdateProfileFields {
  newUsername: string;
  newEmail: string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const { totalMyModules, myModules } = useAppSelector(selectModuleData);

  const wordsAmount = useMemo(
    () =>
      myModules.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.words.length;
      }, 0),
    [myModules]
  );

  const { user } = useAppSelector(selectUserData);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUpdateProfileFields>({
    mode: "onChange",
  });

  const submitUpdateProfile: SubmitHandler<IUpdateProfileFields> = (
    data: IUpdateProfileFields
  ) => {
    const { newUsername, newEmail } = data;
    const { _id: userId } = user;
    dispatch(updateUser({ userId, newEmail, newUsername }));
  };

  useEffect(() => {
    dispatch(fetchMyModules(user._id));
  }, [dispatch, user._id]);
  return (
    <section className="profileContainer">
      <div className="profileContainer__settings">
        <header>
          <h4>Profile Settings</h4>
        </header>
        <div>
          <form onSubmit={handleSubmit(submitUpdateProfile)}>
            <div className="settingsBlock">
              <label htmlFor="newUsername">User Name</label>
              <div className="settingsBlock__input">
                <input
                  className="input input__updateProfile"
                  type="text"
                  id="newUsername"
                  defaultValue={user.userName}
                  {...register("newUsername", {
                    required: "You must enter your email",
                  })}
                />
                <h6
                  className={
                    errors && errors?.newUsername?.message
                      ? "errorUpdateMsg errorUpdateMsg__active"
                      : "errorUpdateMsg errorUpdateMsg__passive"
                  }
                >
                  {errors?.newUsername?.message}
                </h6>
                <AiOutlineUser className="updateProfileIcons" />
              </div>
            </div>
            <div className="settingsBlock">
              <label htmlFor="newEmail">E-Mail</label>
              <div className="settingsBlock__input">
                <input
                  defaultValue={user.email}
                  className="input input__updateProfile"
                  type="text"
                  id="newEmail"
                  {...register("newEmail", {
                    required: "You must enter your email",
                  })}
                />
                <h6
                  className={
                    errors && errors?.newEmail?.message
                      ? "errorUpdateMsg errorUpdateMsg__active"
                      : "errorUpdateMsg errorUpdateMsg__passive"
                  }
                >
                  {errors?.newEmail?.message}
                </h6>
                <AiOutlineMail className="updateProfileIcons" />
              </div>
            </div>
            <button
              disabled={!isDirty}
              className={
                "button button--createFormBtnBottom button--updateProfileBtn"
              }
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
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
            <span> {new Date(user.createdAt).toString().slice(0, 16)}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
