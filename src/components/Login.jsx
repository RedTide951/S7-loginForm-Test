import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password:
    "Password must be at least 8 characters long, with uppercase, lowercase, numbers, and special characters",
  terms: "You must accept the terms of service",
};

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to manage button enable/disable
  const history = useHistory();

  // Enable button
  const checkButtonEnabled = (updatedForm) => {
    const isAnyFieldValid =
      updatedForm.email.length > 3 || updatedForm.password.length > 3;
    setIsButtonEnabled(isAnyFieldValid);
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const updatedValue = type === "checkbox" ? event.target.checked : value;
    const updatedForm = { ...form, [name]: updatedValue };

    setForm(updatedForm);
    checkButtonEnabled(updatedForm);
  };

  //  validation
  const validateForm = () => {
    const newErrors = {};
    if (!emailRegex.test(form.email)) {
      console.log("Invalid email:", form.email);
      newErrors.email = errorMessages.email;
    }
    if (!passwordRegex.test(form.password)) {
      console.log("Invalid password:", form.password);
      newErrors.password = errorMessages.password;
    }
    if (!form.terms) {
      console.log("Terms not accepted");
      newErrors.terms = errorMessages.terms;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = validateForm();
    console.log("Form valid:", isFormValid);

    if (isFormValid) {
      setForm(initialForm);
      history.push("/Success");
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        {errors.password && (
          <div className="text-danger">{errors.password}</div>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <div className="text-danger">{errors.terms}</div>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isButtonEnabled}>
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}
