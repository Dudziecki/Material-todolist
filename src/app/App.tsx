import './App.css'
import { CssBaseline} from "@mui/material"
import {ThemeProvider } from '@mui/material/styles'
import {useAppSelector} from "../common/hooks/useAppSelector.ts"

import {getTheme} from "../common/theme/theme.ts"
import {Header} from "@/common/components/Header/Header.tsx"
import {Main} from "@/app/Main.tsx"
import {selectThemeMode} from "@/app/app-slice.ts";

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'
// Record<string, TaskItem[]>
export type TasksState = {
  [key:string]:Task[]
}


export const App = () => {

  const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header/>
          <Main/>
        </ThemeProvider>


      </div>
  )
}
