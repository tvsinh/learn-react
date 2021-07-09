import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  ArrowBack,
  ArrowDropDown,
  Close,
  Home,
  PermIdentityOutlined,
  ShoppingCart,
} from '@material-ui/icons';
import StorefrontIcon from '@material-ui/icons/Storefront';
import BackToTop from 'components/BackToTop';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsLenghtSelector } from 'features/Cart/selectors';
import SearchInput from 'features/SearchInput';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import SuccessCart from 'features/Cart/components/SuccessCart';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    zIndex: '1',
    top: '0',
    [theme.breakpoints.up('md')]: {
      position: 'static',
    },
  },
  boxUser: {
    textAlign: 'center',
  },
  login: {
    fontSize: '10px',
    textTransform: 'capitalize',
  },
  loginInfo: {
    display: 'flex',
    fontSize: '11px',
    alignItems: 'center',
    marginLeft: '12px',
    textTransform: 'capitalize',
  },
  user: {
    fontSize: '10px',
    marginLeft: '-15px',
    textTransform: 'capitalize',
  },
  userInfo: {
    display: 'flex',
    fontSize: '11px',
    alignItems: 'center',
    marginLeft: '5px',
    textTransform: 'capitalize',
  },
  appbar: {
    padding: '0',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 4),
    },
  },
  toolbar: {
    padding: '0',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 4),
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },

  title: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  grow: {
    // flexGrow: 1,
  },

  logo: {
    marginRight: theme.spacing(0),
    listStyle: 'none',
    color: '#FFF',
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();

  // backIcon
  const [backIcon, setBackIcon] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    const origin = window.location.origin;
    const href = window.location.href;
    if (params['category.searchTerm'] || href !== `${origin}/products`) {
      setBackIcon(true);
    }
    if (href === `${origin}/products?_limit=12&_page=1&_sort=salePrice%3AASC`) {
      setBackIcon(false);
    }

    return null;
  }, [location.search, location.href, location.origin]);

  // end backIcon
  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsLenght = useSelector(cartItemsLenghtSelector);
  const isLoggedIn = !!loggedInUser.id;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const handleClickOpen = () => {
    setOpen(true);
    handleMobileMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMyAccount = () => {
    history.push('/account');
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const handleFilterChange = (value) => {
    const formValue = {
      'category.searchTerm': value,
    };
    history.push({
      pathname: '/products',
      search: queryString.stringify(formValue),
    });
  };

  const handleHome = () => {
    history.push({
      pathname: '/',
    });
  };
  const handleBack = () => {
    history.goBack();
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      id={menuId}
      className={classes.sectionDesktop}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleMyAccount}>Tài khoản của tôi</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Thoát tài khoản</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      className={classes.sectionMobile}
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      {!isLoggedIn && (
        <MenuItem onClick={handleClickOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography>Đăng nhập</Typography>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem onClick={handleMyAccount}>
          <IconButton
            color="inherit"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
          <Typography>{loggedInUser.fullName}</Typography>
        </MenuItem>
      )}
      <MenuItem onClick={handleHome}>
        <IconButton color="inherit">
          <Home />
        </IconButton>
        <Typography>Trang chủ</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={10} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography>Thông báo</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <BackToTop />
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {backIcon && (
            <IconButton color="inherit" className={classes.sectionMobile} onClick={handleBack}>
              <ArrowBack />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            className={classes.sectionMobile}
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" onClick={handleHome} className={classes.title}>
            <StorefrontIcon className={`${classes.menuButton} + ${classes.sectionDesktop}`} />
            <Link to="/" className={`${classes.link} + ${classes.sectionDesktop}`}>
              REACT SHOP
            </Link>
          </Typography>

          <SearchInput onSubmit={handleFilterChange} className={classes.input} />

          <div className={classes.sectionDesktop}>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                <PermIdentityOutlined />
                <Box>
                  <Typography className={classes.login}>Đăng nhập/Đăng ký</Typography>
                  <Typography className={classes.loginInfo}>
                    Tài khoản
                    <ArrowDropDown />
                  </Typography>
                </Box>
              </Button>
            )}

            {isLoggedIn && (
              <Button color="inherit" onClick={handleUserClick}>
                <PermIdentityOutlined />
                <Box>
                  <Typography className={classes.user}>Tài khoản</Typography>
                  <Typography className={classes.userInfo}>
                    {loggedInUser.fullName}
                    <ArrowDropDown />
                  </Typography>
                </Box>
              </Button>
            )}
          </div>

          <IconButton aria-label="cart item" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemsLenght} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <SuccessCart />
        </Toolbar>
      </AppBar>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Typography display="inline">Already have an account.</Typography>
                <Button display="inline" color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Typography display="inline">Dont have an account.</Typography>
                <Button display="inline" color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
