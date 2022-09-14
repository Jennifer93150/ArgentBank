import { createStore} from "https://cdn.skypack.dev/redux@4.0.5";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 
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
  loading: true,
  connected: false,
  token:"",
};

export const setToken = (value) => ({ 
  type: "setToken",
  payload: value,
});

export const setUserInfo = (value) => ({ 
  type: "setUserInfo",
  payload: value,
});

export const emptyState = () => ({ 
  type: "emptyState",
});

export const removeStorage = () => ({ 
  type: "removeStorage",
});


export function reducer(state = initialState, action) {
  
  if (action.type === 'setToken') {
      return{
        ...state,
        loading: false,
        connected: true, 
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
      loading: true,
      connected: false,
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




