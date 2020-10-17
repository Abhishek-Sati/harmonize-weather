import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Error from "./pages/Error";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/:station_code",
    exact: true,
    component: Detail,
  },
  {
    path: "*",
    component: Error,
  },
];
