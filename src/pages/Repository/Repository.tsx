import React from "react";
import { useEffect, useState } from "react";
import { getConfig, getDataRepo, getDataAllRepo } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setData, resetData } from "../../redux/data";
import { setGlobalConfig } from "../../redux/globalConfig";
import SelectCmp from "../../components/SelectCmp/SelectCmp";
import TableCmp from "../../components/TableCmp/TableCmp";
import NoDataCmp from "../../components/NoDataCmp/NoDataCmp";
import styles from "./Repository.module.scss";
import SkeletonCmp from "../../components/SkeletonCmp/SkeletonCmp";
import ErrorCmp from "../../components/ErrorCmp/ErrorCmp";
import { useParams } from "react-router-dom";

const Repository = () => {
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.data.data);
  const config = useSelector((state: any) => state.config.config);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    initConfig();
  }, []);

  useEffect(() => {
    if (!config?.repo) getAllRepository();
    if (!config.repo || !config.env) return;
    dispatch(resetData());
    getRepository(config.repo, config.env);
  }, [config]);

  const initConfig = async () => {
    await getConfigTable();
    await getAllRepository();
  };

  const getConfigTable = async () => {
    setLoading(true);
    try {
      const res = await getConfig();
      dispatch(setGlobalConfig(res));
    } catch (error) {
      console.log("Error while getConfigTable", error);
      setError(true);
    }
    setLoading(false);
  };

  const getRepository = async (repo: string, env: string) => {
    setLoading(true);
    try {
      const res = await getDataRepo(repo, env);
      dispatch(setData(res?.data));
    } catch (error) {
      console.log("Error while getRepository", error);
      setError(true);
    }
    setLoading(false);
  };

  const getAllRepository = async () => {
    setLoading(true);
    try {
      const res = await getDataAllRepo(config.env);
      dispatch(setData(res?.data));
    } catch (error) {
      console.log("Error while getAllRepository", error);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <SelectCmp />
      <SkeletonCmp display={loading} />
      <ErrorCmp display={!loading && error} retry={initConfig} />
      <NoDataCmp display={!loading && data?.length === 0} />
      <TableCmp display={!loading && data?.length > 0} />
    </div>
  );
};

export default Repository;
