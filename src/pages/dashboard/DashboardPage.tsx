import styled from "styled-components";
import DashboardNavigation from "@/pages/dashboard/components/DashboardNavigation";
import { Route, Routes } from "react-router";
import MessagesSection from "@/sections/messages/MessagesSection";
import YourRentalsSection from "@/sections/yourRentals/YourRentalsSection";
import YourListingsSection from "@/sections/yourListings/YourListingsSection";
import RequestsSection from "@/sections/requests/RequestsSection";

export default function DashboardPage() {
  return (
    <>
      <DashboardNavigation />
      <Content>
        <Routes>
          <Route path="your-listings" element={<YourListingsSection />} />
          <Route path="your-rentals" element={<YourRentalsSection />} />
          <Route path="requests/*" element={<RequestsSection />} />
          <Route path="messages" element={<MessagesSection />} />

          <Route path="*" element={<YourListingsSection />} />
        </Routes>
      </Content>
    </>
  );
}

const Content = styled.div``;
