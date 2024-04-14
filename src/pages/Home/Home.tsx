import { Data } from "../../utils/models";
import { setAllData } from "../../redux/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, getDataAllRepo } from "../../services/api";
import ErrorCmp from "../../components/ErrorCmp/ErrorCmp";
import NoDataCmp from "../../components/NoDataCmp/NoDataCmp";
import SkeletonCmp from "../../components/SkeletonCmp/SkeletonCmp";
import TableAllData from "../../components/TableAllData/TableAllData";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allData = useSelector((state: any) => state.data.allData);

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
    // const dataFromLocalStorage = getFromLocalStorage("allData");
    // if (dataFromLocalStorage) {
    //   dispatch(setAllData(dataFromLocalStorage));
    //   setLoading(false);
    //   return;
    // }

    setLoading(true);
    let results: any = [];

    try {
      const promises = envs?.map((env: string) => {
        return getDataAllRepo(env).then((data) => {
          results = [...results, ...data.data];
        });
      });
      await Promise.all(promises);
      results = FormattingResults(results);
      // setInLocalStorage("allData", results);
      dispatch(setAllData(results));
    } catch (error) {
      setError(true);
      console.error("Error while getAllData", error);
    } finally {
      setLoading(false);
    }

    return results;

    function FormattingResults(results: any) {
      return results?.reduce((acc: any, item: Data) => {
        if (!acc[item.repository] && !!item.repository) {
          acc[item.repository] = [];
        }
        if (!!item.repository) acc[item.repository].push(item);
        return acc;
      }, {});
    }
  };

  const navigateToRepository = (repository: string) => {
    if (!repository) return;
    navigate(`/repository/${repository}`);
  };

  return (
    <div className={styles.container}>
      <SkeletonCmp display={loading} />
      <ErrorCmp display={!loading && error} retry={getConfigTable} />
      <NoDataCmp display={!loading && Object.values(allData)?.length === 0} />
      {!loading && !error && (
        <TableAllData
          allData={allData}
          navigateToRepository={navigateToRepository}
        />
      )}
    </div>
  );
};

export default Home;
