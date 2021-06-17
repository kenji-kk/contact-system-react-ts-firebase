import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './buttons.css';

export function ProductSelectButton() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="ProductSelectButtonWrap">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="product-simple-select-helper-label"></InputLabel>
        <FormHelperText>製品種類を選択してください*</FormHelperText>
        <Select
          labelId="product-simple-select-helper-label"
          id="product-simple-select-helper"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={1}>A001</MenuItem>
          <MenuItem value={2}>A002</MenuItem>
          <MenuItem value={3}>A003</MenuItem>
          <MenuItem value={4}>A004</MenuItem>
          <MenuItem value={5}>A005</MenuItem>
          <MenuItem value={6}>A006</MenuItem>
          <MenuItem value={7}>A007</MenuItem>
          <MenuItem value={8}>A008</MenuItem>
          <MenuItem value={9}>A009</MenuItem>
          <MenuItem value={10}>A0011</MenuItem>
          <MenuItem value={12}>A0012</MenuItem>
          <MenuItem value={13}>A0013</MenuItem>
          <MenuItem value={14}>A0014</MenuItem>
          <MenuItem value={15}>A0015</MenuItem>
          <MenuItem value={16}>A0016</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}