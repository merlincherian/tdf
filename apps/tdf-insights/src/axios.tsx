import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:3101",
  headers: {
    "Content-Type": "application/json",
  },
});
