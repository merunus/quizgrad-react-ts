import React, { useEffect, useRef } from "react";
import { WordCart, AddWordCart } from "../../components/CreateModule";
import { useFieldArray, useForm } from "react-hook-form";
import { TWord } from "../../redux/module/types";
import { v4 as uuidv4 } from "uuid";
import { FiDelete } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import customAxios from "../../utils/customAxios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { fetchSingleModule } from "../../redux/module/slice";
import { useSelector } from "react-redux";
import { selectModuleData } from "../../redux/module/selectors";
import { BsArrowLeftShort } from "react-icons/bs";
export interface IModuleCreationFields {
  title: string;
  language: string;
  words?: TWord[];
}

const CreateModule: React.FC = () => {
  const { module } = useSelector(selectModuleData);
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams();
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    title: yup.string().max(40).required(),
    language: yup.string().max(20).required(),
    words: yup
      .array()
      .min(2)
      .of(
        yup.object().shape({
          word: yup.string().required(),
          translate: yup.string().required(),
        })
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setFocus,
    setValue,
    formState: { errors, isValid },
  } = useForm<IModuleCreationFields>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<
    IModuleCreationFields,
    "words",
    "wordId"
  >({
    control,
    name: "words",
    keyName: "wordId",
  });

  const submitModule = async (fields: IModuleCreationFields) => {
    const { title, language, words } = fields;
    title.trim();
    language.trim();
    words?.forEach((item) => {
      item.translate.trim();
      item.word.trim();
    });
    if (!paramId) {
      try {
        const { data } = await customAxios.post("/modules/create", fields);
        toast("Module was successfully created!", {
          type: "success",
          autoClose: 1000,
        });
        const _id = data._id;
        navigate(`/module/${_id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await customAxios.patch(`/modules/update/${paramId}`, fields);
        toast("Module was successfully edited!", {
          type: "success",
          autoClose: 1000,
        });

        navigate(`/module/${paramId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFocus("title");
    }, 10);
  }, []);

  useEffect(() => {
    paramId && dispatch(fetchSingleModule(paramId));
    if (paramId) {
      setValue("title", module?.title);
      setValue("language", module?.language);
      module?.words?.map((item: TWord) => {
        const wordItem = {
          wordId: item.wordId,
          word: item.word,
          translate: item.translate,
        };
        prepend(wordItem);
      });
    }
  }, []);

  useEffect(() => {
    if (isMounted && !paramId) {
      const appendFirstTwoCarts = () => {
        append({ wordId: uuidv4(), word: "", translate: "" });
        append({ wordId: uuidv4(), word: "", translate: "" });
      };
      appendFirstTwoCarts();
    }
    isMounted.current = true;
  }, []);

  return (
    <>
      <section className="createFormContainer">
        <header className="createFormContainer__header">
          {paramId ? (
            <button
              onClick={() => navigate(-1)}
              className="button button--backToModule"
            >
              <BsArrowLeftShort />
              Back to module
            </button>
          ) : (
            <h1>Create new learning module</h1>
          )}

          <button
            form="module-form"
            className="button button--createFormBtn"
            type="submit"
          >
            {paramId ? "Edit" : "Create"}
          </button>
        </header>
        <form
          id="module-form"
          onSubmit={handleSubmit(submitModule)}
          className="createFormContainer__formContainer"
        >
          {/* Title/Language Forms */}

          <input
            {...register("title", { required: true })}
            onBlur={(e: any) => setValue("title", e.target.value.trim())}
            className="input input__createModule"
            type="text"
            name="title"
            id="title"
            placeholder='Enter name, for example, "Italian adjectives"'
          />
          <label htmlFor="title">Title</label>
          <input
            {...register("language", { required: true })}
            className="input input__createModule"
            type="text"
            id="language"
            onBlur={(e: any) => setValue("language", e.target.value.trim())}
            placeholder="Enter language, for example, Italian"
            autoComplete="off"
          />
          <label htmlFor="title">Language</label>

          {/* Error Handling */}
          <div
            className={
              errors.title
                ? "error error__active"
                : errors.language
                ? "error error__active"
                : errors.words
                ? "error error__active"
                : "error"
            }
          >
            <h4>
              You need to provide at least 2 filled <span>word carts</span>,
              <br />
              <span>title</span> and <span>language</span> of module
            </h4>
          </div>

          {/* Words Forms */}

          <section className="createWordsContainer">
            <div className="createWordsContainer__wordsHeader">
              <h1>Add words to module</h1>
              <button
                onClick={() => remove()}
                type="button"
                className="button button--DeleteAllCarts"
              >
                Remove all
                <FiDelete />
              </button>
            </div>
            <div className="createWordsContainer__wordsContainer">
              {fields.map((field, index) => {
                return (
                  <WordCart
                    key={field.wordId}
                    register={register}
                    index={index}
                    remove={remove}
                  />
                );
              })}
              <AddWordCart append={append} />
            </div>
          </section>
          <div>
            <button
              form="module-form"
              className="button button--createFormBtnBottom"
              type="submit"
            >
              {paramId ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateModule;
