import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

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

function QuantityField(props) {
  const classes = useStyles();

  const { form, name, label, disabled } = props;
  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = !!errors[name];

  const handleDownValue = (value) => {
    setValue(name, Number.parseInt(value) > 1 ? Number.parseInt(value) - 1 : 1);
  };
  const handleUpValue = (value) => {
    setValue(name, Number.parseInt(value) >= 1 ? Number.parseInt(value) + 1 : 1);
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
                onClick={() => handleDownValue(value)}
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
                onClick={() => handleUpValue(value)}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          )}
        />

        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default QuantityField;
