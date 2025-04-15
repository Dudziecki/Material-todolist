import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';


type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>

            <TextField id="outlined-basic"
                       variant="outlined"
                       value={title}
                       size="small"
                       onChange={changeTitleHandler}
                       onKeyDown={createItemOnEnterHandler}
                       error={!!error}
            />
            <Button variant={'outlined'}
                    onClick={createItemHandler}
                    endIcon={<AddCircleIcon/>}

            >add</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}