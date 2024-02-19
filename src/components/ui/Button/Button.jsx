import React from "react";

import styles from "./Button.module.css";

function Button({ type = "primary", children, ...props }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
