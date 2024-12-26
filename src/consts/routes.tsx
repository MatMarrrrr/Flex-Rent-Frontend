import MainPage from "@/pages/main/MainPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import LogoutPage from "@/pages/LogoutPage";
import SearchPage from "@/pages/search/SearchPage";
import ItemPage from "@/pages/ItemPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AddListingPage from "@/pages/listing/AddListingPage";
import EditListingPage from "@/pages/listing/EditListingPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";

export interface RouteConfig {
  path: string;
  element: JSX.Element;
  requireAuth: boolean;
}

export const routes: RouteConfig[] = [
  { path: "/", element: <MainPage />, requireAuth: false },
  { path: "/login", element: <LoginPage />, requireAuth: false },
  { path: "/register", element: <RegisterPage />, requireAuth: false },
  { path: "/logout", element: <LogoutPage />, requireAuth: true },
  { path: "/search", element: <SearchPage />, requireAuth: false },
  { path: "/item/:id", element: <ItemPage />, requireAuth: false },
  { path: "/dashboard/*", element: <DashboardPage />, requireAuth: true },
  { path: "/add-listing", element: <AddListingPage />, requireAuth: true },
  {
    path: "/edit-listing/:id",
    element: <EditListingPage />,
    requireAuth: true,
  },
  { path: "/profile", element: <ProfilePage />, requireAuth: true },
  { path: "*", element: <NotFoundPage />, requireAuth: false },
];
