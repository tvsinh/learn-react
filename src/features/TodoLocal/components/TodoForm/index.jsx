import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@material-ui/core';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm({ onSubmit }) {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter title.')
      .min(5, 'Title is too short, at least 5 characters.'),
  });
  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }

    form.reset();
    console.log('Todo form add', values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="title" label="Enter new todo..." form={form} />
      <Button variant="contained" color="primary" type="submit" style={{ lineHeight: '1.4' }}>
        Add Todo
      </Button>
    </form>
  );
}

export default TodoForm;
