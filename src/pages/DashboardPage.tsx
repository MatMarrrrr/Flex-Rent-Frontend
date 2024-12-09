import styled from "styled-components";
import DashboardNavigation from "../components/ui/DashboardNavigation";
import { Route, Routes } from "react-router";
import Messages from "../sections/Messages";
import YourRentals from "../sections/YourRentals";
import YourListings from "../sections/YourListings";
import Requests from "../sections/Requests";

export default function DashboardPage() {
  return (
    <>
      <DashboardNavigation />
      <Content>
        <Routes>
          <Route path="your-listings" element={<YourListings />} />
          <Route path="your-rentals" element={<YourRentals />} />
          <Route path="requests" element={<Requests />} />
          <Route path="messages" element={<Messages />} />

          <Route path="*" element={<YourListings />} />
        </Routes>
      </Content>
    </>
  );
}

const Content = styled.div``;
