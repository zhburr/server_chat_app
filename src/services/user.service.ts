import { Users } from "../model/userModel";

class UserService {
  userExists = (param: any) => Users.findOne(param);

  userCreate = (param: any) => Users.create(param);
}

export default new UserService();
