import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatPrice } from './../../../../utils/common';

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
  inputPrice: {
    width: '250px',
    // height: '14px',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      _page: 1, // Reset page to first
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);

    // setValues({
    //   salePrice_gte: 0,
    //   salePrice_lte: 0,
    // });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          className={classes.inputPrice}
          variant="outlined"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          size="small"
          placeholder={formatPrice(0)}
        />
        <span>-</span>
        <TextField
          className={classes.inputPrice}
          variant="outlined"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          size="small"
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
