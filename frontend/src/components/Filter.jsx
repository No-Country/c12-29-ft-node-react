import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Filter = ({ specialty, setSpecialty }) => {
  return (
    <FormControl focused={false} sx={{ ml: 1, minWidth: 140, border: ' 1px solid white', borderRadius: '4px', '& .MuiInputLabel-shrink': { transform: 'translate(14px, -20px) scale(0.75)' } }}>
      <InputLabel sx={{ color: 'white' }}>Especialidad</InputLabel>
      <Select
        value={specialty}
        label="especialidad"
        sx={{ color: 'white', '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': { color: 'white' } }}
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <MenuItem value="">
          <em>Ninguna</em>
        </MenuItem>
        <MenuItem value={10}>Civil</MenuItem>
        <MenuItem value={20}>Familia</MenuItem>
        <MenuItem value={30}>Penal</MenuItem>
        <MenuItem value={30}>Laboral</MenuItem>
      </Select>
    </FormControl>
  )
}

export default Filter
