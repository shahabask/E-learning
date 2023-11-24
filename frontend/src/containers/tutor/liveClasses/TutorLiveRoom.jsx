


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {axiosInstance} from '../../utils/tutorAxios'
function TutorLiveRoom() {
 
  const navigate=useNavigate()

  const { roomId,id } = useParams();
console.log(id,'id')
    const handleEndLive=async(id)=>{

        const response=await axiosInstance.patch('/updateLiveStatus',{id,status:'Ended'})
        
        navigate('/tutor/liveClasses')
    }
 
  let role_str ='Host' ||'Cohost';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      :  ZegoUIKitPrebuilt.Cohost
     

  

  // Generate Kit Token for authentication
  const appID = 829795951;
  const serverSecret = 'cdf7ddca93bc802a02dc2a9cf1929a38';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    'shahabas'
  );

  // Start the call only for the audience
  let startMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Host) {
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        // sharedLinks,
      });
    }
  };

  return (
    <div className="room-page h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-purple-100 text-black">
    <div className="mb-8 text-3xl font-bold">Live Streaming Room</div>
    {/* Add a stylish container for the live streaming */}
    {role === ZegoUIKitPrebuilt.Host && (
      <div
        className="w-full h-96 rounded-lg shadow-lg overflow-hidden"
        ref={startMeeting}
      />
    )}
    <button onClick={()=>handleEndLive(id)}> End Live</button>
    </div>
  );
}

export default TutorLiveRoom
 