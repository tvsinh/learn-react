import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import useProductDetail from 'hook/useProductDetail';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
  productId: PropTypes.string,
};

function AddToCartForm({ onSubmit = null, productId }) {
  const [disabled, setDisabled] = useState(false);
  const { product, loading } = useProductDetail(productId);
  useEffect(() => {
    if (product.quantity < 1) {
      setDisabled(true);
    }
  }, [product]);
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Vui lòng nhập số lượng')
      .min(1, 'Giá trị nhỏ nhất là 1')
      .max(product.quantity, `Số sản phẩm còn lại trong kho là ${product.quantity}`)
      .typeError('Vui lòng nhập số lượng'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <>
      {loading ? (
        <LinearProgress style={{ width: '225px' }} />
      ) : (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <QuantityField name="quantity" label="Số Lượng" form={form} disabled={disabled} />
          {product.quantity < 1 ? (
            <Typography style={{ marginBottom: '3px' }}>Hết hàng</Typography>
          ) : (
            <Typography style={{ marginBottom: '3px' }}>
              Còn trong kho {product.quantity}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: '220px' }}
            size="large"
            disabled={disabled}
          >
            Thêm vào giỏ hàng
          </Button>
        </form>
      )}
    </>
  );
}

export default AddToCartForm;
