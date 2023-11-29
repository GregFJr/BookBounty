const User = require('../models/User');

const resolvers = {
    Query: {
      // Query to fetch a user's saved books
      userSavedBooks: async (_, { userId }) => {
        try {
          const user = await User.findById(userId).populate('savedBooks');
          return user.savedBooks;
        } catch (error) {
          console.log(error);
          throw new Error("Error retrieving user's saved books");
        }
      },
    },
  
    Mutation: {
      // Mutation to add a book to a user's saved books
      addBookToSaved: async (_, { userId, bookDetails }) => {
        try {
          return await User.findByIdAndUpdate(
            userId,
            { $push: { savedBooks: bookDetails } },
            { new: true, runValidators: true }
          );
        } catch (error) {
          console.log(error);
          throw new Error("Error saving book");
        }
      },
  
      // Mutation to remove a book from a user's saved books
      removeBookFromSaved: async (_, { userId, bookId }) => {
        try {
          return await User.findByIdAndUpdate(
            userId,
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
        } catch (error) {
          console.log(error);
          throw new Error("Error removing book");
        }
      },
  
      // Additional mutations for user creation, login, etc., can be added here
    },
  
    // Additional resolvers for custom fields in types if needed
  };
  
  module.exports = resolvers;
  