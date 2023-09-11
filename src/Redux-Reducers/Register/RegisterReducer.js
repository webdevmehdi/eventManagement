const initialState = { registering: false };

export const register = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { registering: true };

    case "REGISTER_SUCCESS":
      return { registering: true };

    case "REGISTER_FAILURE":
    default:
      return state;
  }
};
export const selectRegister = (state) => state.user;
