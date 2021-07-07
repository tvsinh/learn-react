import React from 'react';
import PropTypes from 'prop-types';
import { Paper, makeStyles } from '@material-ui/core';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '5px',
      width: '100%',
    },
  },
  div: {
    '& img': {
      width: '500px',
    },
    [theme.breakpoints.down('md')]: {
      '& img': {
        width: '250px',
      },
      '& p': {
        fontSize: '11px',
      },
      '& span': {
        fontSize: '11px !important',
      },
      '& a': {
        fontSize: '11px',
      },
    },
  },
}));
function ProductDescription({ product = {} }) {
  const classes = useStyles();

  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} className={classes.paper}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} className={classes.div} />
    </Paper>
  );
}

export default ProductDescription;
