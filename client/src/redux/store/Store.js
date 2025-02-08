import { configureStore } from '@reduxjs/toolkit';
import settingReducer from '../stateSlice/SettingSlice.js';
import taskReducer from '../stateSlice/TaskSlice.js';
import summaryReducer from '../stateSlice/summarySlice.js';
import profileReducer from '../stateSlice/ProfileSlice.js';
import searchResultReducer from '../stateSlice/SearchResultSlice.js';

export default configureStore({
    reducer: {
        setting: settingReducer,
        task: taskReducer,
        summary: summaryReducer,
        profile: profileReducer,
        searchResult: searchResultReducer,
    },
})