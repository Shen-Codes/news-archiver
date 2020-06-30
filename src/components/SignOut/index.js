import React from 'react';
import { Button } from '@material-ui/core';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
   <Button
      type="Button"
      size="small"
      variant="contained"
      onClick={firebase.doSignOut}
   >
      Sign Out
   </Button>
);

export default withFirebase(SignOutButton);
