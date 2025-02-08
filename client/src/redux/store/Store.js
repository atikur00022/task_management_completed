import { configureStore } from '@reduxjs/toolkit';
import settingReducer from '../state-slice/SettingSlice.js';
import taskReducer from '../state-slice/TaskSlice.js';
import summaryReducer from '../state-slice/summarySlice.js';
import profileReducer from '../state-slice/ProfileSlice.js';
import searchResultReducer from '../state-slice/SearchResultSlice.js';

export default configureStore({
    reducer: {
        setting: settingReducer,
        task: taskReducer,
        summary: summaryReducer,
        profile: profileReducer,
        searchResult: searchResultReducer,
    },
})