import { registerEvent } from "../register-event";
import { PremiumizeClient } from "@main/services/download/premiumize";
import { logger } from "@main/services";

const authenticatePremiumize = async (
  _event: Electron.IpcMainInvokeEvent,
  apiToken: string
) => {
  try {
    PremiumizeClient.authorize(apiToken);

    const user = await PremiumizeClient.getUser();
    return user;
  } catch (err: any) {
    const status = err?.response?.status;
    logger.error("Premiumize authentication failed", {
      status,
      message: err?.message,
      code: err?.code,
    });
    throw new Error(status ? String(status) : "NETWORK_ERROR");
  }
};

registerEvent("authenticatePremiumize", authenticatePremiumize);
