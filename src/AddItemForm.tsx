import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null);


    function addItem() {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setTitle("Title is required!")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem()
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return (
        <div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <TextField
                // id="filled-multiline-flexible"
                variant="outlined"
                error={!!error}
                value={title}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                label="Title"
                helperText={error}
                multiline
                rowsMax={4}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*<Button variant="contained" size="small" color="primary" onClick={addItem}>+</Button>*/}
            <br/>
            {/*{error && <div className="error-message">{error}</div>}*/}

        </div>
    );
};

export default AddItemForm;