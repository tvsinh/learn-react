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
RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  // const phoneRegExp =
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập tên đầy đủ của bạn.')
      .test('should has at least two words', 'Vui lòng nhập ít nhất 2 từ.', (value) => {
        return value.split(' ').length >= 2;
      }),
    // phoneNumber: yup
    //   .string()
    //   .required('Please enter your phone number.')
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, 'Please check your phone number.'),
    email: yup
      .string()
      .required('Vui lòng nhập email của bạn.')
      .email('Vui lòng nhập một địa chỉ email hợp lệ.'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập ít nhất 6 kí tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng điền lại mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không hợp lệ.'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      // phoneNumber: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
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
  };

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
        <InputField name="fullName" label="Full Name" form={form} />
        {/* <InputField name="phoneNumber" label="Phone Number" form={form} /> */}
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
