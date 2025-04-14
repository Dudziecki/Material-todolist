import {createSlice} from "@reduxjs/toolkit";


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

export const { changeThemeModeAC } = appSlice.actions
export const appSlice=appSlice.reducer
export type ThemeMode = 'dark' | 'light'