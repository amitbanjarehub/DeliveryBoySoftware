import Page from "@jumbo/shared/Page";
import ParcelAllotmentList from "app/pages/parcel/parcelAllotmentList";
import ParcelDeliveryList from "app/pages/parcel/parcelDeliveryList";
import ParcelReceivedList from "app/pages/parcel/parcelReceivedList";
import ExpenseList from "app/pages/expense/ExpenseListA";
import ContractBasisReportA from "app/pages/Report/ContractBasisReportA";
import LoginAttendance from "../pages/attendance/Log-in";
import LogoutAttendance from "../pages/attendance/Log-out";
import CashDeposit from "../pages/bank/CashDeposit";
import AddBranch from "../pages/companySettings/Add-Branch";
import AddCompany from "../pages/companySettings/Add-company";
import CompanyDetails from "../pages/companySettings/company-details";
import Expense from "../pages/expense";
import Dashboard from "../pages/home";
import MailsApp from "../pages/mail";
import Parcelallotment from "../pages/parcel/parcelAllotment";
import ParcelDelivery from "../pages/parcel/parcelDelivery";
import Parcelreceived from "../pages/parcel/parcelreceived";
import offer from "../pages/offer_letter";
import UserProfiles from "../pages/profileData/Editprofile";
import UserProfile from "../pages/profileData/user-profile";
import AllotedParcel from "../pages/Report/AllotedParcelA";
import ExpenseReport from "app/pages/Report/ExpenseReportA";
import ParcelnextDay from "../pages/Report/AllotedParcelfornextDayA";
import ReportAttendance from "../pages/Report/AttendanceReportA";
import CashBook from "../pages/Report/CashBookA";
import Parceldelivered from "../pages/Report/DelieverdParcelA";
import Reportfuel from "../pages/Report/FuelReport";
import ParcelreceivedA from "../pages/Report/ReceivedParcelA";
import Parcelrejected from "../pages/Report/RejectedParcelA";
import Userverification from "../pages/Users-Setting/userVerification";
import Userslist from "../pages/UsersList";
import ViewAttendance from "../pages/attendance/View-attendance";
import VehicleReport from "app/pages/Report/VehiclereportA/vehicleReport";
import CashdepositList from "app/pages/bank/CashDepositListA/CashDepositList";



const adminRoutes = [


  {
    path: "/CompanySettings/addCompany",
    element: <Page component={AddCompany} />,
  },

  {
    path: "/CompanySettings/companydetails",
    element: <Page component={CompanyDetails} />,
  },
  {
    path: "/CompanySettings/addBranch",
    element: <Page component={AddBranch} />,
  },

  {
    path: "/UserSettings/userVerification",
    element: <Page component={Userverification} />,
  },

  {
    path: "/parcel/parcelallotment",
    element: <Page component={Parcelallotment} />,
  },

  {
    path: "/parcel/parcelDelivery",
    element: <Page component={ParcelDelivery} />,
  },

  {
    path: "/admin/FuelReport",
    element: <Page component={Reportfuel} />,
  },
  {
    path: "/AddExpense",
    element: <Page component={Expense} />,
  },
  {
    path: "/ExpenseList",
    element: <Page component={ExpenseList} />,
  },
  {
    path: "/ExpenseReport",
    element: <Page component={ExpenseReport} />,

  },
  {
    path: "/admin/allotedParcelReport",
    element: <Page component={AllotedParcel} />,

  },



  {
    path: "/Cashdeposit",
    element: <Page component={CashDeposit} />,
  },
  {
    path: "/CashdepositList",
    element: <Page component={CashdepositList} />,
  },

  {
    path: "/admin/attendanceReport",
    element: <Page component={ReportAttendance} />,
  },

  {
    path: "/admin/vehiclereport",
    element: <Page component={VehicleReport} />,
  },

  {
    path: "/admin/contractBasisReport",
    element: <Page component={ContractBasisReportA} />,
  },
  {
    path: "/admin/deliveredparcelReport",
    element: <Page component={Parceldelivered} />,
  },
  {
    path: "/admin/rejectedparcelReport",
    element: <Page component={Parcelrejected} />,
  },
  {
    path: "/admin/allotedparcelfornextdayReport",
    element: <Page component={ParcelnextDay} />,
  },
  {
    path: "/check-in/attendance",
    element: <Page component={LoginAttendance} />,
  },
  {
    path: "/check-out/attendance",
    element: <Page component={LogoutAttendance} />,
  },
  {
    path: "/dashboard",
    element: <Page component={Dashboard} />,
  },

  {
    path: "/mails/messages",
    element: <Page component={MailsApp} />,
  },
  {
    path: "/userprofile",
    element: <Page component={UserProfile} />,
  },
  {
    path: "/editprofile",
    element: <Page component={UserProfiles} />,
  },
  {
    path: "/admin/cashBookReport",
    element: <Page component={CashBook} />,
  },

  {
    path: "/OfferLetter",
    element: <Page component={offer} />,
  },
  {
    path: "/userlists",
    element: <Page component={Userslist} />,
  },
  {
    path: "/parcel/parcelReceived",
    element: <Page component={Parcelreceived} />,
  },
  {
    path: "/admin/ReceivedParcelReport",
    element: <Page component={ParcelreceivedA} />,
  },
  {
    path: "/parcel/ParcelAllotmentList",
    element: <Page component={ParcelAllotmentList} />,
  },

  {
    path: "/parcel/ParcelDeliveryList",
    element: <Page component={ParcelDeliveryList} />,
  },
  {
    path: "/parcel/ParcelReceivedList",
    element: <Page component={ParcelReceivedList} />,
  },
  {
    path: "/attendance/ViewAttendance",
    element: <Page component={ViewAttendance} />,
  },
];
export default adminRoutes;
