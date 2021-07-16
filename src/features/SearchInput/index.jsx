import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {},

  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },

    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
  },

  searchIcon: {
    color: fade(theme.palette.common.black, 0.5),
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: fade(theme.palette.common.black, 1),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    width: '90ch',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(1, 1, 1, 5),
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

SearchInput.propTypes = {
  onSubmit: PropTypes.func,
};

function SearchInput({ onSubmit = {} }) {
  const classes = useStyles();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params['_q']) {
      const valueSearch = params['_q'];
      setSearchTerm(valueSearch);
    } else {
      setSearchTerm('');
    }
  }, [location.search]);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (value.length > 0) {
        onSubmit(value);
      } else {
        return null;
      }
    }, 500);
  };
  const handleOnkeyUp = (e) => {
    // if (e.keyCode === 13) {
    //   console.log(e.keycode);
    //   if (!onSubmit) return;
    //   let value = e.target.value;
    //   value = value.trim();
    //   if (value.length > 0) {
    //     onSubmit(value);
    //   } else {
    //     return null;
    //   }
    // }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Tìm kiếm…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyUp={handleOnkeyUp}
      ></InputBase>
    </div>
  );
}

export default SearchInput;
