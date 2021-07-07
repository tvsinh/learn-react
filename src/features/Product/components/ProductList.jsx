import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};

function ProductList({ data }) {
  return (
    <Box
      style={{
        borderLeft: 'solid 1px #FFF',
        borderRight: 'solid 1px #FFF',
      }}
    >
      <Grid
        container
        style={{
          borderTop: 'solid 1px #f1f1f1',
          borderLeft: 'solid 1px #f1f1f1',
        }}
      >
        {data.map((product) => (
          <Grid item key={product.id} xs={6} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
