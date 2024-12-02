// webrtcService.ts
import { ref } from 'vue';
import { io } from 'socket.io-client';

const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.voipbuster.com ' }],
});

let localStream: MediaStream;
let remoteStream: MediaStream;


const offerSdp = ref('');
const answerSdp = ref('');
const offerSdp2 = ref('');
const answerSdp2 = ref('');
const socket = io('http://localhost:3000');

const init = async () => {

  const remoteVideo = document.getElementById('remote') as HTMLVideoElement;
  socket.on('connect', () => {
    console.log('client connect!');
  });

  socket.on('getoffer', (offer) => {
    offerSdp2.value = offer;
    createAnswer();
  });

  socket.on('getanswer', (answer) => {
    answerSdp2.value = answer;
    addAnswer();
  });

  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };
};

const createOffer = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const localVideo = document.getElementById('local') as HTMLVideoElement;
  localVideo.srcObject = localStream;

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      offerSdp.value = JSON.stringify(pc.localDescription);
      sendOffer(offerSdp.value);
    }
  };
};

const createAnswer = async () => {
  const offer = JSON.parse(offerSdp2.value);
  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      answerSdp.value = JSON.stringify(pc.localDescription);
      sendAnswer(answerSdp.value);
    }
  };
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
};

const addAnswer = async () => {
  const answer = JSON.parse(answerSdp2.value);
  if (!pc.currentRemoteDescription) {
    pc.setRemoteDescription(answer);
  }
};

const copyToClipboard = (val: string) => {
  navigator.clipboard.writeText(val);
};

const sendOffer = async (offer: string) => {
  socket.emit('sendoffer', offer);
};

const sendAnswer = async (answer: string) => {
  socket.emit('sendanswer', answer);
};

export {
  init,
  createOffer,
  createAnswer,
  addAnswer,
  copyToClipboard,
  sendOffer,
  sendAnswer,
  offerSdp,
  answerSdp,
  offerSdp2,
  answerSdp2,
};