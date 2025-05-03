// app/lib/models/User.ts

const User = {
  async findOne({ email }: { email: string }) {
    return null;
  },

  async create({ email, password }: { email: string; password: string }) {
    return { _id: "fake-user-id", email };
  },
};

export default User;

