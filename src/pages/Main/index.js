import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function MainPage() {
    const history = useHistory();
    const [listData, setListData] = useState(null);

    const linkToQR = (externalID) => history.push(`/qr/${externalID}`);
    const linkToAdd = () => history.push(`/add`);
    const handleDelete = (id) => {
        axios
            .delete(`https://bel-app.herokuapp.com/api/file/${id}`)
            .then(res => res.data)
            .then(res => {
                if (res?.status) fetchListData();
            })
    }

    const fetchListData = () => {
        axios
            .get(`https://bel-app.herokuapp.com/api`)
            .then(res => res.data)
            .then(res => {
                if (res?.status) setListData(res.result);
            })
    }

    useEffect(() => {
        fetchListData();
    }, []);

    return (
        <div style={{height: '70px', margin: '30px'}}>
            <div>
                <Button variant="outlined" onClick={linkToAdd}>ADD DOCUMENT</Button>
            </div>
            {
                !!listData?.length
                && <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    {
                        listData.map((item, key) => (
                            <ListItem key={key}>
                                <ListItemAvatar onClick={() => linkToQR(item?.externalID)}>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.externalID}
                                    secondary={moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                                />
                                <DeleteIcon
                                    onClick={() => handleDelete(item._id)}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            }
        </div>
    )
}