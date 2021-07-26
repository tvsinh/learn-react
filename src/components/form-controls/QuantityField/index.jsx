import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { removeFromCart, setQuantity } from 'features/Cart/cartSlice';
import useProductDetail from 'hook/useProductDetail';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,

  data: PropTypes.object,
  cartQty: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
  input: {
    width: '80px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { form, name, label, disabled, data, cartQty = false } = props;
  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = !!errors[name];

  const { product } = useProductDetail(data?.product.id);

  const handleButtonNo = () => {
    setOpen(false);
  };
  const handleButtonYes = () => {
    setOpen(false);
    dispatch(
      removeFromCart({
        idNeedToRemove: data.product.id,
      })
    );
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleDownValue = (value) => {
    setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
  };
  const handleUpValue = (value) => {
    setValue(name, Number.parseInt(value) >= 1 ? Number.parseInt(value) + 1 : 1);
  };
  const handleDownDispatch = async (value) => {
    if (Number.parseInt(value) - 1 >= 1) {
      await setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
      dispatch(
        setQuantity({
          id: data.product.id,
          quantity: Number.parseInt(value) > 1 ? Number.parseInt(value) - 1 : 1,
        })
      );
    }
    if (Number.parseInt(value) - 1 < 1) {
      setOpen(true);
    }
  };
  const handleUpDispatch = async (value) => {
    if (Number.parseInt(value) + 1 <= Number.parseInt(product.quantity)) {
      await setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
      dispatch(
        setQuantity({
          id: data.product.id,
          quantity: Number.parseInt(value) ? Number.parseInt(value) + 1 : 1,
        })
      );
    } else if (Number.parseInt(value) + 1 > Number.parseInt(product.quantity)) {
      enqueueSnackbar(`Sản phẩm ${product.name} số lượng tối đa là ${product.quantity}.`, {
        variant: 'info',
      });
    }
  };

  return (
    <>
      <FormControl
        error={hasError}
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        style={{ marginTop: '0' }}
      >
        <Typography>{label}</Typography>

        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Box className={classes.box}>
              <IconButton
                disabled={disabled}
                onClick={() => (cartQty ? handleDownDispatch(value) : handleDownValue(value))}
              >
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                type="number"
                disabled={disabled}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={classes.input}
              />

              <IconButton
                disabled={disabled}
                onClick={() => (cartQty ? handleUpDispatch(value) : handleUpValue(value))}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />
        {cartQty ? (
          <FormHelperText style={{ textAlign: 'center' }}>{errors[name]?.message}</FormHelperText>
        ) : (
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        )}
      </FormControl>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title" style={{ width: '30vw' }}>
          <Typography>Bạn muốn xóa sản phẩm này?</Typography>
        </DialogTitle>

        <DialogActions
          style={{ display: 'flex', justifyContent: 'center', padding: '5px 20px 20px' }}
        >
          <Button
            onClick={handleButtonNo}
            color="primary"
            variant="outlined"
            style={{ minWidth: '12.5vw' }}
          >
            Không
          </Button>
          <Button
            onClick={handleButtonYes}
            variant="contained"
            style={{ minWidth: '12.5vw', backgroundColor: 'rgb(255, 66, 78)', color: '#FFF' }}
            autoFocus
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuantityField;
