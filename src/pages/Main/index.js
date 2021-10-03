import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import moment from 'moment';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function MainPage() {
    const history = useHistory();
    const [listData, setListData] = useState(null);

    const linkToQR = (externalID) => history.push(`/qr/${externalID}`);
    const linkToAdd = () => history.push(`/add`);

    useEffect(() => {
        (async function () {
            axios
                .get(`https://bel-app.herokuapp.com/api`)
                .then(res => res.data)
                .then(res => {
                    if (res?.status) setListData(res.result);
                })
        })();
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
                                    secondary={moment(item.createdAt).format('YYYY-MM-DD HH-mm-dd')}/>
                            </ListItem>
                        ))
                    }
                </List>
            }
        </div>
    )
}