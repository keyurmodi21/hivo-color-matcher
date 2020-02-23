import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '40px 0 25px',
    boxShadow: 'none'
  },
  textField: {
    width: '50%',
    marginRight: '20px'
  },
  button: {
    padding: '15px 40px',
    color: '#faff00'
  }
});
export default function ColorMatcherActionToolbar(props) {
  const classes = useStyles();

  const {
    searchField,
    handleChange,
    handleKeyDown,
    hexError,
    errorHelperText,
    handleSearch
  } = props;

  return (
    <Paper className={classes.root}>
      <TextField
        value={searchField}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label="Type HEX color code and press ENTER to search"
        id="filled-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>
        }}
        inputProps={{ maxLength: 6 }}
        variant="outlined"
        autoFocus
        error={hexError}
        helperText={errorHelperText}
        className={classes.textField}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        Search
      </Button>
    </Paper>
  );
}

ColorMatcherActionToolbar.propTypes = {
  searchField: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  hexError: PropTypes.bool.isRequired,
  errorHelperText: PropTypes.string.isRequired
};
