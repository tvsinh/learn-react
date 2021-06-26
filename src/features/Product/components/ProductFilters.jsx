import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    // [theme.breakpoints.down('md')]: {
    //   position: 'fixed',
    //   backgroundColor: 'white',
    //   right: '0',
    //   zIndex: '1',
    //   transition: '5000ms',
    // },
  },
  iconRight: {
    [theme.breakpoints.down('md')]: {
      right: '0',
      position: 'fixed',
      margin: '10px 10px 0 0',
    },
  },
  button: {
    padding: '0 10px 10px 10px',
    bottom: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'block',
    position: 'fixed',
    backgroundColor: 'white',
    right: '0',
    zIndex: '1',
    transition: '500ms',
    marginBottom: '10px',
    width: '80%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
function ProductFilters({ filters, onChange = {}, onClick = {} }) {
  const classes = useStyles();
  const handleCategoryChange = (newCategoryName) => {
    if (!onChange) return;

    const newFilters = {
      'category.name': newCategoryName,
      _page: 1, // Reset page to first
      // 'category.searchTerm': null,
    };
    onChange(newFilters);
  };

  const handeChange = (values) => {
    if (onChange) onChange(values);
  };

  const handleClose = () => {
    onClick(false);
  };

  return (
    <>
      <Box className={classes.sectionDesktop}>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handeChange} />
        <FilterByService filters={filters} onChange={handeChange} />
      </Box>

      <Box className={classes.sectionMobile}>
        <Close onClick={handleClose} className={classes.iconRight} />
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handeChange} />
        <FilterByService filters={filters} onChange={handeChange} />
        <Box className={classes.button}>
          <Button onClick={handleClose} variant="contained" color="primary" fullWidth>
            Xong
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ProductFilters;
