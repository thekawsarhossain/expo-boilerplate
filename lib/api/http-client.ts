import axios from "axios";

import { env } from "@/config/env";
import { REQUEST_TIMEOUT_MS } from "@/constants/api";
import { toApiError } from "./api-error";

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { Accept: "application/json" },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);
