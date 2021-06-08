import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease } from './counterSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
    marginRight: '4px',
  },
});

CouterFeature.propTypes = {};

function CouterFeature(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const handleDecreaseClick = () => {
    const action = decrease();
    dispatch(action);
  };

  const handleIncreaseClick = () => {
    const action = increase();
    dispatch(action);
  };
  return (
    <div>
      <div style={{ marginLeft: '70px', border: '1px solid', width: '100px', paddingLeft: '20px' }}>
        Counter: {counter}
      </div>
      <div>
        <Button className={classes.root} onClick={handleDecreaseClick}>
          Decrease
        </Button>
        <Button className={classes.root} onClick={handleIncreaseClick}>
          Increase
        </Button>
      </div>
    </div>
  );
}

export default CouterFeature;
