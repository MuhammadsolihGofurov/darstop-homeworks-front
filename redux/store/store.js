import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../slice/settings';

const store = configureStore({
    reducer: {
        settings: settingsReducer,
    },
});

export default store;