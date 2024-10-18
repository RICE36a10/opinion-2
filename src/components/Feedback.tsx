import React from "react";
import styled from "styled-components";
import UpvoteButton from "./UI/UpvoteButton";
import CommentIcon from "@/assets/shared/icon-comments.svg";
import { Request, SingleRequest } from "@/types/request";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { Categories } from "@/utils/constants/Categories";
import { StatusColor, Status } from "@/types/request";
import { useLocation } from "react-router-dom";
const Feedback: React.FC<{
  feedback: Request | SingleRequest;
  isSingle?: boolean;
  status?: string;
}> = ({ feedback, isSingle, status }) => {
  const location = useLocation().pathname;
  const { comments } = useSelector((state: RootState) => state.Comment);
  const { title, description, category, commentCount, upvotes, id, upvotedBy } =
    feedback;
  const [commentC, setCommentC] = useState(commentCount);
  const categoryName = Categories.filter(
    (cat) => cat.toLowerCase() === category
  )[0];

  const statusState = (() => {
    switch (status) {
      case Status.Progress:
        return {
          color: StatusColor.Progress,
          label: "In Progress",
        };
      case Status.Planned:
        return {
          color: StatusColor.Planned,
          label: "Planned",
        };
      case Status.Live:
        return {
          color: StatusColor.Live,
          label: "Live",
        };
      default:
        return {
          color: "white",
          label: "Suggestion",
        };
    }
  })();

  useEffect(() => {
    setCommentC(comments.length);
  }, [comments]);
  const isComments = isSingle ? commentC : commentCount;
  const FeedbackContent = (
    <FeedbackWrapper $status={status} $bColor={statusState.color}>
      {status && (
        <StatusItem key={status}>
          <StatusDot color={statusState.color} />
          {statusState.label}
        </StatusItem>
      )}
      <ContentWrapper>
        <UpvoteButton
          status={status}
          vote={upvotes}
          id={id}
          upvotedBy={upvotedBy}
        />
        <Content>
          <h3>{title}</h3>
          <p>{description}</p>
          <span>{categoryName}</span>
        </Content>
      </ContentWrapper>

      <Comment>
        <img src={CommentIcon} alt="comment" />
        <span className={!isComments ? "opacity" : ""}>
          {!isComments ? 0 : isSingle ? commentC : commentCount}
        </span>
      </Comment>
    </FeedbackWrapper>
  );
  return isSingle ? (
    FeedbackContent
  ) : (
    <Link to={`/feedbacks/${id}`} state={{ path: location }}>
      {FeedbackContent}
    </Link>
  );
};

const FeedbackWrapper = styled.div<{
  $status: string | undefined;
  $bColor: string | undefined;
}>`
  display: flex;
  gap: 40px;
  padding: 28px 32px;
  border-radius: var(--border-radius);
  background: var(--primary-color);
//background-color: #ffa100;
//  background: #283048;  /* fallback for old browsers */
//  background: -webkit-linear-gradient(to right,#283048, #859398);  /* Chrome 10-25, Safari 5.1-6 */
//  background: linear-gradient(to right,#283048, #859398); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  @media (max-width: 767.98px) {
    gap: unset;
    position: relative;
    padding: 24px;
  }
  &:hover h3 {
    color: var(--link-color);
  }
  ${({ $status, $bColor }) => {
    if ($status) {
      return `border-radius: 5px;
        border-top:6px solid ${$bColor};
          padding: 24px 32px 32px;
          flex-direction: column;
          gap:unset;
          position: relative;
          @media(max-width:1024px){
          padding: 20px 20px 24px;

          }
          @media(max-width:767.98px){
          padding: 16px 24px 24px;
          border-radius:var(--border-radius)

          }
          ${Comment}{
            position: absolute;
    right: 32px;
    bottom: 32px;
    font-size: var(--body1-size);
    line-height: var(--body1-line);
    letter-spacing: -0.22px;
    height:40px;
    @media(max-width:1024px){
    height:32px;
    bottom:24px;
    right: 20px;
     font-size: var(--body3-size);
     line-height: var(--body3-line);
     letter-spacing: -0.18px;

    }
     @media(max-width:767.98px){
     right:24px
     }
          }
          ${ContentWrapper}{
           flex-direction: column-reverse;
           gap: 16px;
           ${Content} p{
           margin-bottom:16px !important;
           @media(max-width:1024px){
            font-size: var(--body2-size);
            line-height: var(--body2-line);
            margin-bottom:24px !important;
           }
           }
            ${Content} h3{
            @media(max-width:1024px){
            font-size: var(--body1-size);
            line-height: var(--body1-line);
            letter-spacing: -0.18px;
            margin-bottom:9px;
            }
            }
    
          }

        
        `;
    }
  }}
`;
const StatusItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  font-weight: 400;
  margin-bottom: 8px;
  @media (max-width: 1024px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    margin-bottom: 14px;
  }
`;
const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 16px;
  background-color: ${({ color }) => color};
`;
const Content = styled.div`
  h3 {
    font-weight: bold;
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(h3-spacing);
    margin-bottom: 4px;
    transition: var(--transition);
    color: var(--text-primary);
    &:hover {
      color: var(--link-color);
    }
    @media (max-width: 767.98px) {
      font-size: var(--body1-size);
      line-height: var(--body1-line);
      letter-spacing: -0.18px;
    }
  }
  p {
    font-size: var(--body1-size);
    line-height: var(--body1-line);
    color: var(--text-secondary);
    font-weight: 400;
    margin-bottom: 12px;
    @media (max-width: 767.98px) {
      font-size: var(--body2-size);
      line-height: var(--body2-line);
    }
  }
  span {
    background: var(--bg-secondary);
    color: var(--link-color);
    padding: 6px 16px;
    font-weight: 600;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    border-radius: var(--border-radius);
    transition: var(--transition);
  }
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-weight: bold;
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  letter-spacing: -0.22px;
  color: var(--text-primary);
  .opacity {
    opacity: 0.5;
  }
  @media (max-width: 767.98px) {
    position: absolute;
    right: 24px;
    bottom: 32px;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    letter-spacing: -0.18px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: baseline;
  @media (max-width: 767.98px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;
export default Feedback;
