import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    height: 'auto',
};

export default function MainPage() {
    const [listData, setListData] = useState(null);
    const [open, setOpen] = useState(false);
    const [qr, setQR] = useState('');

    const handleOpen = (externalID) => {
        setOpen(true);
        axios
            .post(`https://bel-app.herokuapp.com/api/qr/${externalID}`)
            .then(res => res.data)
            .then(res => {
                if (res?.status) setQR(res.result);
            })
    }
    const handleClose = () => {
        setOpen(false);
        setQR('');
    }

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
                <Button variant="outlined">ADD</Button>
            </div>
            {
                !!listData?.length
                && <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    {
                        listData.map((item, key) => (
                            <ListItem key={key}>
                                <ListItemAvatar onClick={() => handleOpen(item?.externalID)}>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.title} secondary={item.externalID}/>
                            </ListItem>
                        ))
                    }
                </List>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        !!qr?.length
                        && <img src={qr} alt=""/>
                    }
                </Box>
            </Modal>
        </div>
    )
}