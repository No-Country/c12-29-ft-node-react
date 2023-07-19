import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ setSearchQuery }) => {
  return (
        <TextField
          focused={false}
          autoComplete="off"
          id="search"
          type="text"
          placeholder='Search...'
          onInput={(e) => {
            setSearchQuery(e.target.value.toLowerCase())
          }}
          sx={{ width: 600, border: '1px solid white', borderRadius: '4px', input: { color: 'white' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                  <SearchIcon />
              </InputAdornment>
            )
          }}
        />
  )
}

export default SearchBar
