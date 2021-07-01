import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: '',
    salePrice_lte: '',
  });

  const handleKeyDown = (e) => {
    // console.log(e.keyCode);
    var ASCIICode = e.which ? e.which : e.keyCode;
    if ((ASCIICode < 48 || ASCIICode > 57) & (ASCIICode < 96 || ASCIICode > 105)) {
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    // handleKeyDown(e);
    // e.persist();
    const { name, value } = e.target;
    console.log(Number(value));
    const newValue = value.replaceAll('.', '');
    console.log(Number(newValue));
    if (isNaN(Number(newValue))) {
      return setValues(() => ({
        [name]: '',
      }));
    } else if (Number(newValue) <= 0) {
      return setValues(() => ({
        [name]: '',
      }));
    } else if (value.includes('.')) {
      // const newValue = value.replaceAll('.', '');
      const finalValue = formatCurrency(value.replaceAll('.', ''));
      console.log(typeof finalValue);
      setValues((prevValues) => ({
        ...prevValues,
        [name]: finalValue,
        _page: 1, // Reset page to first
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: formatCurrency(value),
        _page: 1, // Reset page to first
      }));
    }
  };

  const handleSubmit = () => {
    if (values.salePrice_gte.includes('.') & values.salePrice_lte.includes('.')) {
      const valueGte = values.salePrice_gte.replaceAll('.', '');
      const valueLte = values.salePrice_lte.replaceAll('.', '');
      if (Number(valueGte) > Number(valueLte)) {
        values.salePrice_lte = valueGte;
        values.salePrice_gte = valueLte;
      } else {
        values.salePrice_gte = valueGte;
        values.salePrice_lte = valueLte;
      }
      if (onChange) onChange(values);
    } else if (values.salePrice_gte.includes('.') & !values.salePrice_lte.includes('.')) {
      const valueGte = values.salePrice_gte.replaceAll('.', '');
      const valueLte = values.salePrice_lte;
      if (Number(valueGte) > Number(valueLte)) {
        values.salePrice_lte = valueGte;
        values.salePrice_gte = valueLte;
      } else {
        values.salePrice_gte = valueGte;
        values.salePrice_lte = valueLte;
      }
      if (onChange) onChange(values);
    } else if (values.salePrice_lte.includes('.') & !values.salePrice_gte.includes('.')) {
      const valueGte = values.salePrice_gte;
      const valueLte = values.salePrice_lte.replaceAll('.', '');
      if (Number(valueGte) > Number(valueLte)) {
        values.salePrice_lte = valueGte;
        values.salePrice_gte = valueLte;
      } else {
        values.salePrice_gte = valueGte;
        values.salePrice_lte = valueLte;
      }
      if (onChange) onChange(values);
    } else {
      const valueGte = values.salePrice_gte;
      const valueLte = values.salePrice_lte;
      if (Number(valueGte) > Number(valueLte)) {
        values.salePrice_gte = valueLte;
        values.salePrice_lte = valueGte;
        if (onChange) onChange(values);
      } else {
        if (onChange) onChange(values);
      }
    }
    setValues({
      salePrice_gte: '',
      salePrice_lte: '',
    });
  };
  const formatCurrency = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat().format(price);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          size="small"
          variant="outlined"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={formatPrice(0)}
        />
        <span>-</span>
        <TextField
          size="small"
          variant="outlined"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          placeholder={formatPrice(0)}
        />
      </Box>

      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
