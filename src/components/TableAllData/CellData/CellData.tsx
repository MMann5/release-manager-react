import { formattingDate } from "../../../utils/helpers";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import LinkIcon from "@mui/icons-material/Link";
import { Data } from "../../../utils/models";
import styles from "./CellData.module.scss";

interface CellDataProps {
  item: Data;
}

const CellData = ({ item }: CellDataProps) => {
  return (
    <>
      <div>{item?.version ? "" : "No Data"}</div>
      <div>{item?.version}</div>
      {item?.commit && (
        <div className={styles.cell}>
          <CloudQueueIcon />
          {`${item?.commit?.slice(0, 15)}...`}
        </div>
      )}
      {item?.remoteUrl && (
        <div className={styles.cell}>
          <LinkIcon />
          {item.remoteUrl}
        </div>
      )}
      {item?.created_by && (
        <div className={styles.cell}>
          <AccountCircleIcon />
          {item.created_by}
        </div>
      )}
      <div>
        {item?.created_at && (
          <div className={styles.cell}>
            <HistoryIcon />
            {formattingDate(item.created_at)}
          </div>
        )}
      </div>
      <div></div>
    </>
  );
};

export default CellData;
