import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

export type TAddWordCartProps = {
  append?: any;
};

const AddWordCart: React.FC<TAddWordCartProps> = React.memo(({ append }) => {
  return (
    <article className="wordCartContainer wordCartContainer__addWordCartContainer">
      <div
        className="wordCartContainer__addWordCart"
        onClick={() => {
          append({ wordId: uuidv4() });
        }}
      >
        <AiOutlinePlus />
        <h2>Add Word Cart</h2>
      </div>
    </article>
  );
});

export default AddWordCart;
