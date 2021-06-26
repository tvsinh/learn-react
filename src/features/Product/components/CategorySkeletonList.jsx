import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

CategorySkeletonList.propTypes = {
  length: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  skeleton: {
    margin: theme.spacing(0.5, 0),
  },
}));

function CategorySkeletonList({ length = 6 }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.root}>
        {Array.from(new Array(length)).map((x, index) => (
          <Skeleton key={index} variant="text" width={80} className={classes.skeleton} />
        ))}
      </Grid>
    </Box>
  );
}

export default CategorySkeletonList;
