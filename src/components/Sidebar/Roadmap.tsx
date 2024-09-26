import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { countByStatus } from "@/utils/helper";
import { Status, StatusColor } from "@/types/request";
import { Link } from "react-router-dom";
const Roadmap = () => {
  const { feedbackData } = useSelector((state: RootState) => state.Feedback);
  const plannedCount = countByStatus(Status.Planned, feedbackData);
  const progressCount = countByStatus(Status.Progress, feedbackData);
  const liveCount = countByStatus(Status.Live, feedbackData);
  const statuses = [
    { label: "Planned", count: plannedCount, color: StatusColor.Planned },
    { label: "In-Progress", count: progressCount, color: StatusColor.Progress },
    { label: "Live", count: liveCount, color: StatusColor.Live },
  ];
  return (
    <RoadmapWrapper>
      <StatusHeader>
        <h3>Roadmap</h3>
        <Link to="/roadmap">View</Link>
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
export default Roadmap;
