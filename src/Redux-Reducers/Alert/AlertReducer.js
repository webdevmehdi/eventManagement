const initialState = { message: '' , loaded : false}; // to declare an empty string , you need to use simple quotes !!!!!!!!!!!
export const alert = (state = initialState, action) => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return { ...state, message: action.payload,loaded : true };
    case "ALERT_ERROR":
      return { ...state, message: action.payload , loaded : true};
    case "ALERT_CLEAR":
      return "";

    default:
      return state;
  }
};
export const selectAlert = (state) => state.alert;
