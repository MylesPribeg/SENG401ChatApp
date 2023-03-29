import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from "agora-access-token";
const returnToken = (groupid) => {
  const appId = import.meta.env.VITE_AGORA_APP_ID;
  const appCertificate = import.meta.env.VITE_AGORA_APP_CERTIFICATE;
  const channelName = groupid;
  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  return tokenA;
};

export default returnToken;
