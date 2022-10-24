const { AuthenticationError } = require('apollo-server-express');
const { User, Routine, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        //        const userData = await User.findOne({_id: context.user._id})
        const userData = await User.findById({ _id: context.user._id })
          .select('-__v -password')
          .populate('routines')
          .populate('exercises');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('routines')
        .populate('exercises');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('routines')
        .populate('exercises');
    },
    // needs more work
    routines: async (parent, { _id }) => {
      return Routine.find()
        .sort({ createdAt: -1 })
        .populate('exercises');
    },
    routine: async (parent, { _id }) => {
      return Routine.findOne({ _id }).populate('exercises');
    },
    exercise: async (parent, { _id }) => {
      return Exercise.findOne({ _id });
    },
    exercises: async (parent, { _id }) => {
      return Exercise.find().select('-__v');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // addRoutine: async (parent, { routineName, exercises }, context) => {
    //   console.log(routineName, exercises);
    //   console.log(context.user._id);
    //   if (context.user) {

    //     const newRoutine = await Routine.create(
    //       {userId: `${context.user._id}`,
    //       routineName: routineName,
    //       exercises: exercises}
    //     );
    //     console.log(newRoutine);
    //     const savedRoutine = await User.findByIdAndUpdate(
    //       {_id: context.user._id},
    //       {$push: {routines: newRoutine._id}},
    //       {new: true}
    //     );

    //     return savedRoutine;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    addRoutine: async (parent, args, context) => {
      console.log(args);
      const exerciseArr = args.exercises;
      // console.log('ExerciseArr', exerciseArr);
      if (context.user) {
        const routine = await Routine.create({
          routineName: args.routineName,
          userId: context.user._id,
          exercises: exerciseArr,
        });
        // console.log('Routine', routine);
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { routines: routine } },
          { new: true }
        );

        return routine;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    deleteRoutine: async (parent, args, context) => {
      if (context.user) {
        const routine = await Routine.deleteOne({ ...args });

        await Routine.findByIdAndDelete(args.id);

        return routine;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateRoutine: async (parent, args, context) => {
      if (context.user) {
        console.log(args);
        const routineName = args.routineName;
        const routineId = args.id;
        console.log(args.exercises);
        const exercises = args.exercises;
        const routine = await Routine.findByIdAndUpdate(routineId, {
          routineName: routineName,
          exercises: exercises,
        });
        // console.log(routine)
        // await routine.findByIdAndUpdate(args.id);

        return routine;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addExercise: async (parent, args, context) => {
      console.log({ ...args });
      if (context.user) {
        const exerciseInputs = args.input;
        const exercise = await Exercise.create({ ...exerciseInputs });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { exercises: exercise } },
          { new: true }
        );

        return exercise;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    deleteExercise: async (parent, args, context) => {
      if (context.user) {
        const exercise = await Exercise.deleteOne({ ...args });

        await Exercise.findByIdAndDelete(args.id);

        return exercise;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateExercise: async (parent, args, context) => {
      if (context.user) {
        console.log(args);
        const updateInputs = args.input;
        const exerciseId = args.id;
        console.log(exerciseId);
        const exercise = await Exercise.findByIdAndUpdate(exerciseId, { ...updateInputs });
        // console.log(exercise)
        // await Exercise.findByIdAndUpdate(args.id);

        return exercise;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
