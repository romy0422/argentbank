import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from './user/reducerUser';
import { loginReducer } from './login/reducerLogin';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// gère la valeur du token et du status de la connection dans le cache du navigateur avec redux persist
// la configuration ici active ou desactive la mise en cache de la valeur choisie
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

// configure redux persist, informe ce qui sera stocké dans le cache
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userLogin', 'userProfile'],
  transforms: [LoginTransform], 
};

// conbine les reducers
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
