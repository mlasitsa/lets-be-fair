import { useEffect } from "react";
import { io } from "socket.io-client";
// @ts-ignore
import socket from '../utils/socket.js'

interface Data {
    setUserLeft: (val: boolean) => void,
    setUserJoined: (val: boolean) => void
}

const useConnectDisconect = ({setUserLeft, setUserJoined}: Data) => {

    useEffect(() => {
        socket.on('user-joined', (personName: any) => {
            setUserJoined(true)
            console.log(`Name of the person that left is: ${personName}`)
        })

        socket.on('user-left', (personName: any) => {
            setUserLeft(true)
            console.log(`Name of the person that left is: ${personName}`);
            
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