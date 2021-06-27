import { Zoom } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import React from 'react';
// import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@keyframes scrollTop': {
      from: {
        transform: 'translateY(1px)',
      },
      to: {
        transform: 'translateY(-1px)',
      },
    },
  },
  root: {
    zIndex: '1',
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(1),
  },
  iconUp: {
    // '-webkit-animation': 'scrollTop .5s ease alternate infinite',
    animation: '$scrollTop .5s ease alternate infinite',
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleClick = (event) => {
    // const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    // if (anchor) {
    //   anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // }
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  // if (trigger) {
  //   return (
  //     <div onClick={handleClick} role="presentation" className={classes.root}>
  //       {children}
  //     </div>
  //   );
  // } else {
  //   return null;
  // }

  return (
    <Zoom
      in={trigger}
      timeout={{
        appear: 700,
        enter: 700,
        exit: 700,
      }}
    >
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};
export default function BackToTop(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon className={classes.iconUp} />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
