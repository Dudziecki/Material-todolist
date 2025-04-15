import {FilterValues, Todolist} from "../../../app/App.tsx";
import {createSlice, nanoid} from "@reduxjs/toolkit";


// Типизация для возможных действий

// const initialState: Todolist[] = []
//
// export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
// export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')
// export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
//     return {payload: {title, id: nanoid()}}
// })
// export const changeTodolistFilterAC = createAction<{
//     id: string,
//     filter: FilterValues
// }>('todolists/changeTodolistFilter')
export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as Todolist[],
    reducers: create => ({
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        }),
        changeTodolistTitleAC: create.reducer<{ id: string, title: string }>((state, action) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        }),
        createTodolistAC: create.preparedReducer(
            (title: string) => ({payload: {title, id: nanoid()}}),
            (state, action) => {
                state.push({...action.payload, filter: 'all'})
            },
        ),
        changeTodolistFilterAC: create.reducer<{
            id: string,
            filter: FilterValues
        }>((state, action) => {
            const todolist = state.find(tdl => tdl.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })

    })
})
// export const _todolistsReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(deleteTodolistAC, (state, action) => {
//             const index = state.findIndex(tdl => tdl.id === action.payload.id)
//             if (index !== -1) {
//                 state.splice(index, 1)
//             }
//
//         })
//         .addCase(changeTodolistTitleAC,(state, action)=>{
//             const index = state.findIndex(tdl => tdl.id === action.payload.id)
//             if (index !== -1) {
//                 state[index].title = action.payload.title
//             }
//         })
//         .addCase(createTodolistAC,(state,action)=>{
//             state.unshift({...action.payload,filter:'all'})
//         })
//         .addCase(changeTodolistFilterAC,(state, action)=>{
//             const todolist=state.find(tdl=>tdl.id===action.payload.id)
//             if(todolist){
//                 todolist.filter=action.payload.filter
//             }
//         })
// })
export const {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC
} = todolistsSlice.actions
export const todolistsReducer=todolistsSlice.reducer



