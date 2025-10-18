export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null };
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload?.user};
    case 'SIGNUP_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload?.user};
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default authReducer;