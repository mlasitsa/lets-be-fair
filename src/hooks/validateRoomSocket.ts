import { io } from 'socket.io-client';
// @ts-ignore
import socket from '../utils/socket.js'

interface Data {
  code: string,
  isInterviewer: boolean,
  name: string,
  setRoomExist: (data: boolean) => void,
  onSuccess: () => void
}

const validateRoom = ({ code, isInterviewer, name, setRoomExist, onSuccess }: Data) => {

  socket.emit("checkRoom", { code, isInterviewer, name });

  const event = isInterviewer ? "checkRoom-interviewer" : "checkRoom-interviewee";

  socket.on(event, (roomIsFree: any) => {
    if (isInterviewer) {
      if (roomIsFree) {
        onSuccess();
        setRoomExist(true);
      } else {
        setRoomExist(false);
      }
    } else {
      setRoomExist(!roomIsFree);
      if (roomIsFree) {
        onSuccess();
        setRoomExist(true);
      } else {
        setRoomExist(false);
      }
    }
  });


  return () => {
    socket.off('checkRoom')
    socket.off('checkRoom-interviewer')
    socket.off('checkRoom-interviewee')

  };

};

export default validateRoom;