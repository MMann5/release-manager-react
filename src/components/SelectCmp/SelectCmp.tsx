import React, { FC } from "react";
import { setConfig } from "../../redux/config";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";

const SelectCmp: FC = () => {
  const dispatch = useDispatch();
  const globalConfig = useSelector(
    (state: any) => state.globalConfig.globalConfig
  );
  const config = useSelector((state: any) => state.config.config);

  const handleChange = (event: any) => {
    dispatch(setConfig(event.target));
  };

  return (
    <Box
      sx={{ minWidth: 120 }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ENV</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={config.env}
          label="env"
          name="env"
          onChange={handleChange}
        >
          {globalConfig?.envs?.map((item: any) => {
            return (
              <MenuItem key={item} value={item}>
                {item.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">REPO</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={config.repo}
          label="repo"
          name="repo"
          onChange={handleChange}
        >
          <MenuItem value="">ALL</MenuItem>
          {globalConfig?.repos?.map((item: any) => {
            return (
              <MenuItem key={item} value={item}>
                {item.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}
    </Box>
  );
};

export default SelectCmp;
