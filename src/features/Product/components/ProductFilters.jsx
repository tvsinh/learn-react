import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange = {} }) {
  const handleCategoryChange = (newCategoryName) => {
    if (!onChange) return;

    const newFilters = {
      'category.name': newCategoryName,
      _page: 1, // Reset page to first
    };
    onChange(newFilters);
  };

  const handeChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handeChange} />
      <FilterByService filters={filters} onChange={handeChange} />
    </Box>
  );
}

export default ProductFilters;
