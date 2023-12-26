import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from './user/reducerUser';
import { loginReducer } from './login/reducerLogin';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const LoginTransform = createTransform(
  (inboundState, key) => {
    if (key === 'userLogin' && !inboundState.rememberMe) {
      return { ...inboundState, token: null, isLogged: false };
    }
    return inboundState;
  },
  null,
  { whitelist: ['userLogin'] }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userLogin', 'userProfile'],
  transforms: [LoginTransform], 
};

const rootReducer = combineReducers({
  userLogin: loginReducer,
  userProfile: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
