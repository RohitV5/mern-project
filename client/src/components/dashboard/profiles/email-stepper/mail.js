import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { TextField, Button, Stepper, Step, StepLabel } from "@material-ui/core";

const EmailStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Enter old email", "Enter new email", "Are you sure ?"];
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialvalues: "",
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This is required")
        .email("This is not a valid email"),
      newemail: Yup.string()
        .required("This is required")
        .email("This is not a valid email"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });
  return <>Stepper</>;
};

export default EmailStepper;
