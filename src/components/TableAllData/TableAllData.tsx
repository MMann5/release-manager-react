import { Data } from "../../utils/models";
import { SFOA, UAT, PROD } from "../../config/key";
import { StyledTableCell, StyledTableRow } from "../../components/TableRepo/TableRepo.style";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TableContainer from "@mui/material/TableContainer";
import CellData from "./CellData/CellData";
import styles from "./TableAllData.module.scss";

interface TableAllDataProps {
  allData: any;
  navigateToRepository: (repository: string) => void;
}

const TableAllData = ({ allData, navigateToRepository }: TableAllDataProps) => {
  const getEnvColumns = (repoData: any) => {
    return {
      sfoa: repoData.find((entry: Data) => entry.env === SFOA) || { env: SFOA },
      uat: repoData.find((entry: Data) => entry.env === UAT) || { env: UAT },
      prod: repoData.find((entry: Data) => entry.env === PROD) || { env: PROD },
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Repo/Env</StyledTableCell>
            {[SFOA, UAT, PROD]?.map((row: string, index: number) => {
              return (
                <StyledTableCell key={index} align="left">
                  {row.toUpperCase()}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(allData).map((repoKey, index) => {
            const repoData = allData[repoKey];
            const envEntries = getEnvColumns(repoData);

            return (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    backgroundColor: "#2276f0",
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  <div
                    className={styles.cell}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigateToRepository(repoKey)}
                  >
                    <FolderCopyIcon /> {repoKey}
                  </div>
                </StyledTableCell>
                {Object.values(envEntries).map((item: Data, envIndex) => (
                  <StyledTableCell key={envIndex} align="left">
                    <CellData item={item} />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAllData;
