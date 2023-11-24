import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Function to get URL parameters
export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function RoomPage() {
  // Extract the roomId parameter from the URL
  const { roomId } = useParams();
  useEffect(()=>{
    startMeeting()
  },[])
  // Get the role from the URL parameters or default to 'Audience'
  // let role_str = 'Audience';
  const role = ZegoUIKitPrebuilt.Audience;

  // Prepare an array of shared links based on the role
  // let sharedLinks = [];
  // if (role === ZegoUIKitPrebuilt.Audience || role === ZegoUIKitPrebuilt.Audience) {
  //   sharedLinks.push({
  //     name: 'Join as co-host',
  //     url:
  //       window.location.protocol +
  //       '//' +
  //       window.location.host +
  //       window.location.pathname +
  //       '?roomId=' +
  //       roomId +
  //       '&role=Cohost',
  //   });
  // }
  // sharedLinks.push({
  //   name: 'Join as audience',
  //   url:
  //     window.location.protocol +
  //     '//' +
  //     window.location.host +
  //     window.location.pathname +
  //     '?roomId=' +
  //     roomId +
  //     '&role=Audience',
  // });

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

    if (role === ZegoUIKitPrebuilt.Audience) {
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
    <div className="room-page min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-purple-600 text-white">
    <div className="mb-8 text-3xl font-bold">Audience View</div>
    {/* Add a stylish container for the live streaming (adjust the height as needed) */}
    <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden" ref={startMeeting} />

    {/* Additional content for the audience view */}
    <div className="mt-8 text-lg text-center">
      <p>Join the live streaming session and enjoy the content!</p>
      <p className="mt-4">The show will begin shortly...</p>
    </div>
  </div>
  );
}

export default RoomPage;