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
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";
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

  return (
    <DetailContainer>
      <DetailHeader>
        <Breadcrumb />
        {isAuthor && <EditButton />}
      </DetailHeader>
      {feedback && <Feedback feedback={feedback} isSingle />}
      {feedback && <Comments feedback={feedback} />}
      <AddComment />
    </DetailContainer>
  );
};
const DetailContainer = styled.div`
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 24px 130px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1024px) {
    padding: 56px 24px 120px;
  }
  @media (max-width: 767.98px) {
    padding: 24px 24px 88px;
  }
`;
const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default FeedbackDetail;
