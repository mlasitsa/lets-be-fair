import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type Data = {
    code: string,
    isInterviewer: boolean,
    setRoomExist: (data: boolean) => void
}


const useValidateRoom = ({code, isInterviewer, setRoomExist} : Data) => {  
    console.log(code)


    useEffect(() => {
        const socket = io('http://localhost:3001');

        socket.emit("checkRoom", {code, isInterviewer})

        if (isInterviewer) {
            socket.on("checkRoom-interviewer", (answer) => {
                if (answer) {
                    setRoomExist(true)
                } else {
                    setRoomExist(false)
                }
            })
        } else {
            socket.on("checkRoom-interviewee" , (answer) => {
                if (answer) {
                    setRoomExist(true)
                } else {
                    setRoomExist(false)
                }
            })

        }
        return () => {
            socket.disconnect();
        };
    },[code])
} 

export default useValidateRoom