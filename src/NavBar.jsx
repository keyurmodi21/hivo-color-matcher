import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{ background: 'linear-gradient(45deg,#0065b5,#2947ff 40%,#09437f)' }}
        >
          <Typography variant="subtitle1" color="inherit">
            Color Matcher
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
