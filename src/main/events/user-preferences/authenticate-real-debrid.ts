import { RealDebridClient } from "@main/services/download/real-debrid";
import { logger } from "@main/services";
import { registerEvent } from "../register-event";

const authenticateRealDebrid = async (
  _event: Electron.IpcMainInvokeEvent,
  apiToken: string
) => {
  try {
    RealDebridClient.authorize(apiToken);

    const user = await RealDebridClient.getUser();
    return user;
  } catch (err: any) {
    const status = err?.response?.status;
    logger.error("RealDebrid authentication failed", {
      status,
      message: err?.message,
      code: err?.code,
    });
    throw new Error(status ? String(status) : "NETWORK_ERROR");
  }
};

registerEvent("authenticateRealDebrid", authenticateRealDebrid);
