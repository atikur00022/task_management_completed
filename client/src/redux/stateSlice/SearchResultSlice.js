import { createSlice } from '@reduxjs/toolkit';

export const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState: {
        results: [],
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.results = action.payload;
        },
        clearSearchResult: (state) => {
            state.results = [];
        },
    },
});

export const { setSearchResult, clearSearchResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;
