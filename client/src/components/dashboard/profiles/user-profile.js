import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { TextField, Divider, Button } from "@material-ui/core";
import { errorHelper } from "../../../utils/tools";
import { updateUserProfile } from "../../../store/actions/user_actions";

const UserProfile = () => {
  const { firstname, lastname, age } = useSelector((state) => state.users.data);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { firstname, lastname, age },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(updateUserProfile(values));
    },
  });

  return (
    <>
      <form
        className="mt-3 article_form"
        onSubmit={formik.handleSubmit}
        style={{ maxWidth: "250px" }}
      >
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your firstname"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
            {...errorHelper(formik, "firstname")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="lastname"
            label="Enter your lastname"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
            {...errorHelper(formik, "lastname")}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="firstname"
            label="Enter your age"
            variant="outlined"
            {...formik.getFieldProps("age")}
            {...errorHelper(formik, "age")}
          />
        </div>
        <Button
          className="mt-3"
          variant="contained"
          color="primary"
          onClick={formik.submitForm}
          type="submit"
        >
          Edit profile
        </Button>
      </form>
    </>
  );
};

export default UserProfile;
