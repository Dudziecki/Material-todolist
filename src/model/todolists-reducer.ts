import {FilterValues, Todolist} from "../app/App.tsx";

// Типизация для возможных действий
type ActionType =
    CreateTodolistActionType
    | DeleteTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterType;

export const todolistsReducer = (todolists: Todolist[]=[], action: ActionType): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return todolists.filter(todolist => todolist.id !== action.payload.id);
        }
        case 'create_todolist': {
            const {id, title} = action.payload; // Деструктурируем корректно
            const newTodolist: Todolist = {id, title, filter: 'all'};
            return [newTodolist, ...todolists];
        }
        case 'change_todolist_title': {
            const {id, title} = action.payload; // Деструктурируем корректно
            return todolists.map(todolist =>
                todolist.id === id ? {...todolist, title} : todolist
            );
        }
        case 'change_todolist_filter' :{
            const {id, filter} = action.payload;
            const nextState=todolists.map(todolist => todolist.id === id ? { ...todolist, filter } : todolist)
            return nextState;
        }
        default:
            return todolists;
    }
};

// Action Creator для удаления тудулиста
export const DeleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {id},
} as const);

// Тип для удаления
export type DeleteTodolistActionType = ReturnType<typeof DeleteTodolistAC>;

// Action Creator для создания тудулиста
export const CreateTodolistAC = (title: string, id: string) => ({
    type: 'create_todolist',
    payload: {
        id,
        title,
    },
} as const);

// Тип для создания
export type CreateTodolistActionType = ReturnType<typeof CreateTodolistAC>;

// Action Creator для изменения названия тудулиста
export const ChangeTodolistTitleAC = (payload: { id: string; title: string }) => ({
    type: 'change_todolist_title',
    payload,
} as const);

// Тип для изменения названия
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>;

export const ChangeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => ({
    type: 'change_todolist_filter',
    payload
} as const)
export type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
