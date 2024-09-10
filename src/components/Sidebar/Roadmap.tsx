import styled from "styled-components";
const RoadmapWrapper = styled.div`
  border-radius: var(--border-radius);
  background: var(--primary-color);
  padding: 20px 24px 24px;
  @media (min-width: 768px) and (max-width: 1024px) {
    flex: 1;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: var(--h3-size);
    letter-spacing: var(--h3-spacing);
    line-height: var(--h3-line);
    font-weight: 700;
  }
  a {
    font-weight: 600;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    color: var(--link-color);
    text-decoration: underline;
  }
`;
const StatusBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;
const StatusItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  font-weight: 400;
  .count {
    font-weight: 700;
    margin-left: auto;
  }
`;
const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 16px;
  background-color: ${({ color }) => color};
`;
const Roadmap = () => {
  const statuses = [
    { label: "Planned", count: 2, color: "#f49f85" },
    { label: "In-Progress", count: 2, color: "#ad1fea" },
    { label: "Live", count: 2, color: "#62bcfa" },
  ];
  return (
    <RoadmapWrapper>
      <StatusHeader>
        <h3>Roadmap</h3>
        <a href="">View</a>
      </StatusHeader>
      <StatusBody>
        {statuses.map((status) => (
          <StatusItem key={status.label}>
            <StatusDot color={status.color} />
            {status.label}
            <span className="count">{status.count}</span>
          </StatusItem>
        ))}
      </StatusBody>
    </RoadmapWrapper>
  );
};

export default Roadmap;
