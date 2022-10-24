import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// export const ADD_ROUTINE = gql`
// mutation Mutation($routineName: String!, $exercises: [String]!) {
//   addRoutine(routineName: $routineName, exercises: $exercises) {
//     _id
//     routineName
//     createdAt
//     userId
//     exercises {
//       _id
//     }
//   }
// }
// `;

export const ADD_ROUTINE = gql`
  mutation Mutation($routineName: String!, $exercises: [String]) {
    addRoutine(routineName: $routineName, exercises: $exercises) {
      _id
      routineName
      exercises {
        _id
      }
    }
  }
`;

export const DELETE_ROUTINE = gql`
  mutation Mutation($id: ID!) {
    deleteRoutine(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_ROUTINE = gql`
  mutation Mutation($updateRoutineId: ID!, $routineName: String!, $exercises: [String]) {
    updateRoutine(id: $updateRoutineId, routineName: $routineName, exercises: $exercises) {
      _id
      routineName
      exercises {
        _id
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation AddExercise($input: ExerciseInput) {
    addExercise(input: $input) {
      _id
      exerciseName
      exerciseCategory
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation Mutation($updateExerciseId: ID!, $input: ExerciseInput) {
    updateExercise(id: $updateExerciseId, input: $input) {
      _id
      exerciseName
      exerciseCategory
    }
  }
`;
