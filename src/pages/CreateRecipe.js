import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik, FormikProvider, Field, Form, FieldArray } from "formik";
import { TextField, Select } from "formik-material-ui";
import React from "react";
import { createRecipeSchema } from "../schema/recipe.schema";

const emptyInvItem = { id: "", quantity: 0 };

const initialValues = {
  name: "",
  inv_items_list: [emptyInvItem],
};

const handleSubmit = (values, helpers) => {
  setTimeout(async () => {
    alert(JSON.stringify(values));
  }, 400);
};

export const CreateRecipe = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: createRecipeSchema,
    onSubmit: handleSubmit,
  });

  const { values, errors, isSubmitting } = formik;

  return (
    <Card>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field
                  fullWidth
                  name="name"
                  component={TextField}
                  label="Recipe Name"
                />
              </Grid>

              <FieldArray name="inv_items_list">
                {({ push, remove }) => (
                  <React.Fragment>
                    <Grid item>
                      <Typography variant="body2">
                        Add Inventory Items
                      </Typography>
                    </Grid>

                    {values.inv_items_list.map((data, index) => (
                      <Grid container item key={index} spacing={2}>
                        <Grid item container spacing={2} xs={12} sm="auto">
                          <Grid item xs={12} sm={6}>
                            <InputLabel id={`inv_items_list.${index}.id`}>
                              Inv Item
                            </InputLabel>
                            <FormControl fullWidth>
                              <Field
                                id={`inv_items_list[${index}].id`}
                                name={`inv_items_list[${index}].id`}
                                component={Select}
                                displayEmpty
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Field>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel
                              htmlFor={`inv_items_list[${index}].quantity`}
                            >
                              Quantity
                            </InputLabel>
                            <Field
                              fullWidth
                              id={`inv_items_list[${index}].quantity`}
                              name={`inv_items_list[${index}].quantity`}
                              component={TextField}
                              type="number"
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                          <Button
                            disabled={isSubmitting}
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    ))}

                    <Grid item>
                      {typeof errors.inv_items_list === "string" ? (
                        <Typography color="error">
                          {errors.inv_items_list}
                        </Typography>
                      ) : null}
                    </Grid>

                    <Grid item>
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        onClick={() => push(emptyInvItem)}
                        color="info"
                        size="small"
                      >
                        +
                      </Button>
                    </Grid>
                  </React.Fragment>
                )}
              </FieldArray>

              <Grid item>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size="0.9rem" />
                    ) : undefined
                  }
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>
              </Grid>
            </Grid>

            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
};
