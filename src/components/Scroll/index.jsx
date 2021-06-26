// import IconButton from '@material-ui/core/IconButton';
// import { makeStyles } from '@material-ui/core/styles';
// import Zoom from '@material-ui/core/Zoom';
// import { KeyboardArrowUp } from '@material-ui/icons';
// import React, { useEffect, useState } from 'react';

// const useStyles = makeStyles((theme) => ({
//   '@global': {
//     '@keyframes scrollTop': {
//       from: {
//         transform: 'translateY(1px)',
//       },
//       to: {
//         transform: 'translateY(-1px)',
//       },
//     },
//   },
//   toTop: {
//     zIndex: 1,
//     position: 'fixed',
//     bottom: '2vh',
//     width: '15px',
//     height: '15px',
//     color: '#fff',
//     backgroundColor: theme.palette.primary.main,
//     '&:hover, &.Mui-focusVisible': {
//       transition: '0.3s',
//       backgroundColor: theme.palette.primary.light,
//     },
//     [theme.breakpoints.up('xs')]: {
//       right: '0.7%',
//       // left: '1.5%',
//     },
//     [theme.breakpoints.up('lg')]: {
//       right: '0.7%',
//     },
//   },
//   iconUp: {
//     // '-webkit-animation': 'scrollTop .5s ease alternate infinite',
//     // animation: `scrollTop 900ms ${theme.transitions.easing.easeInOut}`,
//     animation: '$scrollTop .5s ease infinite alternate',
//     transform: 'scale(1)',
//   },
// }));
// const Scroll = ({ showBelow }) => {
//   const classes = useStyles();

//   const [show, setShow] = useState(showBelow ? false : true);

//   const handleScroll = () => {
//     if (window.pageYOffset > showBelow) {
//       if (!show) setShow(true);
//     } else {
//       if (show) setShow(false);
//     }
//   };

//   const handleClick = () => {
//     window[`scrollTo`]({ top: 0, behavior: `smooth` });
//   };

//   useEffect(() => {
//     if (showBelow) {
//       window.addEventListener(`scroll`, handleScroll);
//       return () => window.removeEventListener(`scroll`, handleScroll);
//     }
//   });

//   return (
//     <div>
//       {show && (
//         <Zoom
//           in={true}
//           timeout={{
//             appear: 800,
//             enter: 800,
//             exit: 800,
//           }}
//         >
//           <IconButton
//             onClick={handleClick}
//             className={classes.toTop}
//             aria-label="to top"
//             component="span"
//           >
//             <KeyboardArrowUp fontSize="inherit" className={classes.iconUp} />
//           </IconButton>
//         </Zoom>
//       )}
//     </div>
//   );
// };
// export default Scroll;
