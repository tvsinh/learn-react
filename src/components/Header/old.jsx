import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import StorefrontIcon from '@material-ui/icons/Storefront';
import BackToTop from 'components/BackToTop';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsLenghtSelector } from 'features/Cart/selectors';
import SearchInput from 'features/SearchInput';
import { searchValue } from 'features/SearchInput/seachSlice';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsLenght = useSelector(cartItemsLenghtSelector);
  const isLoggedIn = !!loggedInUser.id;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    dispatch(searchValue(value));
  };

  const handleHome = () => {
    dispatch(searchValue(''));
  };

  return (
    <div className={classes.root}>
      <BackToTop />
      <AppBar position="static">
        <Toolbar>
          <StorefrontIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link to="/" onClick={handleHome} className={classes.link}>
              REACT SHOP
            </Link>
          </Typography>

          <SearchInput onSubmit={handleFilterChange} />

          <NavLink to="/todos" className={classes.link} activeClassName="active">
            <Button color="inherit">Todos</Button>
          </NavLink>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle></AccountCircle>
            </IconButton>
          )}

          <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemsLenght} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
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
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

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
    </div>
  );
}
