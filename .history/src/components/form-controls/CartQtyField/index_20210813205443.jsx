import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { removeFromCart, setQuantity } from 'features/Cart/cartSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
  iconButton: {
    [theme.breakpoints.down('md')]: {
      width: '35px',
    },
  },
  input: {
    width: '80px',
  },
  titleDia: {
    width: '30vw',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
  },
  actionsDia: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 20px 15px',
  },
  buttonNo: {
    minWidth: '12.5vw',
    [theme.breakpoints.down('md')]: {
      minWidth: '35vw',
    },
  },
  buttonYes: {
    minWidth: '12.5vw',
    backgroundColor: 'rgb(255, 66, 78)',
    color: '#FFF',
    [theme.breakpoints.down('md')]: {
      minWidth: '35vw',
    },
    '&:hover': {
      backgroundColor: 'rgb(255, 101, 110)',
    },
  },
}));

CartQtyField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,

  productId: PropTypes.string,
  quantity: PropTypes.string,
  productName: PropTypes.string,
};

function CartQtyField(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { form, name, label, disabled, productId, quantity, productName } = props;
  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = !!errors[name];

  const [open, setOpen] = React.useState(false);
  const handleButtonNo = () => {
    setOpen(false);
  };
  const handleButtonYes = () => {
    setOpen(false);
    dispatch(
      removeFromCart({
        idNeedToRemove: productId,
      })
    );
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleDownDispatch = async (value) => {
    if (Number.parseInt(value) - 1 >= 1 && Number.parseInt(value) - 1 < Number.parseInt(quantity)) {
      await setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
      dispatch(
        setQuantity({
          id: productId,
          quantity: Number.parseInt(value) > 1 ? Number.parseInt(value) - 1 : 1,
        })
      );
    } else if (Number.parseInt(value) - 1 > Number.parseInt(quantity)) {
      enqueueSnackbar(`Sản phẩm "${productName}" có số lượng tối đa là ${quantity}.`, {
        variant: 'info',
      });
    }
    if (Number.parseInt(value) - 1 < 1) {
      setOpen(true);
    }
  };
  const handleUpDispatch = async (value) => {
    if (Number.parseInt(value) + 1 <= Number.parseInt(quantity)) {
      await setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
      dispatch(
        setQuantity({
          id: productId,
          quantity: Number.parseInt(value) ? Number.parseInt(value) + 1 : 1,
        })
      );
    } else if (Number.parseInt(value) + 1 > Number.parseInt(quantity)) {
      enqueueSnackbar(`Sản phẩm "${productName}" có số lượng tối đa là ${quantity}.`, {
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
                className={classes.iconButton}
                onClick={() => handleDownDispatch(value)}
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
                className={classes.iconButton}
                onClick={() => handleUpDispatch(value)}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />

        {/* <FormHelperText style={{ textAlign: 'center' }}>{errors[name]?.message}</FormHelperText> */}
      </FormControl>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title" className={classes.titleDia}>
          <Typography>Bạn muốn xóa sản phẩm này?</Typography>
        </DialogTitle>

        <DialogActions className={classes.actionsDia}>
          <Button
            onClick={handleButtonNo}
            color="primary"
            variant="outlined"
            className={classes.buttonNo}
          >
            Không
          </Button>
          <Button
            onClick={handleButtonYes}
            variant="contained"
            className={classes.buttonYes}
            autoFocus
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CartQtyField;
