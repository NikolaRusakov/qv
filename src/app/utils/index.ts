import { Client4 } from 'mattermost-redux/client';

export const loginAndGetUser = (username, password): Promise<any> => {
  try {
    Client4.login(username, password);
  } catch (error) {
    return error;
  }

  try {
    return Client4.getMe();
  } catch (error) {
    return error;
  }
};
