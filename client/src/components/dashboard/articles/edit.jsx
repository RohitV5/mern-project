import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../../hoc/adminLayout";
import { validation } from "./validationSchema";
import {
  TextField,
  Button,
  Divider,
  Chip,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { errorHelper } from "../../../utils/tools";
import WYSIWYG from "../../../utils/forms/wysiwyg";

import { useDispatch, useSelector } from "react-redux";
import { getAdminArticle,updateAdminArticle } from "../../../store/actions/article_actions";
import { clearCurrentArticle } from "../../../store/actions/index";
import Loader from "../../../utils/loader";

export const EditArticle = (props) => {
  const actorsValue = useRef("");
  const [editorBlur, setEditorBlur] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  //listening to notification for success articles
  const notifications = useSelector((state) => state.notifications);

  const [formData, setFormData] = useState();
  const articles = useSelector((state) => state.articles);

  const [editContent, setEditContent] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      dispatch(updateAdminArticle(values,props.match.params.id))
    },
  });

  const handleEditorState = (state) => {
    formik.setFieldValue("content", state, true);
  };

  const handleEditorBlur = (blur) => {
    setEditorBlur(true);
  };

  useEffect(() => {
    // if (notifications && notifications.success) {
    //   props.history.push("/dashboard/articles");
    // }

    // if (notifications && notifications.error) {
      setIsSubmitting(false);
    // }
  }, [notifications, props.history]);

  /// edit ///
  useEffect(() => {
    dispatch(getAdminArticle(props.match.params.id));
    return (()=>{
      dispatch(clearCurrentArticle())
    })
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (articles && articles.current) {
      //    for loading formdata
      setFormData(articles.current);

      //   for loading html in wysiwyg
      setEditContent(articles.current.content);
    }
  }, [articles]);

  /// edit ///

  return (
    <AdminLayout section="Add Article">
      {isSubmitting ? (
        <Loader></Loader>
      ) : (
        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="title"
              label="Enter a title"
              variant="outlined"
              {...formik.getFieldProps("title")}
              {...errorHelper(formik, "title")}
            />
          </div>

          <div className="form-group">
            <WYSIWYG
              setEditorState={(state) => {
                handleEditorState(state);
              }}
              setEditorBlur={(blur) => {
                handleEditorBlur(blur);
              }}
              editContent={editContent}
            ></WYSIWYG>

            {formik.errors.content && editorBlur ? (
              <FormHelperText error={true}>
                {formik.errors.content}
              </FormHelperText>
            ) : null}

            <TextField
              type="hidden"
              name="content"
              {...formik.getFieldProps("content")}
            ></TextField>
          </div>

          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="excerpt"
              label="Enter an excerpt"
              variant="outlined"
              {...formik.getFieldProps("excerpt")}
              {...errorHelper(formik, "excerpt")}
              multiline
              rows={4}
            />
          </div>

          <Divider className="mt-3 mb-3" />
          <h5> Movie data and score </h5>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="score"
              label="Enter score"
              variant="outlined"
              {...formik.getFieldProps("score")}
              {...errorHelper(formik, "score")}
            />
          </div>

          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="director"
              label="Enter director"
              variant="outlined"
              {...formik.getFieldProps("director")}
              {...errorHelper(formik, "director")}
            />
          </div>

          <FormikProvider value={formik}>
            <h5>Add the actors:</h5>
            <FieldArray
              name="actors"
              render={(arrayHelpers) => (
                <div>
                  <Paper className="actors_form">
                    <InputBase
                      inputRef={actorsValue}
                      className="input"
                      placeholder="Add actor name here"
                    />
                    <IconButton
                      onClick={() => {
                        arrayHelpers.push(actorsValue.current.value);
                        actorsValue.current.value = "";
                      }}
                    >
                      <AddIcon></AddIcon>
                    </IconButton>
                  </Paper>

                  {formik.errors.actors && formik.touched.actors ? (
                    <FormHelperText error={true}>
                      {formik.errors.actors}
                    </FormHelperText>
                  ) : null}

                  {formik.values && (
                    <div className="chip_container">
                      {formik.values.actors.map((actor, index) => (
                        <div key={index}>
                          <Chip
                            label={`${actor}`}
                            color="primary"
                            onDelete={() => {
                              arrayHelpers.remove(index);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            ></FieldArray>
          </FormikProvider>

          <FormControl variant="outlined">
            <h5>Select status</h5>
            <Select
              name="status"
              {...formik.getFieldProps("status")}
              error={
                formik.errors.status && formik.touched.status ? true : false
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="draft">
                <em>Draft</em>
              </MenuItem>
              <MenuItem value="public">
                <em>Public</em>
              </MenuItem>
            </Select>
            {formik.errors.status && formik.touched.status ? (
              <FormHelperText error={true}>
                {formik.errors.status}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Divider className="mt-3 mb-3" />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            // disabled={false}
          >
            Edit article
          </Button>
        </form>
      )}
    </AdminLayout>
  );
};

// export default AddArticle;
