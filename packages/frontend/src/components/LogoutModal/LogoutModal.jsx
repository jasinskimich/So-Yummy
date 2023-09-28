import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ReactComponent as LogOut } from "../../images/LogoutButton.svg";
import { ReactComponent as Close } from "../../images/closeModal.svg";

import styles from "./LogoutModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",

  width: "80%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

function LogoutModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        className={styles.logoutbutton}
        onClick={handleOpen}
        sx={{
          color: "#22252A",
          //   borderRadius: "15%",
          overflow: "hidden",
          width: "141px",
          padding: 0,
          minWidth: "34px",

          fontWeight: "600",
          ":hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <LogOut className={styles.logoutbutton}></LogOut>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title1"
        aria-describedby="child-modal-description1"
      >
        <Box sx={{ ...style }}>
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
          <div className={styles.modalContainer}>
            <span className={styles.modalText}>
              Are you sure you want to log out?
            </span>
            <div className={styles.buttons}>
              <button
                className={styles.firstButton}
                
              >
                Log out
              </button>
              <button
                className={styles.secondButton}
                onClick={handleClose}
               
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default LogoutModal;
