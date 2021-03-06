import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

MiniSuccessCart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '10',
    display: 'flex',
    position: 'relative',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '300px',
    height: 'auto',
    top: '5vh',
    right: '0',
    backgroundColor: '#FFF',
    borderRadius: '2px',
    padding: theme.spacing(1.5, 1.5),
    justifyContent: 'center',
    '&::after': {},
  },

  close: {
    zIndex: '11',
    position: 'absolute',
    top: '30px',
    right: '5px',
    fontSize: 'large',
    color: 'rgba(0, 0, 0, .8)',
    '&:hover': {
      color: 'rgba(0, 0, 0, .4)',
    },
  },
}));

function MiniSuccessCart(props) {
  const classes = useStyles();
  const history = useHistory();
  const hanldeCloseMiniCart = () => {};
  const hanldeLinkCart = () => {
    history.push('/cart');
  };
  const HandleStopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <Box className={classes.root}>
      <Close
        className={classes.close}
        onClick={hanldeCloseMiniCart}
        style={{ cursor: 'pointer' }}
      />
      <Paper className={classes.paper} onClick={HandleStopPropagation}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          alignItems="center"
          margin={(0, 1)}
        >
          <svg
            stroke="rgb(76, 175, 80)"
            fill="rgb(76, 175, 80)"
            viewBox="0 0 512 512"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
          </svg>
          <Box ml={0.5}>
            <Typography color="textPrimary">Th??m v??o gi??? h??ng th??nh c??ng!</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ textTransform: 'none' }}
          onClick={hanldeLinkCart}
        >
          Xem gi??? h??ng v?? thanh to??n
        </Button>
      </Paper>
    </Box>
  );
}

export default MiniSuccessCart;
