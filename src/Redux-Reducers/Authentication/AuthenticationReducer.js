const initialState = { username: "", isLoggedIn: false, accessToken: "" };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_LOGIN_REQUEST":
      return {
        user: action.user,
      };
    case "USERS_LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        username: action.username,
        accessToken: action.accessToken,
      };
    case "USERS_LOGIN_FAILURE":
      return action.message;

    default:
      return state;
  }
};
export const selectAuthentication = (state) => state.user;
