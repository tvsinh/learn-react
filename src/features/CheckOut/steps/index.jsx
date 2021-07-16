import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Payment from '../components/Payment';
import PlaceOrder from '../components/PlaceOrder';
import Shipping from '../components/Shipping';
import { useSelector, useDispatch } from 'react-redux';
import { setStep } from 'features/Cart/cartSlice';
import { Room, DoneOutline, PaymentOutlined } from '@material-ui/icons';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: 'rgb(0, 182, 240)',
      // backgroundColor: 'rgb(240 199 0)',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: 'rgb(0, 182, 240)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundColor: 'rgb(0, 182, 240)',
    backgroundColor: 'rgb(255, 66, 78)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: 'rgb(0, 182, 240)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Room />,
    2: <PaymentOutlined />,
    3: <DoneOutline />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Địa chỉ giao hàng', 'Thanh toán & Giao hàng', 'Đặt mua'];
}

function getStepContent(step) {
  const handleOnSubmit = (values) => {
    console.log('steps :', values);
  };
  const handleChange = (values) => {
    console.log('steps Change :', values);
  };
  switch (step) {
    case 0:
      return <Shipping onSubmit={handleOnSubmit} />;
    case 1:
      return <Payment onChange={handleChange} />;
    case 2:
      return <PlaceOrder />;
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const step = useSelector((state) => state.cart.step);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState();
  const steps = getSteps();
  useEffect(() => {
    setActiveStep(step);
  }, [step]);
  // const handleNext = () => {
  //   // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   dispatch(setStep(step + 1));
  // };

  // const handleBack = () => {
  //   // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   dispatch(setStep(step - 1));
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
      </div>
    </div>
  );
}
