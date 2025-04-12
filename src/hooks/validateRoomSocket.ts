import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Data {
    code: string,
    isInterviewer: boolean,
    setRoomExist: (data: boolean) => void
    onSuccess: () => void
}


const validateRoom = ({code, isInterviewer, setRoomExist, onSuccess} : Data) => {  
    console.log(code)


    const socket = io('http://localhost:3001');

    socket.emit("checkRoom", { code, isInterviewer });

    const event = isInterviewer ? "checkRoom-interviewer" : "checkRoom-interviewee";

    socket.on(event, (roomIsFree) => {
        if (isInterviewer) {
        setRoomExist(roomIsFree); 
        if (roomIsFree) {
            onSuccess();
            socket.disconnect();
        }
        } else {
        setRoomExist(roomIsFree);
        if (roomIsFree) {
            onSuccess();
            socket.disconnect();
        }
        }
    });
    };


export default validateRoom