import * as yup from "yup";
export const validationSchema = yup.object().shape({
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
