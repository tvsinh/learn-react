import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { BiFilterAlt } from 'react-icons/bi';

import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import Header from 'components/Header';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import Footer from 'components/Footer';
import { setFocusSearch } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {},
  taskSearch: {
    // marginLeft: '-10px',
  },
  containerDesk: {
    marginTop: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(8),
    },
  },
  searchNav: {
    display: 'flex',
    alignItems: ' center',
    padding: '11px 7px 3px',
    // marginLeft: '30px',
  },
  searchNavHome: {
    color: 'rgb(50, 50, 50)',
    margin: '0 30px 0 28px',
    cursor: 'pointer',
    '&::before': {
      top: '70px',
      transform: 'rotate(-40deg)',
      content: '""',
      position: 'absolute',
      marginLeft: '85px',
      width: '2px',
      height: '20px',
      backgroundColor: 'rgb(225, 225, 225)',
      // boxSizing: 'border-box',
    },
    '&::after': {
      top: '85px',
      transform: 'rotate(40deg)',
      content: '""',
      position: 'absolute',
      marginLeft: '85px',
      width: '2px',
      height: '20px',
      backgroundColor: 'rgb(225, 225, 225)',
      // boxSizing: 'border-box',
    },
  },

  left: {
    width: '250px',
    marginRight: '5px',
    marginBottom: '10px',
  },

  right: {
    flex: '1 1 0',
    marginBottom: '10px',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    width: 'auto',
    marginTop: '30px',
    paddingBottom: '20px',
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '10px',
    marginTop: theme.spacing(7),
  },
  iconSort: {
    color: theme.palette.primary.main,
    fontSize: '24px',
    margin: theme.spacing(0, 0.1),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    zIndex: '2',
    display: 'block',
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  productListMoblie: {
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 0.4),
      paddingTop: theme.spacing(0, 0.4),
    },
  },
  overlay: {
    zIndex: '1',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}));

function ListPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    if (params.isPromotion === 'false') {
      delete params.isPromotion;
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(params),
      });
    }
    if (params.isFreeShip === 'false') {
      delete params.isFreeShip;
      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(params),
      });
    }
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion,
      isFreeShip: params.isFreeShip,
    };
  }, [location.search, history]);
  const [filterBar, setFilterBar] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
      _page: 1, // Reset page to first
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleHome = () => {
    history.push({
      pathname: '/',
    });
  };
  const handleFilterBar = () => {
    setFilterBar(!filterBar);
    setOverlay(!overlay);
  };
  const handleDisAutoFocus = () => {
    dispatch(setFocusSearch(false));
  };

  return (
    <Box onClick={handleDisAutoFocus}>
      <Header className={classes.header} />
      <Container className={classes.taskSearch}>
        {queryParams['_q'] ? (
          <Box className={`${classes.searchNav} + ${classes.sectionDesktop}`}>
            <Box className={classes.searchNavHome}>
              <Typography onClick={handleHome}>Trang chủ</Typography>
            </Box>
            <Typography>{queryParams['_q'].toLowerCase()}</Typography>
          </Box>
        ) : null}
      </Container>
      <Box pt={1.1} className={classes.sectionDesktop}>
        <Container className={classes.containerDesk}>
          <Grid container spacing={0}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>
                <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
              </Paper>
            </Grid>

            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                <FilterViewer filters={queryParams} onChange={setNewFilters} />

                {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}

                <Box className={classes.pagination}>
                  <Pagination
                    color="primary"
                    count={Math.ceil(pagination.total / pagination.limit)}
                    page={pagination.page}
                    onChange={handlePageChange}
                  ></Pagination>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.sectionMobile}>
        {overlay && <Box className={classes.overlay} onClick={handleFilterBar}></Box>}
        {filterBar ? (
          <ProductFilters
            filters={queryParams}
            onChange={handleFiltersChange}
            onClick={handleFilterBar}
          />
        ) : null}
        <Box className={classes.sort}>
          <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
          <BiFilterAlt color="primary" onClick={handleFilterBar} className={classes.iconSort} />
        </Box>
        <FilterViewer filters={queryParams} onChange={setNewFilters} />
        <Box className={classes.productListMoblie}>
          {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}

          <Box className={classes.pagination}>
            <Pagination
              color="primary"
              count={Math.ceil(pagination.total / pagination.limit)}
              page={pagination.page}
              onChange={handlePageChange}
            ></Pagination>
          </Box>
        </Box>
      </Box>
      <Footer />
      <script>$(document).ready(function(){window.scrollTo({ top: 0 })});</script>
    </Box>
  );
}

export default ListPage;
