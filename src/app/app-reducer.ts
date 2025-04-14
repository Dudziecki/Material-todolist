import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";

// const initialState = {
//     themeMode: 'light' as ThemeMode,
// }

export const _changeThemeModeAC=createAction<{ themeMode: ThemeMode }>('app/changeThemeMode');
export const appSlice=createSlice({
    name:'app',
    initialState:{
        themeMode: "light" as ThemeMode,
    },
    reducers:create=>({
        changeThemeModeAC:create.reducer<{themeMode:ThemeMode}>((state, action)=>{
            state.themeMode = action.payload.themeMode
        })
    })
})
// export const _appReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//             // логика мутабельного изменения стейта при изменении темы
//
//             state.themeMode=action.payload.themeMode
//         })
// })
export const { changeThemeModeAC } = appSlice.actions
export const appReducer=appSlice.reducer
export type ThemeMode = 'dark' | 'light'