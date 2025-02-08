import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        new: [],
        completed: [],
        progress: [],
        canceled: [],
    },
    reducers: {
        setNewTask: (state, action) => {
            state.new = action.payload
        },
        setCompletedTask: (state, action) => {
            state.completed = action.payload
        },
        setProgressTask: (state, action) => {
            state.progress = action.payload
        },
        setCanceledTask: (state, action) => {
            state.canceled = action.payload
        },
    },
})

export const { setNewTask, setCompletedTask, setProgressTask, setCanceledTask } = taskSlice.actions

export default taskSlice.reducer