import { createContext } from 'react';

export const initialState = {
  token: null,
  user: {
    username: ''
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'token':
      return { ...state, token: action.payload };
    case 'logout':
      return initialState;
  }
};
export const StateContext = createContext();
export const DispatchContext = createContext();
