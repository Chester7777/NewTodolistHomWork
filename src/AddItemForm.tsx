import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm (props: AddItemFormPropsType) {
const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null);


    function addItem () {
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
            <input
                type="text"
                value={title}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            <br/>
            {error && <div className="error-message">{error}</div>}

        </div>
    );
};

export default AddItemForm;