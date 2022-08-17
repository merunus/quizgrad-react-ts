import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { deleteWord, editWord } from "../../redux/module/slice";
import { useAppDispatch } from "../../redux/store";

export type TSMWordCart = {
  word: string;
  translate: string;
  wordId?: string;
  moduleId?: string;
  isDeletable?: boolean;
  isEditable?: boolean;
};

const SMWordCart: React.FC<TSMWordCart> = ({
  word,
  translate,
  wordId,
  moduleId,
  isDeletable,
  isEditable,
}) => {
  const [isWordsEditing, setIsWordsEditing] = useState(false);
  const [wordsInputsValue, setWordsInputsValue] = useState({
    word: word,
    translate: translate,
  });
  const dispatch = useAppDispatch();

  const handleEditWord = () => {
    const { word, translate } = wordsInputsValue;
    if (word && translate && wordId && moduleId)
      dispatch(editWord({ word, translate, wordId, moduleId }));
  };

  return (
    <article className="singleModuleWordCartContainer">
      {isEditable && (
        <div className="singleModuleWordCartContainer__icons singleModuleWordCartContainer__icons__mobile">
          <span
            className={isWordsEditing ? "editWord isWordsEditing" : "editWord"}
            onClick={() => {
              console.log("hey");
              setIsWordsEditing(!isWordsEditing);
            }}
          >
            <MdModeEditOutline />
          </span>
          <span
            className={isDeletable ? "deleteWord" : "deleteWord notDeletable"}
            onClick={() => {
              console.log("hey");
              if (wordId && moduleId) {
                dispatch(deleteWord({ moduleId, wordId }));
              }
            }}
          >
            <AiFillDelete />
          </span>
        </div>
      )}

      <div className="singleModuleWordCartContainer__word">
        {!isWordsEditing ? (
          <>
            <p>Word</p>
            <h4>{word}</h4>
          </>
        ) : (
          <>
            <p>Word</p>
            <input
              onChange={(e) => {
                setWordsInputsValue((prevValue) => {
                  return { ...prevValue, word: e.target.value };
                });
              }}
              className="input input__createModule"
              type="text"
              defaultValue={wordsInputsValue?.word}
            />
          </>
        )}
      </div>
      <div className="singleModuleWordCartContainer__translate">
        {!isWordsEditing ? (
          <>
            <p>Translate</p>
            <h4>{translate}</h4>
          </>
        ) : (
          <>
            <p>Translate</p>
            <input
              onChange={(e) => {
                setWordsInputsValue((prevValue) => {
                  return { ...prevValue, translate: e.target.value };
                });
              }}
              className="input input__createModule"
              type="text"
              defaultValue={wordsInputsValue?.translate}
            />
          </>
        )}
      </div>

      <div>
        {isEditable && (
          <div className="singleModuleWordCartContainer__icons">
            <span className={isWordsEditing ? "isWordsEditing" : ""}>
              <MdModeEditOutline
                onClick={() => {
                  setIsWordsEditing(!isWordsEditing);
                }}
              />
            </span>
            <AiFillDelete
              className={isDeletable ? "" : "notDeletable"}
              onClick={() => {
                if (wordId && moduleId) {
                  dispatch(deleteWord({ moduleId, wordId }));
                }
              }}
            />
          </div>
        )}
      </div>
      {isWordsEditing && (
        <div className="singleModuleWordCartContainer__edit">
          <button
            onClick={handleEditWord}
            className="button button--DeleteAllCarts button--editSingleWord"
          >
            Edit
          </button>
        </div>
      )}
    </article>
  );
};

export default SMWordCart;
