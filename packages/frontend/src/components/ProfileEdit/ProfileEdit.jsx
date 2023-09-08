import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ReactComponent as EditPen } from "../../images/EditIcon.svg";
import styles from "./ProfileEdit.module.css";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ProfileEdit() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            fontWeight: "bold",
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
            fontWeight: "600",
            ":hover": {
              bgcolor: "transparent",
              transform: "rotate(10deg)",
            },
          }}
        >
          <EditPen className={styles.editPen}/>
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">dziecko</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileEdit;
