import React from "react";
import styles from "./SwitchCheckbox.module.css";
import { useState } from "react";

const SwitchCheckbox = () => {

  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className={styles.switchBox}>
      
        <input
          
          onChange={handleToggle}
          className={styles.switchBox__checkbox}
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          
          className={styles.switchBox__label}
          htmlFor={`react-switch-new`}
        >
          <span className={styles.switchBox__button}>
            
          </span>
        </label>
       
      </div>
    </>
  );
};

export default SwitchCheckbox;
