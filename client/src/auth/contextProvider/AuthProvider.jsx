import React, { createContext, useReducer } from "react";
import authReducer, { initialState } from "../Reducers/auth";
import api from "../../network/interceptors";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (userData) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
      const response = await api.post("/auth/signup", userData);
      console.log("response", response);
      const data = response.data;
      dispatch({ type: "SIGNUP_SUCCESS", payload: data });
      return response;
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: "SIGNUP_FAILURE",
        payload: error?.response?.data?.msg || error.message,
      });
    }
  };

  const login = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await api.post("/auth/login", userData);
      const data = response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error?.response?.data?.msg || error.message,
      });
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.message });
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
