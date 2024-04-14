import { FC } from "react";
import { StyledTableCell, StyledTableRow } from "../TableRepo.style";
import { Data } from "../../../utils/models";
import { formattingDate } from "../../../utils/helpers";

interface RowDataProps {
  info: Data;
}

const RowData: FC<RowDataProps> = ({ info }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{info?.repo_manager}</StyledTableCell>
      <StyledTableCell align="left">{info?.repository}</StyledTableCell>
      <StyledTableCell align="left">{info?.tag}</StyledTableCell>
      <StyledTableCell align="left">{info?.version}</StyledTableCell>
      <StyledTableCell align="left">{info?.description}</StyledTableCell>
      <StyledTableCell align="left">{info?.ref}</StyledTableCell>
      <StyledTableCell align="left">
        {info?.commit && `${info?.commit?.slice(0, 10)}...`}
      </StyledTableCell>
      <StyledTableCell align="left">{info?.created_by}</StyledTableCell>
      <StyledTableCell align="left">
        {formattingDate(info?.created_at)}
      </StyledTableCell>
      <StyledTableCell align="left">
        {info?.remoteUrl && (
          <a href={info?.remoteUrl} target="_blank">
            Open
          </a>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RowData;
