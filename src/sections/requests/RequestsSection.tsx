import { Route, Routes } from "react-router";
import styled from "styled-components";
import IncomingRequestsSection from "@/sections/requests/sections/incomingRequests/IncomingRequestsSection";
import OutgoingRequestsSection from "@/sections/requests/sections/outgoingRequests/OutgoingRequestsSection";

const RequestsSection = () => {
  return (
    <Content>
      <Routes>
        <Route path="incoming" element={<IncomingRequestsSection />} />
        <Route path="outgoing" element={<OutgoingRequestsSection />} />
        <Route path="*" element={<IncomingRequestsSection />} />
      </Routes>
    </Content>
  );
};

export default RequestsSection;

const Content = styled.div``;
