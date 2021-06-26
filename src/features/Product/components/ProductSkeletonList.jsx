import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  productImg: {
    height: '216px',
    width: '217px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '180px',
    },
  },
}));

function ProductSkeletonList({ length = 6 }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rect" className={classes.productImg} />
              <Box>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
