import {TasksState} from "@/app/App.tsx";

import {createSlice, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolists-slice.ts";


export const tasksSlice=createSlice({
    name:"tasks",
    initialState:{} as TasksState,
    reducers:create=>({
        deleteTaskAC:create.reducer<{ todolistId: string, taskId: string }>((state, action)=>{
            const index = state[action.payload.todolistId].findIndex(tdl => tdl.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        }),
        createTaskAC:create.reducer<{ todolistId: string, title: string, isDone: boolean }>((state, action)=>{
            state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})
        }),
        changeTaskStatusAC:create.reducer<{
            todolistId: string,
            taskId: string,
            isDone: boolean
        }>((state, action)=>{
            const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        }),
        changeTaskTitleAC:create.reducer<{
            todolistId: string,
            taskId: string,
            title: string
        }>((state, action)=>{
            const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
    }),
    extraReducers: builder => {
        builder
            .addCase(createTodolistAC, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
    },
})


export const {changeTaskTitleAC,changeTaskStatusAC,createTaskAC,deleteTaskAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer


