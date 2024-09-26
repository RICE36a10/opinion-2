import RoadmapHeader from "@/components/RoadmapHeader";
import styled from "styled-components";
import StatusTable from "@/components/StatusTable";
const Roadmap = () => {
  return (
    <Container>
      <RoadmapHeader />
      <StatusTable />
    </Container>
  );
};
const Container = styled.div`
  max-width: 1110px;
  margin: 0 auto;
  padding: 50px 40px 100px;
  box-sizing: content-box;
  @media (max-width: 767.98px) {
    padding: 0 0 100px;
  }
`;
export default Roadmap;
