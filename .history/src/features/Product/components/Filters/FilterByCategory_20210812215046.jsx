import { Box, makeStyles, Typography } from '@material-ui/core';
import { Storage } from '@material-ui/icons';
import categoryApi from 'api/categoryApi';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
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
    fontWeight: '500',
    // fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  cate: {
    fontWeight: '500',
    fontSize: '15px',
    marginLeft: '10px',
  },
  category: {
    display: 'flex',
    alignItems: 'center',
  },
  categoryImg: {
    width: '25px',
    height: '25px',
    marginRight: '10px',
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
        console.log('list', list);
        const cateList = await list.map((x) => ({
          id: x.id,
          name: x.name,
          icon: x.icon,
        }));
        console.log('cateList', cateList);
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
      <Typography className={classes.title}>
        <Storage />
        <Typography variant="subtitle2" className={classes.cate}>
          DANH MỤC SẢN PHẨM
        </Typography>
      </Typography>
      {loading ? (
        <CategorySkeletonList />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={classes.category}
            >
              <img
                src={category.icon ? `${STATIC_HOST}${category.icon?.url}` : THUMBNAIL_PLACEHOLDER}
                alt="icon"
                className={classes.categoryImg}
              />
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
