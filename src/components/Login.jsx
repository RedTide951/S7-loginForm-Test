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

  // Validation Logic
  const validateForm = (updatedForm) => {
    const newErrors = {};
    if (!emailRegex.test(updatedForm.email)) {
      newErrors.email = errorMessages.email;
    }
    if (!passwordRegex.test(updatedForm.password)) {
      newErrors.password = errorMessages.password;
    }
    if (!updatedForm.terms) {
      newErrors.terms = errorMessages.terms;
    }
    setErrors(newErrors);

    // Button enabled only if no validation errors exist
    setIsButtonEnabled(Object.keys(newErrors).length === 0);
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const updatedValue = type === "checkbox" ? event.target.checked : value;
    const updatedForm = { ...form, [name]: updatedValue };

    setForm(updatedForm);

    // Validate form after every change
    validateForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isButtonEnabled) {
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
        {errors.email && (
          <div className="text-danger" data-testid="email-error-text">
            {errors.email}
          </div>
        )}
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
          <div className="text-danger" data-testid="password-error-text">
            {errors.password}
          </div>
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
        {errors.terms && (
          <div className="text-danger" data-testid="terms-error-text">
            {errors.terms}
          </div>
        )}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button
          color="primary"
          disabled={!isButtonEnabled}
          data-testid="login-button"
        >
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}
