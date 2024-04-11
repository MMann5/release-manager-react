import { FC } from "react";
import { StyledTableCell, StyledTableRow } from "./TableRepo.style";
import { Data, GlobalConfig } from "../../utils/models";
import { useSelector } from "react-redux";
import { formattingDate } from "../../utils/helpers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface TableProps {
  display: boolean;
  data: Data[];
}

const TableRepo: FC<TableProps> = ({ display, data }) => {
  const globalConfig: GlobalConfig = useSelector((state: any) => state.globalConfig.globalConfig);

  return display ? (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {globalConfig?.columns?.map((row: string, index: number) => {
              return (
                <StyledTableCell key={index} align="left">
                  {row}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((info: Data, index: number) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">
                  {info?.repo_manager || "No Data"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {info?.repository}
                </StyledTableCell>
                <StyledTableCell align="left">{info?.tag}</StyledTableCell>
                <StyledTableCell align="left">{info?.version}</StyledTableCell>
                <StyledTableCell align="left">
                  {info?.description}
                </StyledTableCell>
                <StyledTableCell align="left">{info?.ref}</StyledTableCell>
                <StyledTableCell align="left">
                  {info?.commit && `${info?.commit?.slice(0, 10)}...`}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {info?.created_by}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formattingDate(info?.created_at)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {info?.remoteUrl ? (
                    <a href={info?.remoteUrl} target="_blank">
                      Open
                    </a>
                  ) : (
                    "No Data"
                  )}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default TableRepo;
