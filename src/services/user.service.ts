import { Users } from "../model/userModel";

class UserService {
  getUser = (param: any) => Users.findOne(param);

  userCreate = (param: any) => Users.create(param);
}

export default new UserService();
