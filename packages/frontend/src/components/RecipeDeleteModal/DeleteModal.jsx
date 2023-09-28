import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ReactComponent as Close } from "../../images/closeModal.svg";
import { ReactComponent as Delete } from "../../images/delete.svg";
import { useParams } from "react-router-dom";

import styles from "./DeleteModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

function DeleteModal({ id, updateDeleteRecipes }) {
  const { owner } = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        `http://localhost:5000/api/recipes/${owner}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        response = await response.json();
        updateDeleteRecipes(response.deletedRecipe);

        handleClose();
      } else {
        throw new Error("Failed to delete recipe");
      }
    } catch (error) {
      console.error(error, "An error occurred. Please try again later.");
    }
  };

  return (
    <React.Fragment>
      <button className={styles.delete} onClick={handleOpen}>
        {" "}
        <Delete className={styles.deleteIcon} />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title1"
        aria-describedby="child-modal-description1"
      >
        <Box sx={{ ...style}}>
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
              Are you sure you want to delete this recipe?
            </span>
            <div className={styles.buttons}>
              <button
                onClick={handleDelete}
                className={styles.firstButton}
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                className={styles.secondButton}
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

export default DeleteModal;
