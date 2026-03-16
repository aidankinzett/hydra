import { registerEvent } from "../register-event";
import { AllDebridClient } from "@main/services/download/all-debrid";
import { logger } from "@main/services";

const authenticateAllDebrid = async (
  _event: Electron.IpcMainInvokeEvent,
  apiToken: string
) => {
  try {
    AllDebridClient.authorize(apiToken);

    const user = await AllDebridClient.getUser();
    return user;
  } catch (err: any) {
    const status = err?.response?.status;
    logger.error("AllDebrid authentication failed", {
      status,
      message: err?.message,
      code: err?.code,
    });
    throw new Error(status ? String(status) : "NETWORK_ERROR");
  }
};

registerEvent("authenticateAllDebrid", authenticateAllDebrid);
