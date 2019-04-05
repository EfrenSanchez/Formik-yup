//Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import { object, string } from "yup";

//Styles
import "./styles.css";

//Component App
const App = ({ values, handleChange, errors, touched, isSubmitting }) => (
  <Form className="App">
    {isSubmitting && <p>Loading...</p>}
    <div className="items">
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
    </div>
    {/* <input //Regular input
      type="password"
      name="password"
      placeholder="password"
      value={values.password}
      onChange={handleChange}
    /> */}
    <div className="items">
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="password" />
    </div>
    <label className="items">
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our newsletter
    </label>
    <Field className="items" component="select" name="user">
      <option value="manager">Manager</option>
      <option value="assistant">Assistant</option>
    </Field>
    <button className="items" type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </Form>
);

// Formik App
const FormikApp = withFormik({
  mapPropsToValues({ email, user, newsletter, password }) {
    return {
      email: email || "test text",
      password: password || "",
      user: user || "assistant",
      newsletter: newsletter || false
    };
  },
  // Validation with Yup
  validationSchema: object().shape({
    email: string()
      .email("Email not valid")
      .required("Email is required"),
    password: string()
      .min(6, "Password must be 6 charaster or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // GraphQL Request here
    setTimeout(() => {
      if (values.email === "test@test.com") {
        setErrors({ email: "That email is already taken" });
      } else {
        alert("Welcome");
        resetForm();
      }
      setSubmitting(false);
    }, 1000);

    console.log(values);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp email="test@test.com" />, rootElement);
