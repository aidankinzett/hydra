import { registerEvent } from "../register-event";
import { TorBoxClient } from "@main/services/download/torbox";
import { logger } from "@main/services";

const authenticateTorBox = async (
  _event: Electron.IpcMainInvokeEvent,
  apiToken: string
) => {
  try {
    TorBoxClient.authorize(apiToken);

    const user = await TorBoxClient.getUser();
    return user;
  } catch (err: any) {
    const status = err?.response?.status;
    logger.error("TorBox authentication failed", {
      status,
      message: err?.message,
      code: err?.code,
    });
    throw new Error(status ? String(status) : "NETWORK_ERROR");
  }
};

registerEvent("authenticateTorBox", authenticateTorBox);
