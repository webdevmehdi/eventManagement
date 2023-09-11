export const alertActions = {
  success,
  error,
  clear,
};

export function success(message) {
  return { type: "ALERT_SUCCESS", payload: message };
}

export function error(message) {
  return { type: "ALERT_ERROR", payload: message };
}

export function clear() {
  return { type: "ALERT_CLEAR" };
}
