import { User } from "../models/index.js";
import { signToken, AuthenticationError } from "../services/auth.js";


interface addUserArgs {
    username: string;
    email: string;
    password: string;
}

interface loginArgs {
    email: string;
    password: string;
}

interface saveBookArgs {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
}

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
        return await User.findOne({ _id: context.user._id }).populate("savedBooks");
        },
        users: async () => {
        return await User.find().populate("savedBooks");
        },
    },
    Mutation: {
        addUser: async (_parent: any, {email, username, password}: addUserArgs) => {
            const user = await User.create({email, username, password});
            if (!user) throw new AuthenticationError("Something went wrong!");
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        login: async (_parent: any, { email, password }: loginArgs) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid Credentials!");
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) throw new Error("Invalid Credentials!");
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: any, { bookId, title, authors, description, image, link }: saveBookArgs, context: any) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: {bookId, title, authors, description, image, link} } },
            { new: true, runValidators: true }
            );
            return updatedUser;
        }

        throw new Error("You need to be logged in!");
        },
        
        removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error("You need to be logged in!");
        }
    },
}

export default resolvers;