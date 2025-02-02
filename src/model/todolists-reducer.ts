import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


// Типизация для возможных действий

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }

        })
        .addCase(changeTodolistTitleAC,(state, action)=>{
            const index = state.findIndex(tdl => tdl.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(createTodolistAC,(state,action)=>{
            state.unshift({...action.payload,filter:'all'})
        })
        .addCase(changeTodolistFilterAC,(state, action)=>{
            const todolist=state.find(tdl=>tdl.id===action.payload.id)
            if(todolist){
                todolist.filter=action.payload.filter
            }
        })
})




