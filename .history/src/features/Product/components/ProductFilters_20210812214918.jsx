import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  // filters: PropTypes.object.isRequired,
  filters: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      position: 'static',
    },
  },
  iconRight: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      right: '0',
      position: 'fixed',
      margin: '10px 10px 0 0',
    },
  },
  button: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      position: 'fixed',
      padding: '11px',
      bottom: '0',
      width: '80%',
      backgroundColor: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.1)',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  section: {
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      backgroundColor: 'white',
      right: '0',
      zIndex: '100',
      transition: '500ms',
      paddingBottom: '110px',
      width: '80%',
      height: '100%',
      overflowY: 'scroll',
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
    console.log(values);
    if (onChange) onChange(values);
  };

  const handleClose = () => {
    onClick(false);
  };

  return (
    <>
      {/* <Box className={classes.sectionDesktop}>
        <FilterByCategory onChange={handleCategoryChange} />
        <FilterByPrice onChange={handeChange} />
        <FilterByService filters={filters} onChange={handeChange} />
      </Box> */}

      <Box className={classes.root}>
        <Box className={classes.section}>
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
      </Box>
    </>
  );
}

export default ProductFilters;
