import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowUp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@keyframes scrollTop': {
      from: {
        transform: 'translateY(1px)',
      },
      to: {
        transform: 'translateY(-2px)',
      },
    },
  },
  toTop: {
    zIndex: 1,
    position: 'fixed',
    bottom: '2vh',
    width: '15px',
    height: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    '&:hover, &.Mui-focusVisible': {
      transition: '0.3s',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    [theme.breakpoints.up('xs')]: {
      left: '1.5%',
    },
    [theme.breakpoints.up('lg')]: {
      right: '0.7%',
    },
  },
  iconUp: {
    // '-webkit-animation': 'scrollTop .5s ease alternate infinite',
    animation: '$scrollTop .5s ease alternate infinite',
    // animation: `scrollTop 900ms ${theme.transitions.easing.easeInOut}`,
  },
}));
const Scroll = ({ showBelow }) => {
  const classes = useStyles();

  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton
          onClick={handleClick}
          className={classes.toTop}
          aria-label="to top"
          component="span"
        >
          {/* <ExpandLessIcon /> */}
          <KeyboardArrowUp fontSize="medium" className={classes.iconUp} />
        </IconButton>
      )}
    </div>
  );
};
export default Scroll;
