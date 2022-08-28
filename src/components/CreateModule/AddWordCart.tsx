import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { TWord } from "./WordCart";

export type TAddWordCartProps = {
  append: (object: TWord) => void;
};

const AddWordCart: React.FC<TAddWordCartProps> = React.memo(({ append }) => {
  return (
    <article className="wordCartContainer wordCartContainer__addWordCartContainer">
      <div
        className="wordCartContainer__addWordCart"
        onClick={() => {
          append({ wordId: uuidv4(), word: "", translate: "" });
        }}
      >
        <AiOutlinePlus />
        <h2>Add Word Cart</h2>
      </div>
    </article>
  );
});

export default AddWordCart;
