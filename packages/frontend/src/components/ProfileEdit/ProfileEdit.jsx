import React, { useState } from "react";

import { Box, FormControl, InputAdornment, Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ReactComponent as EditPen } from "../../images/EditIcon.svg";
import styles from "./ProfileEdit.module.css";
import { ReactComponent as Close } from "../../images/closeModal.svg";
import { ReactComponent as User } from "../../images/userImage.svg";
import { ReactComponent as Plus } from "../../images/plus.svg";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "15px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 4,
};

function ProfileEdit() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.editContainer}>
        <Button
          onClick={handleOpen}
          sx={{
            color: "#22252A",
            padding: 0.5,
            fontSize: "16px",
            minWidth: "34px",
            fontWeight: "normal",
            textTransform: "none",
            ":hover": {
              bgcolor: "transparent",
              color: "#8baa36",
            },
          }}
        >
          Edit profile
        </Button>
        <Button
          onClick={handleOpen}
          sx={{
            color: "#22252A",
            padding: 0.5,
            minWidth: "34px",
            height: "34px",
            fontWeight: "600",
            ":hover": {
              bgcolor: "transparent",
              transform: "rotate(10deg)",
            },
          }}
        >
          <EditPen className={styles.editPen} />
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <div className={styles.editModalContainer}>
            <div className={styles.childrenCloseContainer}>
              <Button
                onClick={handleClose}
                className={styles.childrenClose}
                sx={{
                  color: "#22252A",
                  width: "15px",
                  padding: 0,
                  minWidth: "15px",
                  fontWeight: "600",
                  ":hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <Close />
              </Button>
            </div>
            <div>
              <button className={styles.avatarButton}>
                <User />
              </button>
              <Plus className={styles.plus} />
            </div>
            <FormControl variant="standard" className={styles.inputWidthLast}>
              <Input
                autoComplete="off"
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleInputChange(e)}
                placeholder="First Name"
                minLength={1}
                maxLength={12}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBoxIcon
                      sx={{ color: "lightgrey", mr: 1, my: 0.5 }}
                      className={styles.iconMargin}
                    />
                  </InputAdornment>
                }
                // inputProps={{
                //   style: {
                //     ":active": {
                //       broderBottom: "2px solid black",
                //     },
                //   },
                // }}
              />
            </FormControl>
            <button className={styles.submitButton}>Save changes</button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileEdit;
