import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { ProfileInputRow, ProfileUserInfo } from "../../components/Profile";
import { fetchMyModules } from "../../redux/module/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { updateUser } from "../../redux/user/slice";

export interface IUpdateProfileFields {
  newUsername: string;
  newEmail: string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
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
    if (user) {
      const { _id: userId } = user;
      dispatch(updateUser({ userId, newEmail, newUsername }));
    }
  };

  useEffect(() => {
    if (user) dispatch(fetchMyModules(user._id));
  }, [dispatch, user, user?._id]);
  return (
    <section className="profileContainer">
      <div className="profileContainer__settings">
        <header>
          <h4>Profile Settings</h4>
        </header>
        <div>
          <form onSubmit={handleSubmit(submitUpdateProfile)}>
            <ProfileInputRow
              label="User Name"
              register={register}
              errors={errors}
              rules={{ required: "You must enter your username" }}
              icon={<AiOutlineUser />}
              type="text"
              errorMsg={errors.newUsername?.message}
              id="newEmail"
              name="newUsername"
              defaultValue={user?.userName}
            />
            <ProfileInputRow
              disabled = {user?.googleAuth}
              label="E-Mail"
              register={register}
              errors={errors}
              rules={{ required: "You must enter your email" }}
              icon={<AiOutlineMail />}
              type="text"
              errorMsg={errors.newEmail?.message}
              id="newEmail"
              name="newEmail"
              defaultValue={user?.email}
            />

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
      <ProfileUserInfo />
    </section>
  );
};

export default Profile;
