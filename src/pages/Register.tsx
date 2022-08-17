import React, { useEffect } from "react";
import { Logo, FormRow } from "../components";
import sideImage from "../assets/images/regImage.svg";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
import { fetchLogin, fetchRegister, toggleIsMember } from "../redux/user/slice";
import { useNavigate } from "react-router-dom";

export interface IFields {
  userName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { isMember, user, isLoading } = useSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFields>({
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [user]);

  const handleIsMember = () => {
    dispatch(toggleIsMember());
  };

  const onSubmit: SubmitHandler<IFields> = (data: IFields) => {
    const { userName, password, email } = data;
    if (isMember) {
      dispatch(fetchLogin({ password, email }));
    }
    if (!isMember) {
      dispatch(fetchRegister({ userName, password, email }));
    }
  };

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <div className="formContainer__title">
          <Logo />
          <p>
            Welcome back! <br />{" "}
            {isMember
              ? "Please Login to your account."
              : "Please Register your account."}
          </p>
        </div>
        <form className="formContainer__form" onSubmit={handleSubmit(onSubmit)}>
          {!isMember && (
            <FormRow
              type="text"
              placeholder="User Name"
              icon={<BsFillPersonFill />}
              register={register}
              errors={errors}
              name="userName"
              error={errors.userName}
              rules={{ required: "You must enter your user name" }}
            />
          )}
          <FormRow
            type="text"
            placeholder="E-Mail"
            error={errors.email}
            icon={<MdEmail />}
            register={register}
            errors={errors}
            name="email"
            rules={{ required: "You must enter your email" }}
          />
          <FormRow
            error={errors.password}
            type="password"
            placeholder="Password"
            icon={<FaKey />}
            register={register}
            errors={errors}
            name="password"
            isPassword={true}
            rules={{ required: "You must enter your password" }}
          />

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
              {isMember ? "Login" : "Signup"}
            </button>
            <h3>
              {isMember ? "Not a member yet?" : "Already a member?"}
              <button
                disabled={isLoading}
                onClick={handleIsMember}
                type="button"
              >
                {!isMember ? "Login" : "Signup"}
              </button>
            </h3>
          </div>
        </form>
      </div>
      <div className="imgContainer">
        <img src={sideImage} alt="" />
      </div>
    </div>
  );
};

export default Register;