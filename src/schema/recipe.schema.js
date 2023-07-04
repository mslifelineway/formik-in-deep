import { array, number, object, string } from "yup";

export const createRecipeSchema = object().shape({
  name: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Recipe name is required!"),
  inv_items_list: array(
    object().shape({
      id: string()
        .length(24, "Invalid selections!")
        .required("Please select the valid recipe!"),
      quantity: number()
        .nullable()
        .notRequired()
        .min(0, "Quantity must be greater than or equal to 0.")
        .test(
          "noEOrSign",
          "Number had an 'e' or sign.", // error message
          (value) =>
            typeof value === "number" && !/[eE+-]/.test(value.toString())
        ),
    })
  ),
});
