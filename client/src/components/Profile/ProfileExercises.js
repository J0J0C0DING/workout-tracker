import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Typography } from '@mui/material';

function generateExercises(loadExercises) {
  console.log(loadExercises);
  if (!loadExercises) {
    return console.log('You have no saved exercises!');
  }

  return loadExercises.map(exercise => (
    <ListItem key={exercise._id} id={exercise._id} sx={{ padding: 0 }}>
      <ListItemText
        primary={`${exercise.exerciseName}`}
        secondary={`${exercise.exerciseCategory}`}
      />
    </ListItem>
  ));
}

// Generate page
function ProfileExercises({ exercises }) {
  // Pull exercises from userData and set to exercises array

  let loadExercises = exercises ? exercises.slice(0, 3) : null;

  let totalExercises = loadExercises ? exercises.length - 3 : null;

  return (
    <section>
      {/* Create list with exercises */}
      <List sx={{ paddingTop: 0 }}>
        {loadExercises ? generateExercises(loadExercises) : ''}

        {totalExercises > 0 ? (
          <Typography variant="overline" key="id">
            <Link
              href="/exercises"
              sx={{ padding: 0, color: 'gray', textDecoration: 'underlined' }}
            >{`+ ${totalExercises} more`}</Link>
          </Typography>
        ) : (
          ''
        )}
      </List>
    </section>
  );
}

export default ProfileExercises;
