import React, { useEffect } from "react";
import { FormRow, Logo } from "../components";
import sideImage from "../assets/images/reg-image.svg";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectUserData } from "../redux/user/selectors";
import {
  fetchGoogleAuth,
  fetchLogin,
  fetchRegister,
  toggleIsMember,
} from "../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../models/routes";
import { BottomContainer } from "../components/Register";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export interface IFields {
  userName: string;
  email: string;
  password: string;
}

export type TGoogleResponse = {
  aud?: string;
  azp?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  name?: string;
  nbf?: number;
  picture?: string;
  sub?: string;
};

const Register: React.FC = () => {
  const { isMember, user } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFields>({
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(Endpoints.Home);
      }, 1500);
    }
  }, [navigate, user]);

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

  const handleCredentials = (response: CredentialResponse) => {
    if (response.credential) {
      const decoded: { name: string; email: string; sub: string } = jwt_decode(
        response.credential
      );
      if (decoded) {
        const { email, name, sub } = decoded;
        dispatch(fetchGoogleAuth({ email, userName: name, id: sub }));
      }
    }
  };

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <div className="formContainer__title">
          <Logo />
          <p>
            Welcome back! <br />
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
          <BottomContainer handleIsMember={handleIsMember} isValid={isValid} />
          <div className="formContainer__googleBlock">
            <GoogleLogin
              size="large"
              onSuccess={(credentialResponse: CredentialResponse) =>
                handleCredentials(credentialResponse)
              }
              onError={() => {
                toast("Login Failed", {
                  autoClose: 1000,
                  type: "error",
                });
              }}
            />
          </div>
        </form>
      </div>
      <div className="imgContainer">
        <img src={sideImage} alt="side-vector" />
      </div>
    </div>
  );
};

export default Register;
