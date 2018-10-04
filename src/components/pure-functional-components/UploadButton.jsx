import {Container, Icon, Input, Menu} from "semantic-ui-react";
import React from "react";

const UploadButton = ({label, onUpload, id, injectedClassName}) => {
    let fileInput = null;
    // If no id was specified, generate a random one
    const uid = id || Math.random().toString(36).substring(7);

    return <div className={injectedClassName}>
        <label htmlFor={uid} className="ui icon button">
            <i className="upload icon"/> {label}
            </label>
        <input
            type="file"
            id={uid}
            style={{display: "none"}}
            onChange={() => {
                onUpload(fileInput.files[0]);
            }}
            ref={input => {
                fileInput = input;
            }}
        />
    </div>;
};

export default UploadButton;