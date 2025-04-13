import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Data {
    code: string,
    isInterviewer: boolean,
    name: string,
    setRoomExist: (data: boolean) => void
    onSuccess: () => void
}


const validateRoom = ({code, isInterviewer, name, setRoomExist, onSuccess} : Data) => {  

    const socket = io('http://localhost:3001');

    socket.emit("checkRoom", { code, isInterviewer, name });

    const event = isInterviewer ? "checkRoom-interviewer" : "checkRoom-interviewee";

    socket.on(event, (roomIsFree) => {
        if (isInterviewer) {

        console.log("Is interviewer", isInterviewer, "room is", roomIsFree)
            if (roomIsFree) {
                onSuccess();
                socket.disconnect();
                setRoomExist(true); 
            } else {
                setRoomExist(false)
            }
        } 
        
        else {

        setRoomExist(!roomIsFree);
        console.log("Is interviewer", isInterviewer, "room is", roomIsFree)
        if (roomIsFree) {
            onSuccess();
            socket.disconnect();
            setRoomExist(true)
        }
        else {
            setRoomExist(false)
        }
        }
    });
    };


export default validateRoom