import type {ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './app/App.tsx'

import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                {/*<Button title={'x'} onClick={deleteTodolistHandler}/></div>*/}
                <Button
                    onClick={deleteTodolistHandler}
                    endIcon={<HighlightOffIcon/>}
                />
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone}
                                              onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>


                                <IconButton onClick={deleteTaskHandler}>
                                    <HighlightOffIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Box sx={containerSx}>
                    <Button color={filter === 'all' ? 'primary' : 'secondary'}
                            variant='contained'
                            onClick={() => changeFilterHandler('all')}>All</Button>
                    <Button color={filter === 'active' ? 'primary' : 'secondary'}
                            variant='contained'
                            onClick={() => changeFilterHandler('active')}>Active</Button>
                    <Button color={filter === 'completed' ? 'primary' : 'secondary'}
                            variant='contained'
                            onClick={() => changeFilterHandler('completed')}>Completed</Button>
                </Box>

            </div>
        </div>
    )
}
