import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 2, 0),
  },

  submit: {
    margin: theme.spacing(2, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(0),
    left: 0,
    right: 0,
  },
}));
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email address.')
      .email('Please enter a valid email address.'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Please enter at least 6 characters.'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
      username: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    if (isSubmitSuccessful) {
      form.reset();
    }
    console.log('Data', values);
  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
