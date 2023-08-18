import React from "react";
import zxcvbn from "zxcvbn";
import styles from "./PasswordStrength.module.css";

const PasswordStrength = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const progressColor = () => {
    switch (testResult.score) {
      case 0:
        return styles.veryWeak;
      case 1:
        return styles.weak;
      case 2:
        return styles.weak;
      case 3:
        return styles.normal;
      case 4:
        return styles.strong;
      default:
        return "";
    }
  };

  const createPasswordLabel = () => {
    switch (testResult.score) {
      case 0:
        return "";
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Normal";
      case 4:
        return "Strong :)";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={styles.progress}>
        <div
          className={`${styles.progress_bar} ${progressColor()}`}
          style={{ width: `${num}%` }}
        ></div>
        <p className={styles.labelText}>{createPasswordLabel()}</p>
      </div>
    </>
  );
};

export default PasswordStrength;