import { Client4 } from 'mattermost-redux/client';
import { environment } from '../../environments/environment';

export const loginAndGetUser = async (username, password): Promise<any> => {
  console.log(username);
  Client4.setUrl(`${environment.mattermost.url}`);
  Client4.login(username, password);
  // try {
  //   Client4.login(login_id, password);
  // } catch (error) {
  //   console.error(error);
  //   return error;
  // }

  // let user;
  try {
    return Client4.getMe();
  } catch (error) {
    console.error(error);
    return error;
  }
  // return user;
};

export const displayErrorMsg = statusCode => ({});
