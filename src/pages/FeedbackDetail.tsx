import React from "react";
import useAsync from "@/utils/hooks/useAsync";
import Feedback from "@/components/Feedback";
import { getFeedbackById } from "@/services/feedback";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Breadcrumb from "@/components/UI/Breadcrumb";
import EditButton from "@/components/UI/EditButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => {
    return state.User;
  });

  const { data: feedback, loading: isFeedbackLoading } = useAsync(
    () => getFeedbackById(id!),
    {
      immediate: true,
    }
  );
  const isAuthor = user?.uid === feedback?.authorId;
  console.log(user);
  console.log(feedback);

  return (
    <DetailContainer>
      <DetailHeader>
        <Breadcrumb />
        {isAuthor && <EditButton />}
      </DetailHeader>
      {feedback && <Feedback feedback={feedback} isSingle />}
    </DetailContainer>
  );
};
const DetailContainer = styled.div`
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default FeedbackDetail;
