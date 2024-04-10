import React, { FC } from "react";
import styles from "./SkeletonCmp.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../TableCmp/TableCmp.style";

interface SkeletonCmpProps {
  display: boolean;
}

const SkeletonCmp: FC<SkeletonCmpProps> = ({ display }) => {
  const List = Array.from({ length: 5 }, (_, index) => index);

  return display ? (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {List.map((_, index) => (
              <StyledTableCell key={index} align="left">
                <div className={styles.cell}></div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {List.map((_, index: number) => (
            <StyledTableRow key={index}>
              {List.map((_, index) => (
                <StyledTableCell key={index} align="left">
                  <div className={styles.cell}></div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default SkeletonCmp;
