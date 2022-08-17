import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IModuleCreationFields } from "../../pages/dashboard/CreateModule";

export type TWordCartProps = {
  register?: UseFormRegister<IModuleCreationFields>;
  index?: any;
  remove?: any;
  word?: string;
  translate?: string;
};

export type TWord = {
  word: string;
  translate: string;
  wordId?: string;
  moduleId?: string;
};

const WordCart: React.FC<TWordCartProps> = ({
  index,
  remove,
  register,
  word,
  translate,
}: TWordCartProps) => {
  const removeCart = (index: number) => {
    return (event: React.MouseEvent) => {
      remove(index);
      event.preventDefault();
    };
  };

  return (
    <article className="wordCartContainer">
      <header className="wordCartContainer__header">
        <p>Word Cart</p>
        <RiDeleteBin7Line onClick={removeCart(index)} />
      </header>
      <div className="inputsContainer">
        <div className="inputsContainer__inputBlock">
          <input
            autoComplete="off"
            {...(register && register(`words.${index}.word` as const))}
            type="text"
            id="word"
            defaultValue={word ? word : ""}
            className="input input__inputWords"
          />
          <label htmlFor="word">Word</label>
        </div>
        <div className="inputsContainer__inputBlock">
          <input
            {...(register && register(`words.${index}.translate` as const))}
            type="text"
            id="translate"
            className="input
          input__inputWords"
            defaultValue={translate ? translate : ""}
            autoComplete="off"
          />
          <label htmlFor="translate">Definiton</label>
        </div>
      </div>
    </article>
  );
};

export default WordCart;
