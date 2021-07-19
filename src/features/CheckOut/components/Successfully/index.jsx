import React from 'react';
import { Container, Box, makeStyles, Typography, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: '100vh',
  },
  box: {
    paddingTop: '30vh',
  },
  success: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    marginRight: 'auto',
    marginLeft: 'auto',
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
    history.push('/products');
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
                  Tiếp tục mua sắm
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