import { Tuple, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'


import authReducer from './slices/authSlice';

const Store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: process.env.REACT_APP_NODE_ENV !== 'prod',
    preloadedState: {
        auth: { accessToken: '' }
    },
    middleware: () => new Tuple(thunk)
})


export default Store;