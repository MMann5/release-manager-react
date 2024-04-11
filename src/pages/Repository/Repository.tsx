import { Config, Data } from "../../utils/models";
import { useEffect, useState } from "react";
import { getConfig, getDataRepo } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalConfig } from "../../redux/globalConfig";
import { useNavigate, useParams } from "react-router-dom";
import { NavigateBefore } from "@mui/icons-material";
import { mappingFields } from "../../utils/helpers";
import { setData } from "../../redux/data";
import TableRepo from "../../components/TableRepo/TableRepo";
import NoDataCmp from "../../components/NoDataCmp/NoDataCmp";
import styles from "./Repository.module.scss";
import SkeletonCmp from "../../components/SkeletonCmp/SkeletonCmp";
import SelectCmp from "../../components/SelectCmp/SelectCmp";

const Repository = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const data: Data[] = useSelector((state: any) => state.data.data);
  const config: Config = useSelector((state: any) => state.config.config);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getConfigTable();
  }, []);

  useEffect(() => {
    if (!params) return;
    if (params?.id) getRepository(params.id, config.env);
  }, [params?.id, config.env]);

  const getConfigTable = async () => {
    setLoading(true);
    try {
      let res = await getConfig();
      res.columns = mappingFields(res.columns);
      dispatch(setGlobalConfig(res));
    } catch (error) {
      console.log("Error while getConfigTable", error);
      setError(true);
    }
    setLoading(false);
  };

  const navigateBack = () => {
    navigate("/");
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NavigateBefore
          onClick={navigateBack}
          sx={{ cursor: "pointer", fontSize: "40px", color: "black" }}
        />
        <h3>{params?.id}</h3>
      </div>
      <SelectCmp />
      <SkeletonCmp display={!error && loading} />
      <NoDataCmp display={!loading && data?.length === 0} />
      <TableRepo display={!loading && data?.length > 0} data={data} />
    </div>
  );
};

export default Repository;
