import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Payment from '../components/Payment';
import PlaceOrder from '../components/PlaceOrder';
import Shipping from '../components/Shipping';
import { useSelector } from 'react-redux';

import { Room, DoneOutline, PaymentOutlined } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import Successfully from '../components/Successfully';

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
    width: 40,
    height: 40,
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
    minHeight: '90vh',
  },
  stepper: {
    padding: '15px 0 5px 0',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2) ',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      width: '100%',
      marginTop: theme.spacing(7),
    },
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      width: '100%',
      marginTop: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      width: '100%',
      marginTop: theme.spacing(5.5),
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      position: 'absoflute',
      width: '100%',
      paddingTop: theme.spacing(20),
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absoflute',
      width: '100%',
      paddingTop: theme.spacing(18.5),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absoflute',
      width: '100%',
      paddingTop: theme.spacing(21),
    },
  },
}));

function getSteps() {
  return ['Địa chỉ giao hàng', 'Thanh toán & Giao hàng', 'Đặt mua'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Shipping />;
    case 1:
      return <Payment />;
    case 2:
      return <PlaceOrder />;
    case 3:
      return <Successfully />;
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const step = useSelector((state) => state.order.step);

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState();
  const steps = getSteps();
  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  return (
    <Box className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box className={classes.instructions}>{getStepContent(activeStep)}</Box>
    </Box>
  );
}
