import { useEffect } from "react";
import { io } from "socket.io-client";

interface Data {
    setUserLeft: (val: boolean) => void,
    setUserJoined: (val: boolean) => void
}

const useConnectDisconect = ({setUserLeft, setUserJoined}: Data) => {

    const socket = io('http://localhost3001')

    useEffect(() => {
        socket.on('user-joined', (personName) => {
            setUserLeft(true)
            console.log(`Name of the person that left is: ${personName}`)
        })

        socket.on('user-left', (personName) => {
            setUserLeft(true)
            console.log(`Name of the person that left is: ${personName}`);
            
        })


    return () => {
        socket.disconnect()
    }
    }, [])


}; 
export default useConnectDisconect;