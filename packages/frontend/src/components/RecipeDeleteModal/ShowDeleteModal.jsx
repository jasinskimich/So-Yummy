import React, { useState } from "react";
import styles from "./DeleteModal.module.css";
import { ReactComponent as Delete } from "../../images/delete.svg";
import DeleteModal from "./DeleteModal";

function ShowDeleteModal({ id, updateDeleteTransactions }) {
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <button
        className={styles.delete}
        onClick={() => {
          setDeleteModalOpen(true);
        }}
      >
        {" "}
        <Delete />
      </button>
      {modalDeleteOpen && (
        <DeleteModal
          updateDeleteTransactions={updateDeleteTransactions}
          setOpenDeleteModal={setDeleteModalOpen}
          id={id}
        />
      )}
    </>
  );
}

export default ShowDeleteModal;
