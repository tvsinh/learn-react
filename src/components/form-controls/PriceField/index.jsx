import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

PriceField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

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
}));

function PriceField(props) {
  const classes = useStyles();
  const { form, name, disabled } = props;
  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box className={classes.box}>
            <OutlinedInput
              id={name}
              // type="number"
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </Box>
        )}
      />

      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PriceField;
