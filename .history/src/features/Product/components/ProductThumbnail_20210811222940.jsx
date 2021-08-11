import { Box } from '@material-ui/core';
import { STATIC_HOST } from 'constants/index';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

function ProductThumbnail({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail[0]
    ? `${STATIC_HOST}${product.thumbnail[0]?.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} className={classes.img} />
    </Box>
  );
}

export default ProductThumbnail;
