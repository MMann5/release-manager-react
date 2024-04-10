import React from "react";
import Button from '@mui/material/Button';
import styles from "./ErrorCmp.module.scss";

interface ErrorCmpProps {
  display: boolean;
  retry: () => void;
}

const ErrorCmp = ({ display, retry }: ErrorCmpProps) => {
  return display ? (
    <div className={styles.container}>
      <div>Error</div>
      <div>Please try again</div>
      <Button onClick={retry} variant="outlined">Retry</Button>
    </div>
  ) : null;
};

export default ErrorCmp;
