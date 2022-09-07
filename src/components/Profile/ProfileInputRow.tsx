import React from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { IUpdateProfileFields } from "../../pages/dashboard/Profile";

type TProfileInputRow = {
  disabled?: boolean;
  defaultValue?: string;
  id: string;
  label: string;
  errorMsg?: string;
  type: string;
  icon: JSX.Element;
  register: UseFormRegister<IUpdateProfileFields>;
  errors: FieldErrorsImpl<DeepRequired<IUpdateProfileFields>>;
  name: "newUsername" | "newEmail";
  rules: RegisterOptions;
};

const ProfileInputRow: React.FC<TProfileInputRow> = ({
  id,
  disabled,
  label,
  type,
  icon,
  register,
  errors,
  errorMsg,
  name,
  rules,
  defaultValue,
}) => {
  return (
    <div className="settingsBlock">
      <label htmlFor={id}>{label}</label>
      <div className="settingsBlock__input">
        <input
          disabled={disabled}
          className="input input__updateProfile"
          type={type}
          id={id}
          defaultValue={defaultValue}
          {...(register && register(name, rules))}
        />
        <h6
          className={
            errors && errorMsg
              ? "errorUpdateMsg errorUpdateMsg__active"
              : "errorUpdateMsg errorUpdateMsg__passive"
          }
        >
          {errorMsg}
        </h6>
        <span className="updateProfileIcons">{icon}</span>
      </div>
    </div>
  );
};

export default ProfileInputRow;
