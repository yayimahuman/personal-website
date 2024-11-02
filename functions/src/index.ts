import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const pathapi = onRequest(
  {cors: [/harrytong\.com$/]},
  async (request, response) => {
    try {
      const apiResponse = await fetch("https://www.panynj.gov/bin/portauthority/ridepath.json");
      const data = await apiResponse.json();
      response.json(data);
    } catch (error) {
      logger.error("Error fetching PATH data:", error);
      response.status(500).send("Error fetching PATH data");
    }
  });
