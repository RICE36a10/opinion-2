import useAsync from "@/utils/hooks/useAsync";
import Feedback from "@/components/Feedback";
import { getFeedbackById } from "@/services/feedback";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Breadcrumb from "@/components/UI/Breadcrumb";
import EditButton from "@/components/UI/EditButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";
import loadingImg from "@/assets/loading-gear.svg";
import { setComments } from "@/redux/slices/commentSlice";

const FeedbackDetail = () => {
  const { id } = useParams<{ id: string }>();
  const url = useLocation().state?.path;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => {
    return state.User;
  });
  const { comments } = useSelector((state: RootState) => {
    return state.Comment;
  });
  const { data: feedback, loading: isFeedbackLoading } = useAsync(
    () => getFeedbackById(id!),
    {
      immediate: true,
      onSuccess: (response) => {
        dispatch(setComments(response.comments));
      },
    }
  );
  const isAuthor = !user ? false : user.uid === feedback?.authorId;
  if (isFeedbackLoading) {
    return (
      <Loading>
        <img src={loadingImg} alt="Loading" />
      </Loading>
    );
  }
  return (
    feedback && (
      <DetailContainer>
        <DetailHeader>
          <Breadcrumb url={url} />
          {isAuthor && <EditButton feedback={feedback} />}
        </DetailHeader>
        <Feedback feedback={feedback} isSingle />
        <Comments comments={comments} />
        <AddComment feedbackId={id!} />
      </DetailContainer>
    )
  );
};
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
const DetailContainer = styled.div`
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 24px 130px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: content-box;
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
