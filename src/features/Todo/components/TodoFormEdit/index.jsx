import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

TodoFormEdit.propTypes = {
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  titleEdit: PropTypes.string,
};

function TodoFormEdit({ onSubmit, onClick, titleEdit = '' }) {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter title.')
      .min(5, 'Title is too short, at least 5 characters.'),
  });

  const form = useForm({
    // set defaultValues, because form did not change (onClick edit).
    defaultValues: {
      title: titleEdit,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values, e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
    console.log('Todo form edit', values);
  };
  const handleCancelClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="title" label="Edit Title For Todo" form={form} titleEdit={titleEdit} />
        <Button variant="contained" color="primary" type="submit" style={{ lineHeight: '1.4' }}>
          Edit
        </Button>
        <Button
          style={{ marginLeft: '9px', lineHeight: '1.4' }}
          variant="contained"
          color="primary"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </form>
    </>
  );
}

export default TodoFormEdit;
