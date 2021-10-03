import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";

export default function AddPage() {
    const history = useHistory();
    const initFormData = {
        externalID: '',
        file: null
    };
    const [formData, setFormData] = useState(initFormData);

    const handleAdd = () => {
        if (!formData?.externalID?.length) return window.alert('Invalid ExternalID!');
        else if (!formData?.file) return window.alert('Invalid File!');

        const data = new FormData();
        data.append('externalID', formData.externalID);
        data.append('file', formData.file);

        axios
            .post(`https://bel-app.herokuapp.com/api/add`, data)
            .then(res => res.data)
            .then(res => {
                if (res?.status) {
                    setFormData(initFormData);
                    history.push('/');
                }
            })
    }

    return <div className="add-container">
        <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            value={formData.externalID}
            onChange={(e) => {
                setFormData({...formData, externalID: e?.target?.value})
            }}
        />
        <div>
            <input
                type="file"
                id="input"
                onChange={(e) => {
                    if (e?.target?.files?.length && e?.target?.files[0] && e?.target?.files[0]?.type?.includes('pdf')) {
                        setFormData({...formData, file: e?.target?.files[0]})
                    }
                }}/>
        </div>
        <Button variant="outlined" onClick={handleAdd}>ADD DOCUMENT</Button>
    </div>
}