import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(1),
  },
  boxImg: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
  },
  productImg: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
    padding: '8px',
  },
  text: {
    height: '21px',
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
              <Box className={classes.box}>
                <Box className={classes.boxImg}>
                  <Skeleton variant="rect" className={classes.productImg} />
                </Box>
              </Box>
              <Box>
                <Skeleton className={classes.text} />
                <Skeleton width="60%" className={classes.text} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
