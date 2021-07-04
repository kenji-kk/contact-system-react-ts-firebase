import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './buttons.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface Props {
  productType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
}

export function ProductSelectButton(props:Props) {
  const classes = useStyles();
  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProductType(event.target.value as string);
  };

  const { productType, setProductType } = props;
  console.log(productType);

  return (
    <div className="ProductSelectButtonWrap">
      <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
          <FormHelperText>製品種類を選択してください*</FormHelperText>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={productType}
            onChange={handleChange}
            autoWidth
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