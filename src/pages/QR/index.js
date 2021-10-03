import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function QRPage({match}) {
    const [externalID, setExternalID] = useState(null);
    const [qrData, setQRData] = useState(null);

    useEffect(() => {
        if (match?.params?.externalID) setExternalID(match?.params?.externalID)
    }, [match.params.page]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (externalID) {
            (async function () {
                axios
                    .post(`https://bel-app.herokuapp.com/api/qr/${externalID}`)
                    .then(res => res.data)
                    .then(res => {
                        if (res?.status) setQRData(res.result);
                    })
            })()
        }
    }, [externalID]);

    return !qrData
        ? <div>Loading...</div>
        : <div style={{display: 'flex', height: '30%', justifyContent: 'center'}}>
            <img src={qrData} alt=""/>
        </div>
}