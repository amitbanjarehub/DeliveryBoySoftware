import Login from "../pages/auth-pages/login";
import Page from "@jumbo/shared/Page";
import ForgotPassword from "../pages/auth-pages/forgot-password";
import Applyforjob from "app/pages/auth-pages/ApplyforJob/Applyforjob";



const authRoutes = [
  {
    path: "/deliveryboy/login",

    element: <Page component={Login} layout={"solo-page"} />,
  },
  {
    path: "/deliveryboy/apply-for-job",
    element: <Page component={Applyforjob} layout={"solo-page"} />,
  },
  {
    path: "/deliveryboy/forgot-password",
    element: <Page component={ForgotPassword} layout={"solo-page"} />,
  },
];

export default authRoutes;
