import { FC } from "react";
import { StyledTableCell } from "./TableRepo.style";
import { Data, GlobalConfig } from "../../utils/models";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowData from "./RowData/RowData";

interface TableProps {
  display: boolean;
  data: Data[];
}

const TableRepo: FC<TableProps> = ({ display, data }) => {
  const globalConfig: GlobalConfig = useSelector(
    (state: any) => state.globalConfig.globalConfig
  );

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
            return <RowData key={index} info={info} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default TableRepo;
