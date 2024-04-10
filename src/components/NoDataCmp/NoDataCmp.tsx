import React from "react";
import styles from "./NoDataCmp.module.scss";

interface NoDataCmpProps {
  display: boolean;
}

const NoDataCmp = ({ display }: NoDataCmpProps) => {
  return display ? (
    <div className={styles.container}>
      <div>No data</div>
      <div>Please Select an other Env / Repository</div>
    </div>
  ) : null;
};

export default NoDataCmp;
