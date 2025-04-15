import {type ChangeEvent, useState} from 'react'
import {TextField} from "@mui/material";

type Props = {
  value: string
  onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
  const [title, setTitle] = useState(value)
  const [isEditMode, setIsEditMode] = useState(false)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
      <>
        {isEditMode ? (

            <TextField id="standard-basic"  variant="standard"   onChange={changeTitle} onBlur={turnOffEditMode} autoFocus>title</TextField>
        ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
        )}
      </>
  )
}