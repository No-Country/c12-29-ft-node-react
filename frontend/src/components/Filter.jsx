import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from 'axios'
const Filter = ({ specialty, setSpecialty }) => {
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    axios
      .get("https://c12-29-ft-node-react.onrender.com/api/specialities")
      .then(({ data }) => {
        setSpecialities(data);
      });
  }, []);

  return (
    <FormControl
      focused={false}
      sx={{
        ml: 1,
        minWidth: 140,
        border: " 1px solid white",
        borderRadius: "4px",
        "& .MuiInputLabel-shrink": {
          transform: "translate(14px, -20px) scale(0.75)",
        },
      }}
    >
      <InputLabel sx={{ color: "white" }}>Especialidad</InputLabel>
      <Select
        value={specialty}
        label="especialidad"
        sx={{
          color: "white",
          "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": { color: "white" },
        }}
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <MenuItem value="">
          <em>Ninguna</em>
        </MenuItem>
        {specialities.map((speciality) => {
          return <MenuItem value={speciality.name}>{speciality.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default Filter;
