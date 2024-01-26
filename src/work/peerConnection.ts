import { appPreferencesManager } from "@/storage/app";

export const defaultPeerConnectionConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
  iceCandidatePoolSize: 10,
};

export let peerConnection = new RTCPeerConnection(
  appPreferencesManager.appPreferences.customICEServerConfig
);
