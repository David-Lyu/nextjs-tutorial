import Adapters from 'next-auth/adapters';

class User extends Adapters.TypeORM.Models.User.model {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

const UserSchema = {
  name: 'User', //the name of the index?
  target: User, //user from above
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    ...Adapters.TypeORM.Models.User.schema.columns
  }
};

export const UserAdapter = {
  User: {
    model: User,
    schema: UserSchema
  }
};
// const User = {
//   firstName: '',
//   lastName: ''
// };
