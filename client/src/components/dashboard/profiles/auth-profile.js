import React, { useState } from "react";
import { Grid, Divider, TextField } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import EmailStepper from "./email-stepper/mail";

const AuthProfile = () => {
  const [emailModal, setEmailModal] = useState(false);
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);

  const closeModal = () => {
    setEmailModal(false);
  };
  const openModal = () => {
    setEmailModal(true);
  };

  return (
    <div>
      <div className="mb-3 auth-grid">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField value={users.data.email} disabled></TextField>
          </Grid>
          <Grid item>
            <EditIcon color="primary" onClick={openModal}></EditIcon>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField value="*************" disabled></TextField>
          </Grid>
          <Grid item>
            <EditIcon color="primary" onClick={openModal}></EditIcon>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <Modal size="lg" centered show={emailModal} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Update your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailStepper user={users}></EmailStepper>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AuthProfile;
