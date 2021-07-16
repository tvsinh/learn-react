import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { setStep } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

PlaceOrder.propTypes = {
  onSubmit: PropTypes.func,
};

function PlaceOrder({ onSubmit }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(setStep(0));

    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <div>
      <Button
        // className={classes.submit}
        // disabled={isSubmitting}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleSubmit}
      >
        Next
      </Button>
    </div>
  );
}

export default PlaceOrder;
