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
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5, 0),
  },
  skeletonName: {
    marginLeft: theme.spacing(8),
  },
}));

function CategorySkeletonList({ length = 6 }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.root}>
        {Array.from(new Array(length)).map((x, index) => (
          <Box className={classes.skeleton}>
            <Skeleton variant="rect" width={25} height={25} />
            <Skeleton key={index} variant="text" width={140} className={classes.skeletonName} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default CategorySkeletonList;
