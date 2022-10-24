import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Typography } from '@mui/material';
import RoutineCard from '../routineCard';

function generateRoutines(loadRoutines) {
  if (!loadRoutines) {
    return console.log('You have no saved Routines!');
  }

  return loadRoutines.map(routine => <RoutineCard key={routine._id} routine={routine} />);
}

// Generate page
function ProfileRoutines({ routines }) {
  // Pull Routines from userData and set to Routines array
  let loadRoutines = routines ? routines.slice(0, 3) : null;
  let totalRoutines = loadRoutines ? routines.length - 3 : null;

  return (
    <section>
      {/* Create list with Routines */}
      <List sx={{ paddingTop: 0 }}>
        {loadRoutines ? generateRoutines(loadRoutines) : ''}
        {totalRoutines > 0 ? (
          <Typography variant="overline" key="id">
            <Link
              href="/routines"
              sx={{ padding: 0, color: 'gray', textDecoration: 'underlined' }}
            >{`+ ${totalRoutines} more`}</Link>
          </Typography>
        ) : (
          ''
        )}
      </List>
    </section>
  );
}

export default ProfileRoutines;
