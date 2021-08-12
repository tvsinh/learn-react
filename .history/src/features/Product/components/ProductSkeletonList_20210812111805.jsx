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
    padding: theme.spacing(0.5),
  },
  boxImg: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    marginBottom: '5px',
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
  boxText: {
    height: '80px',
  },
  boxName: {
    height: '40px',
    marginBottom: '5px',
  },
  boxPrice: {},
  textName: {
    height: '22px',
    lineHeight: '1.43',
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
              <Box className={classes.boxText}>
                <Box className={classes.boxName}>
                  <Skeleton className={classes.textName} />
                  <Skeleton width="55%" className={classes.textName} />
                </Box>
                <Box className={classes.boxPrice}>
                  <Skeleton width="55%" className={classes.text} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
