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
    '&:hover': {
      // opacity: 0.8,
      transform: 'translateY(-2px)',
      boxShadow: '0 1px 20px 0 rgba(0, 0, 0, .1)',
    },
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick} className={classes.box_product}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
