import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import LogoutModal from "../LogoutModal/LogoutModal";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatarImage from "../../images/avatarDefault.jpg";
import styles from "./SettingsModal.module.css";

const style = {
  position: "absolute",
  top: "15%",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 100,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 2,
};

export default function SettingsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const { owner } = useParams();

  useEffect(() => {
    const fetchName = async () => {
      try {
        let response = await fetch(
          `http://localhost:5000/api/users/name/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch username");
        }

        response = await response.json();

        setName(response.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchName();
  }, [owner]);

  return (
    <div className={styles.userNav}>
      <Button
        onClick={handleOpen}
        className={styles.userNav}
        sx={{
          padding: 0,
          minWidth: "34px",
          borderRadius: "50%",

          overflow: "hidden",
          ":hover": {
            bgcolor: "transparent",
          },
        }}
      >
        {" "}
        <img src={avatarImage} alt="Avatar" className={styles.avatarImage} />
      </Button>

      <Button
        onClick={handleOpen}
        className={styles.userNav}
        sx={{
          color: "#22252A",
          padding: 0,
          fontWeight: "600",
          ":hover": {
            bgcolor: "transparent",
            color: "#8baa36",
          },
        }}
      >
        {" "}
        <span className={styles.usernameText}>{name}</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 177 }}>
          <div className={styles.userModal}>
            <ProfileEdit />
            <LogoutModal />
          </div>
        </Box>
      </Modal>
    </div>
  );
}