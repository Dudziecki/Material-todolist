import './App.css'
import { useReducer, useState} from 'react'
import {v1} from 'uuid'
import {CreateItemForm} from '../CreateItemForm.tsx'
import {TodolistItem} from '../TodolistItem.tsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, CssBaseline, Grid2, Paper} from "@mui/material";
import {containerSx} from "../TodolistItem.styles.ts";
import {NavButton} from "../NavButton.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {MaterialUISwitch} from "../Switch.ts";
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  CreateTodolistAC, DeleteTodolistAC,
  todolistsReducer
} from "../model/todolists-reducer.ts";
import {
  ChangeTaskStatusAC,
  CreateTaskAC,
  DeleteTaskAC,
  tasksReducer,
  UpdateTaskTitleAC
} from "../model/tasks-reducer.ts";

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
// Record<string, Task[]>
export type TasksState = {
  [key:string]:Task[]
}
type ThemeMode ='light'|'dark'

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  // const [todolists, setTodolists] = useState<Todolist[]>([
  //   { id: todolistId1, title: 'What to learn', filter: 'all' },
  //   { id: todolistId2, title: 'What to buy', filter: 'all' },
  // ])
  const [todolists,dispatchTodolists]=useReducer(todolistsReducer,[
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  // const [tasks, setTasks] = useState<TasksState>({
  //   [todolistId1]: [
  //     { id: v1(), title: 'HTML&CSS', isDone: true },
  //     { id: v1(), title: 'JS', isDone: true },
  //     { id: v1(), title: 'ReactJS', isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: 'Rest API', isDone: true },
  //     { id: v1(), title: 'GraphQL', isDone: false },
  //     { id: v1(), title: 'C++', isDone: false },
  //   ],
  // })

  const [tasks,dispatchTasks]=useReducer(tasksReducer,{
    [todolistId1]:[
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'C++', isDone: false },
    ],
  })
  const [darkMode,setDarkMode]=useState<ThemeMode>('light')


  const changeFilter = (todolistId: string, filter: FilterValues) => {
   // const nextState=todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist)
    // setTodolists(nextState)
    dispatchTodolists(ChangeTodolistFilterAC({id:todolistId,filter}))
  }

  const createTodolist = (title: string) => {
    const todolistId = v1()
    // const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
    dispatchTodolists(CreateTodolistAC(title,todolistId))
    dispatchTasks(CreateTodolistAC(title,todolistId))
    // setTasks({ ...tasks, [todolistId]: [] })
  }

  const deleteTodolist = (todolistId: string) => {
    // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    const action=DeleteTodolistAC(todolistId)
    dispatchTodolists(action)
    dispatchTasks(action)
    // delete tasks[todolistId]
    // //dispatch(createtodolist)
    // setTasks({ ...tasks })
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    // setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
    const action =ChangeTodolistTitleAC({id:todolistId,title})
    dispatchTodolists(action)
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    dispatchTasks(DeleteTaskAC({todolistId, taskId}))
  }

  const createTask = (todolistId: string, title: string) => {
    // const newTask = {id: v1(), title, isDone: false}
    // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    dispatchTasks(CreateTaskAC({todolistId, title}))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)})
    dispatchTasks(ChangeTaskStatusAC({todolistId, taskId, isDone}))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(UpdateTaskTitleAC({todolistId, taskId, title}))
    // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task)})
  }

  const theme = createTheme({
    palette: {
      mode:darkMode,
      primary: {
        main: '#ef6c00',
      },
    },
  })
  const onSwitchModeChangeHandler=()=>{
    setDarkMode(darkMode == 'light' ? 'dark' : 'light')
  }
  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Container sx={containerSx}>
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
                <div>
                  <MaterialUISwitch onChange={onSwitchModeChangeHandler}/>
                  <NavButton color="inherit">Sign in</NavButton>
                  <NavButton color="inherit">Sign in</NavButton>
                  <NavButton background={'dodgerblue'} color="inherit">faq</NavButton>
                </div>
              </Container>


            </Toolbar>
          </AppBar>
          <Container maxWidth={'lg'}>
            <Grid2 container sx={{p:"15px 0"}}>
              <CreateItemForm onCreateItem={createTodolist}/>
            </Grid2>
            <Grid2 container spacing={4} sx={{p:"15px 0"}}>
              {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                  filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                  filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <Paper elevation={5} sx={{ p: '0 20px 20px 20px' }}>
                      <TodolistItem key={todolist.id}
                                    todolist={todolist}
                                    tasks={filteredTasks}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    deleteTodolist={deleteTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}/>
                    </Paper>

                )
              })}
            </Grid2>

          </Container>
        </ThemeProvider>


      </div>
  )
}
