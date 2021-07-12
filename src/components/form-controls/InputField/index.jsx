import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  titleEdit: PropTypes.string,
};

function InputField(props) {
  const { form, name, label, disabled, titleEdit } = props;

  const {
    formState: { errors },
  } = form;
  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value = titleEdit, name } }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id="filled-error-helper-text"
          error={hasError}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

export default InputField;
