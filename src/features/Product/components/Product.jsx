import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {},

  box_product: {
    cursor: 'pointer',
    borderRight: 'solid 1px #f1f1f1',
    // borderLeft: 'solid 1px #f1f1f1',
    borderBottom: 'solid 1px #f1f1f1',
    // boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .1)',
    '&:hover': {
      // opacity: 0.8,
      transform: 'translateY(-1.5px)',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .12)',
    },
  },
  boxImg: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    marginBottom: '5px',
  },
  productImg: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    // top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
    padding: '8px',
  },
  info: {
    height: '60px',
  },
  product_name: {
    height: '40px',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const thumbnailUrl = product.thumbnail[0]
    ? `${STATIC_HOST}${product.thumbnail[0]?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick} className={classes.box_product}>
      <Box padding={1} className={classes.boxImg}>
        <img src={thumbnailUrl} alt={product.name} width="100%" className={classes.productImg} />
      </Box>
      <Box className={classes.info}>
        <Typography className={classes.product_name} variant="body2">
          {product.name}
        </Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatPrice(product.salePrice)}
          </Box>

          {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
