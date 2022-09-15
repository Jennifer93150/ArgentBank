import { createStore} from "https://cdn.skypack.dev/redux@4.0.5";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 
/**
 * State
 */
const initialState = {
  userLoginInfo:{
    email: "",
    password: "",
  },
  userInfo:{
    firstName: "",
    lastName: "",
    id: "",
  },
  token: null,
};

export const setToken = (token) => ({ 
  type: "setToken",
  payload: token,
});

export const setUserInfo = (userInfo) => ({ 
  type: "setUserInfo",
  payload: userInfo,
});

export const emptyState = () => ({ 
  type: "emptyState",
});

export const removeStorage = () => ({ 
  type: "removeStorage",
});

/**
 * Reducer
 * @param {object} state 
 * @param {string} action 
 * @returns {object}
 */
export function reducer(state = initialState, action) {
  
  if (action.type === 'setToken') {
      return{
        ...state,
        token: action.payload,
    }
  }
  if (action.type === 'setUserInfo') {
    return{
      ...state,
      userLoginInfo:{
        email: action.payload.email,
        password: action.payload.password,
      },
      userInfo:{
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.id,
      }, 
    }
  }
  if (action.type === 'emptyState') {
    return{
      ...state,
      userLoginInfo:{
        email: "",
        password: "",
      },
      userInfo:{
        firstName: "",
        lastName: "",
        id: "",
      },
      token:"",
    }
    
  }
  if (action.type === 'removeStorage') {
    storage.removeItem('persist:root');
  }
  // Otherwise we return the state without changing it
  return state;
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

// We create the store with the state and the reducer
export const store = createStore(persistedReducer);
export const state = store.getState();
export const persistor = persistStore(store);




