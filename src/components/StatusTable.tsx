import { useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Status, Request, StatusColor } from "@/types/request";
import Feedback from "./Feedback";

interface TabInfo {
  status: Status;
  label: string;
  color: StatusColor;
  description: string;
}
const tabs: TabInfo[] = [
  {
    status: Status.Planned,
    label: "Planned",
    color: StatusColor.Planned,
    description: "Ideas prioritized for research",
  },
  {
    status: Status.Progress,
    label: "In Progress",
    color: StatusColor.Progress,
    description: "Currently being developed",
  },
  {
    status: Status.Live,
    label: "Live",
    color: StatusColor.Live,
    description: "Released features",
  },
];
const StatusTable = () => {
  const [activeTab, setActiveTab] = useState<Status>(Status.Planned);
  const { feedbackData } = useSelector((state: RootState) => state.Feedback);

  // const feedbacksByStatus = useMemo(() => {
  //   return tabs.reduce((acc, { status }) => {
  //     acc[status] = feedbackData.filter(
  //         (feedback) => feedback.status === status
  //     ); // Store the filtered feedbacks as an array
  //     return acc;
  //   }, {} as Record<Status, Request[]>); // Initialize as an empty object with the correct type
  // }, [feedbackData]);
  const feedbacksByStatus = useMemo(() => {
    return tabs.reduce((acc, { status }) => {
      acc[status] = Array.isArray(feedbackData) ? feedbackData.filter(
          (feedback) => feedback.status === status
      ) : []; // If feedbackData is not an array, return an empty array
      return acc;
    }, {} as Record<Status, Request[]>);
  }, [feedbackData]);


  const renderFeedbacks = (feedbacks: Request[]) => {
    return (
      <FeedbacksWrapper>
        {feedbacks.map((fData) => (
          <Feedback status={fData.status} feedback={fData} key={fData.id} />
        ))}
      </FeedbacksWrapper>
    );
  };
  return (
    <StatusContainer>
      <TabButtons role="tablist">
        {tabs.map(({ status, label, color }) => (
          <TabBtn
            name={label}
            key={status}
            role="tab"
            aria-selected={activeTab === status}
            aria-controls={`panel-${status}`}
            tabIndex={activeTab === status ? 0 : -1}
            onClick={() => setActiveTab(status)}
            $color={color}
            $selected={activeTab === status}
          >
            {label} ({feedbacksByStatus[status].length})
          </TabBtn>
        ))}
      </TabButtons>
      <Grid role="grid">
        {tabs.map(({ status, label, description }) => (
          <Column
            key={status}
            role="tabpanel"
            $activeTab={activeTab}
            $status={status}
            id={`panel-${status}`}
          >
            <ColumnTitle>
              {label} ({feedbacksByStatus[status].length})
            </ColumnTitle>
            <ColumnDescription>{description}</ColumnDescription>
            {renderFeedbacks(feedbacksByStatus[status])}
          </Column>
        ))}
      </Grid>
    </StatusContainer>
  );
};

const StatusContainer = styled.section``;
const TabButtons = styled.div`
  display: none;

  @media (max-width: 767.98px) {
    display: flex;
    height: 60px;
    border-bottom: 1px solid rgba(140, 146, 179, 0.25);
  }
`;
const TabBtn = styled.button<{ $color: string; $selected: boolean }>`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: var(--body3-size);
  line-height: var(--body3-line);
  letter-spacing: -0.18px;
  color: var(--text-primary);
  opacity: 0.4;
  ${({ $selected, $color }) => {
    if ($selected) {
      return `opacity: 1;
      border-bottom: 4px solid ${$color};

   `;
    }
  }}
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 30px;
  margin-top: 48px;
  @media (max-width: 1024px) {
    margin-top: 32px;
    column-gap: 10px;
  }
  @media (max-width: 767.98px) {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 24px;
    padding: 0 24px;
  }
`;
const Column = styled.div<{ $activeTab: Status; $status: Status }>`
  @media (max-width: 767.98px) {
    display: ${(props) =>
      props.$activeTab === props.$status ? "block" : "none"};
  }
`;
const ColumnTitle = styled.h3`
  font-size: var(--h3-size);
  line-height: var(--h3-line);
  letter-spacing: var(--h3-spacing);
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 4px;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: var(--h4-size);
    line-height: var(--h4-line);
    letter-spacing: var(--h4-spacing);
  }
`;
const ColumnDescription = styled.p`
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  color: var(--text-secondary);
  margin-bottom: 32px;
  @media (max-width: 1024px) {
    font-size: var(--h4-size);
    line-height: var(--h4-line);
    margin-bottom: 24px;
  }
  @media (max-width: 767.98px) {
    font-size: var(--h4-size);
    line-height: var(--h4-line);
    margin-bottom: 20px;
  }
`;
const FeedbacksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1024px) {
    gap: 16px;
  }
`;

export default StatusTable;
