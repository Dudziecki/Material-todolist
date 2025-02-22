import {TasksState} from "../app/App.tsx";
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";
import {v1} from "uuid";

type Actions = CreateTodolistActionType
    | DeleteTodolistActionType | DeleteTaskActionType | CreateTaskActionType | ChangeTaskActionType|UpdateTaskTitleActionType
const initialState: TasksState = {}
export const tasksReducer = (tasks: TasksState = initialState, action: Actions): TasksState => {

    switch (action.type) {
        case "create_todolist": {
            const {id} = action.payload;
            return {...tasks, [id]: []}
        }
        case 'delete_todolist': {
            const {id} = action.payload;
            delete tasks[id]
            return tasks
        }
        case 'delete_task': {
            const {todolistId, taskId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)}
        }
        case 'create_task': {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case 'change_task_filter':{
            const {todolistId,taskId,isDone}=action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task)}
        }
        case 'update_task_title':{
            const {todolistId,taskId,title}=action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task)}
        }
        default:
            return tasks
    }
}
export const DeleteTaskAC = (payload: { todolistId: string, taskId: string }) => ({
    type: 'delete_task',
    payload


} as const)
export type DeleteTaskActionType = ReturnType<typeof DeleteTaskAC>
export const CreateTaskAC = (payload: { todolistId: string, title: string }) => ({
    type: 'create_task',
    payload


} as const)
export type CreateTaskActionType = ReturnType<typeof CreateTaskAC>
export const ChangeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => ({
    type: 'change_task_filter',
    payload


} as const)
export type ChangeTaskActionType = ReturnType<typeof ChangeTaskStatusAC>
export const UpdateTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => ({
    type: 'update_task_title',
    payload


} as const)
export type UpdateTaskTitleActionType = ReturnType<typeof UpdateTaskTitleAC>

