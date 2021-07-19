import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  productQuantity: PropTypes.number,
};

function AddToCartForm({ onSubmit = null, productQuantity }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .max(productQuantity, `The number of products in stock is ${productQuantity}`)
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Số lượng" form={form} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: '250px' }}
        size="large"
      >
        Thêm vào giỏ hàng
      </Button>
    </form>
  );
}

export default AddToCartForm;
