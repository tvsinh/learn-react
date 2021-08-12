import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CategorySkeletonList from './../CategorySkeletonList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        color: '#288ad6',
        cursor: 'pointer',
      },
    },
  },
  title: {
    fontWeight: '400',
    // fontSize: '15px',
  },
  categoryName: {
    fontWeight: '400',
    fontSize: '15px',
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        const cateList = await list.map((x) => ({
          id: x.id,
          name: x.name,
        }));
        setCategoryList(cateList);
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.name);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>
        DANH MỤC SẢN PHẨM
      </Typography>
      {loading ? (
        <CategorySkeletonList />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2" className={classes.categoryName}>
                {category.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FilterByCategory;
