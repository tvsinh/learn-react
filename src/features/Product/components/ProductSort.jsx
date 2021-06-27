import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      minHeight: '6vh',
      padding: theme.spacing(0),
      margin: theme.spacing(0),
    },
  },
  sort: {
    [theme.breakpoints.down('md')]: {
      minHeight: '6vh',
      padding: theme.spacing(0, 1),
      fontSize: '12.9px',
    },
  },
}));
function ProductSort({ currentSort, onChange }) {
  const classes = useStyles();

  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
      className={classes.root}
    >
      <Tab label="Giá thấp tới cao" value="salePrice:ASC" className={classes.sort}></Tab>
      <Tab label="Giá cao xuống thấp" value="salePrice:DESC" className={classes.sort}></Tab>
    </Tabs>
  );
}

export default ProductSort;
