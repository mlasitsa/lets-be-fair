import { useEffect } from "react";
import { io } from "socket.io-client";
// @ts-ignore
import socket from '../utils/socket.js'

interface Data {
    setUserLeft: (val: boolean) => void,
    setUserJoined: (val: boolean) => void,
    setName: (val: string) => void
}

interface UserData {
    name: string,
    role: string,
    code: any
}

const useConnectDisconect = ({setUserLeft, setUserJoined ,setName}: Data) => {

    useEffect(() => {

        socket.on('user-joined', ({name, role, code} : UserData) => {
            setUserJoined(true)
            setName(name)
            console.log(`Name of the person that joined is: ${name}`)
        })

        socket.on('user-left', ({name, role, code} : UserData) => {
            setUserLeft(true)
            setName(name)
            console.log(`Name of the person that left is: ${name}`);
            
        })

        return () => {
            socket.emit('user-left', socket)
            socket.off('user-joined')
            socket.off('user-left')
            //socket.disconnect()
        }
    }, [])


}; 
export default useConnectDisconect;