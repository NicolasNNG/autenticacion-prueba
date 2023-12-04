"use client";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://autenticacion-prueba-ryqg-754xpv16t-nicolas-s-projects-9dbaafa4.vercel.app/";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
