import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Call, Language, MailOutline, Room } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    // zIndex: '1',
    left: '0',
    right: '0',
    backgroundColor: '#FFF',
  },
  footer: {
    marginTop: '10px',
    padding: '0 0 20px 0',
    borderTop: 'solid 1px rgba(89, 89, 89, 0.2)',

    '& p': {
      lineHeight: '1.9',
    },
  },
  footerItem: {
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px',
    },
  },
  footerLogo: {
    width: '230px',
    height: '51px',
    [theme.breakpoints.down('md')]: {
      width: '200px',
      height: '47px',
    },
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
  },
  social: {
    '& > a': {
      marginRight: '10px',
    },
  },
  buy: {
    padding: theme.spacing(0, 0, 0.5, 0),
    '& > img': {
      marginRight: '10px',
    },
  },
  bottom: {
    borderTop: 'solid 1px rgba(89, 89, 89, 0.2)',
    textAlign: 'center',
    padding: '5px 0',
    color: '#3f51b5',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Footer() {
  const history = useHistory();
  const classes = useStyles();
  const handleGoTodoApp = () => {
    history.push('/todos');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.footer}>
        <Container fixed>
          <Grid container>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.footerItem}>
              <Typography>&nbsp;</Typography>
              <img src="/Logo-shop.png" alt="logo" className={classes.footerLogo} />
              <Box className={classes.infoItem}>
                <Room />
                <Typography>&nbsp;Ton Duc Thang, Da Nang</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <Call />
                <Typography>&nbsp;0789.789.789</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <MailOutline />
                <Typography>&nbsp;React.shop@gmail.com</Typography>
              </Box>
              <Box className={classes.infoItem}>
                <Language />
                <Typography>&nbsp;www.reactshop.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.footerItem}>
              <Typography>&nbsp;</Typography>
              <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
              <Grid item className={classes.social}>
                <a href="https://www.fb.com/tvs.Y1" target="_blank" rel="noreferrer noopener">
                  <img src="/facebook.png" alt="logo" width="32px" height="32px" />
                </a>
                <a href="https://www.instagram.com/__t.v.s/" target="_blank" rel="noreferrer">
                  <img src="/instagram.png" alt="logo" width="32px" height="32px" />
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                  <img src="/youtube.png" alt="logo" width="32px" height="32px" />
                </a>
                <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                  <img src="/twitter.png" alt="logo" width="32px" height="32px" />
                </a>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.footerItem}>
              <Typography>&nbsp;</Typography>
              <h4>GIỜ MỞ CỬA</h4>
              <Typography> T2-T6: 8.00am – 6.00pm</Typography>
              <Typography> T7-CN: 8.30am – 11.00pm</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.footerItem}>
              <Typography>&nbsp;</Typography>
              <h4>PHƯƠNG THỨC THANH TOÁN</h4>
              <Grid item className={classes.buy}>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/visa.svg"
                  alt="logo"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/mastercard.svg"
                  alt="mastercard"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/jcb.svg"
                  alt="jcb"
                />
              </Grid>
              <Grid item className={classes.buy}>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/cash.svg"
                  alt="cash"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/internet-banking.svg"
                  alt="internet banking"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/installment.svg"
                  alt="installment"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.bottom}>
        <Typography onClick={handleGoTodoApp}>Open Todo App</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
