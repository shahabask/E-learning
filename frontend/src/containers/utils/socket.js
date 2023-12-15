// socket.js
import io from 'socket.io-client';

const ENDPOINT = 'https://www.skillsync.website';
const socket = io(ENDPOINT);

export default socket;
