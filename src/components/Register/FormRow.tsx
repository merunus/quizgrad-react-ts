import React, { useState } from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { IFields } from "../../pages/Register";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type FormProps = {
  type: string;
  placeholder: string;
  icon: JSX.Element;
  register: UseFormRegister<IFields>;
  errors: FieldErrorsImpl<DeepRequired<IFields>>;
  error?: FieldError;
  name: Path<IFields>;
  rules: RegisterOptions;
  isPassword?: boolean;
};

const FormRow: React.FC<FormProps> = ({
  type,
  placeholder,
  icon,
  register,
  name,
  rules,
  error,
  isPassword,
}) => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [passType, setPassType] = useState("password");
  const handlePasswordEye = () => {
    setEyeOpen(!eyeOpen);
    setPassType(!eyeOpen ? "text" : "password");
  };

  return (
    <div className="row">
      <input
        {...(register && register(name, rules))}
        className="input input__register"
        type={isPassword ? passType : type}
        placeholder={placeholder}
        autoComplete="off"
      />
      <span className="input__icon">{icon}</span>
      <h6
        className={
          error && error?.message
            ? "errorMsg errorMsg__active"
            : "errorMsg errorMsg__passive"
        }
      >
        {error?.message}
      </h6>
      {type === "password" && (
        <span>
          <button
            onClick={handlePasswordEye}
            className="input__eye"
            type="button"
          >
            {eyeOpen ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </span>
      )}
    </div>
  );
};

export default FormRow;
