import MainPage from "@/pages/main/MainPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import LogoutPage from "@/pages/LogoutPage";
import SearchPage from "@/pages/search/SearchPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AddListingPage from "@/pages/listing/AddListingPage";
import EditListingPage from "@/pages/listing/EditListingPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ListingPage from "@/pages/ListingPage";

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  requireAuth: boolean;
  public: boolean;
}

export const routes: RouteConfig[] = [
  { path: "/", element: <MainPage />, requireAuth: false, public: true },
  { path: "/login", element: <LoginPage />, requireAuth: false, public: false },
  {
    path: "/register",
    element: <RegisterPage />,
    requireAuth: false,
    public: false,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    requireAuth: true,
    public: false,
  },
  {
    path: "/search",
    element: <SearchPage />,
    requireAuth: false,
    public: true,
  },
  {
    path: "/listing/:id",
    element: <ListingPage />,
    requireAuth: false,
    public: true,
  },
  {
    path: "/dashboard/*",
    element: <DashboardPage />,
    requireAuth: true,
    public: false,
  },
  {
    path: "/add-listing",
    element: <AddListingPage />,
    requireAuth: true,
    public: false,
  },
  {
    path: "/edit-listing/:id",
    element: <EditListingPage />,
    requireAuth: true,
    public: false,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    requireAuth: true,
    public: false,
  },
  { path: "*", element: <NotFoundPage />, requireAuth: false, public: true },
];
