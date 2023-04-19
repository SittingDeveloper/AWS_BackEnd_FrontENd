import React, {useEffect, useState} from "react";
import {Checkbox, InputBase, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";

export default function Todo(props) {

    const [item, setItems] = useState(props.item);
    const editItem = props.editItem;

    const editEventHandler = (e) => {
        setItems({...item, title : e.target.value});
    }

    const [readOnly, setReadOnly] = useState(true);
    // 삭제
    const deleteItem = props.deleteItem;
    const deleteEventHandler = () => {
        deleteItem(item);
    }

    // 읽기전용 False (수정가능)
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    // 읽기전용 True
    const turnOnReadOnly = (e) => {
        if (e.key === 'Enter' && readOnly === false) {
            setReadOnly(true);
            editItem(item);
        }
    }

    const checkBoxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }

    return (
        /*<div className={"Todo"}>
            <input type={"checkbox"} id={item.id} name={item.id} value={item.id} checked={item.done}/>
            <label for={"todo0"}> Todo 컴포넌트 만들기 </label>
            <label id={item.id}> {item.title} </label>
        </div>*/
        <ListItem>
            <Checkbox checked={item.done} onChange={checkBoxEventHandler} />
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label": "naked", readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type={"text"}
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label={"Delete Todo"} onClick={deleteEventHandler}>
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}