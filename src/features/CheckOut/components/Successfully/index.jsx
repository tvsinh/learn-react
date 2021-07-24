import React from 'react';
import { Container, Box, makeStyles, Typography, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    paddingTop: '21vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingTop: '10vh',
    },
  },
  success: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    minHeight: '20vh',
    marginRight: 'auto',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // margin: '0',
      padding: '10px',
      minHeight: '25vh',
      width: '100%',
    },
  },
  successText: {
    color: 'rgb(238, 35, 71)',
    fontSize: '22px',
    marginBottom: '10px',
  },
  successButton: {},
}));
function Successfully() {
  const classes = useStyles();
  const history = useHistory();
  const handleCartClick = () => {
    history.push('/account');
  };
  return (
    <>
      <Box>
        <Container className={classes.root}>
          <Box className={classes.box}>
            <Paper className={classes.success}>
              <Typography className={classes.successText}>Đặt hàng thành công!</Typography>
              <Box className={classes.successButton}>
                <Button variant="outlined" color="primary" onClick={handleCartClick}>
                  Xem giỏ hàng
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Successfully;
