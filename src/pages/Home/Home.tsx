import React from "react";
import { useEffect, useState } from "react";
import { getConfig, getDataAllRepo } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../../redux/data";
import NoDataCmp from "../../components/NoDataCmp/NoDataCmp";
import styles from "./Home.module.scss";
import SkeletonCmp from "../../components/SkeletonCmp/SkeletonCmp";
import ErrorCmp from "../../components/ErrorCmp/ErrorCmp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/TableCmp/TableCmp.style";
import { Data } from "../../utils/models";

const Home = () => {
  const dispatch = useDispatch();

  const allData = useSelector((state: any) => state.data.allData);
  console.log("allData", allData);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getConfigTable();
  }, []);

  const getConfigTable = async () => {
    setLoading(true);
    try {
      const res = await getConfig();
      if (res?.envs) await getAllData(res.envs);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getAllData = async (envs: string[]) => {
    setLoading(true);
    let results: any = [];

    try {
      const promises = envs?.map((env: string) => {
        return getDataAllRepo(env).then((data) => {
          results = [...results, ...data.data];
        });
      });
      await Promise.all(promises);
      results = results?.reduce((acc: any, item: Data) => {
        if (!acc[item.repository] && !!item.repository) {
          acc[item.repository] = [];
        }
        if (!!item.repository) acc[item.repository].push(item);
        return acc;
      }, {});
      dispatch(setAllData(results));
    } catch (error) {
      setError(true);
      console.error("Error while getAllData", error);
    } finally {
      setLoading(false);
    }

    return results;
  };
  return (
    <div className={styles.container}>
      <SkeletonCmp display={loading} />
      <ErrorCmp display={!loading && error} retry={getConfigTable} />
      <NoDataCmp display={!loading && Object.values(allData)?.length === 0} />
      {!loading &&
        Object.keys(allData).map((key: string, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                margin: "10px",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "5px",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div>{key}</div>
              {allData[key].map((repo: Data, index: number) => {
                return (
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div>{repo.version}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Home;
