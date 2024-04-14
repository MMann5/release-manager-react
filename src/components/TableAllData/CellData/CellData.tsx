import { formattingDate } from "../../../utils/helpers";
import { Data } from "../../../utils/models";
import HistoryIcon from "@mui/icons-material/History";
import CommitOutlinedIcon from "@mui/icons-material/CommitOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import LinkIcon from "@mui/icons-material/Link";
import HelpIcon from "@mui/icons-material/Help";
import styles from "../TableAllData.module.scss";

interface CellDataProps {
  item: Data;
}

const CellData = ({ item }: CellDataProps) => {
  return (
    <>
      <div>{item?.version ? "" : <HelpIcon sx={{ color: "#2276f0" }} />}</div>
      {item?.version && (
        <div className={styles.cell}>
          <CloudQueueIcon sx={{ color: "#2276f0" }} />
          v.{item.version}
        </div>
      )}
      {item?.commit && (
        <div className={styles.cell}>
          <CommitOutlinedIcon sx={{ color: "#2276f0" }} />
          {`${item?.commit?.slice(0, 15)}...`}
        </div>
      )}
      {item?.remoteUrl && (
        <div className={styles.cell}>
          <LinkIcon sx={{ color: "#2276f0" }} />
          {item.remoteUrl}
        </div>
      )}
      {item?.created_by && (
        <div className={styles.cell}>
          <AccountCircleOutlinedIcon sx={{ color: "#2276f0" }} />
          {item.created_by}
        </div>
      )}
      <div>
        {item?.created_at && (
          <div className={styles.cell}>
            <HistoryIcon sx={{ color: "#2276f0" }} />
            {formattingDate(item.created_at)}
          </div>
        )}
      </div>
      <div></div>
    </>
  );
};

export default CellData;
