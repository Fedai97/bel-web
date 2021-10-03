import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function FilePage({match}) {
    const [externalID, setExternalID] = useState(null);
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        if (match?.params?.externalID) setExternalID(match?.params?.externalID)
    }, [match.params.page]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (externalID) {
            (async function () {
                axios
                    .get(`https://bel-app.herokuapp.com/api/file/${externalID}`)
                    .then(res => res.data)
                    .then(res => {
                        if (res?.status) setFileData(`data:application/pdf;base64,${res?.result.base64}`);
                    })
            })()
        }
    }, [externalID]);

    return !fileData
        ? <div>Loading...</div>
        : <embed
            src={fileData}
            id="displayFile"
            alt="your image"
            width="100%"
            height="99%"
            type="application/pdf"
        />
}