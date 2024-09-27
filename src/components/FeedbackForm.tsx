import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Breadcrumb from "./UI/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import addLogo from "@/assets/shared/icon-new-feedback.svg";
import editLogo from "@/assets/shared/icon-edit-feedback.svg";
import { Input } from "@/styles/Input";
import ArrowUp from "@/assets/shared/icon-arrow-up.svg";
import ArrowDown from "@/assets/shared/icon-arrow-down.svg";
import Dropdown from "./UI/Dropdown";
import { CommonInputStyle } from "@/styles/CommonInput";
import { categoryOptions, statusOptions } from "@/utils/constants/Options";
import { Textbox } from "@/styles/Textbox";
import { CommonButton, DeleteBtn, CancelBtn } from "@/styles/CommonButton";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "./PostReply";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "./UI/Loading";
import useAsync from "@/utils/hooks/useAsync";
import {
  addFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbackById,
} from "@/services/feedback";
import { SingleRequest } from "@/types/request";
import DeleteConfirmationModal from "./UI/Modals/DeleteModal";
export interface FormData {
  title: string;
  description: string;
  category: { name: string };
  authorId: string;
  status: { name: string };
}
interface FormErrors {
  title: string;
  description: string;
}
const FeedbackForm: React.FC<{
  edit?: boolean;
  path?: string;
  feedback?: SingleRequest;
}> = ({ edit, path, feedback }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(feedback);
  const { user } = useSelector((state: RootState) => state.User);
  const urlVal = location.state?.from !== "/";
  const { id } = useParams<{ id: string }>();
  const { execute: executeGetFeedbackById, loading: isFeedbackLoading } =
    useAsync(
      getFeedbackById as (...args: unknown[]) => Promise<SingleRequest>,
      {
        onSuccess: (response) => {
          setFeedbackData(response as SingleRequest);
        },
      }
    );

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialCategory =
    edit && feedbackData
      ? (categoryOptions.find(
          (option) => option.name.toLowerCase() === feedbackData.category
        ) as { name: string })
      : categoryOptions[0];

  const initialStatus =
    edit && feedbackData
      ? (statusOptions.find(
          (option) => option.name.toLowerCase() === feedbackData.status
        ) as { name: string })
      : statusOptions[0];

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: initialCategory,
    authorId: user!.uid,
    status: initialStatus,
  });

  useEffect(() => {
    if (edit && !feedbackData && id) {
      executeGetFeedbackById(id as string);
    }
  }, []);

  useEffect(() => {
    if (feedbackData) {
      setFormData((prev) => {
        return {
          ...prev,
          title: feedbackData.title,
          description: feedbackData.description,
        };
      });
    }
  }, [feedbackData]);

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    description: "",
  });
  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} can't be empty`;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleDropdownChange =
    (key: "category" | "status") => (option: { name: string }) => {
      setFormData((prev) => ({ ...prev, [key]: option }));
    };
  const toggleDropdown = (key: "Category" | "Status") => () => {
    key === "Category"
      ? setIsCategoryOpen((prev) => !prev)
      : setIsStatusOpen((prev) => !prev);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      title: validateField("title", formData.title),
      description: validateField("description", formData.description),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      if (edit && feedbackData) {
        updateFeedback(feedbackData.id, formData);
        navigate(`${path ? path : "/"}`);
      } else {
        addFeedback(formData);
        navigate("/");
      }
    }
  };
  const onDelete = () => {
    if (feedbackData) {
      deleteFeedback(feedbackData.id);
      navigate("/");
    }
  };

  if (isFeedbackLoading) {
    return <Loading />;
  }

  return (
    <>
      <FormWrapper>
        <Breadcrumb url={edit ? path : urlVal && location.state?.from} />
        <Form onSubmit={onSubmit}>
          <AddLogo>
            {edit ? (
              <img src={editLogo} alt="Edit logo" />
            ) : (
              <img src={addLogo} alt="Add logo" />
            )}
          </AddLogo>
          <Title>
            {edit ? `Editing ‘${feedbackData?.title}’` : "Create New Feedback"}
          </Title>

          <FormBody>
            <FormGroup>
              <Label htmlFor="title">Feedback Title</Label>
              <Description>Add a short, descriptive headline</Description>
              <Input
                $isError={!!errors.title}
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.title}
              />
              {!!errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
            </FormGroup>
            <FormGroup style={{ position: "relative" }}>
              <Label htmlFor="category">Category</Label>
              <Description>Choose a category for your feedback</Description>
              <SelectButton type="button" onClick={toggleDropdown("Category")}>
                {formData.category?.name}
                {isCategoryOpen ? (
                  <img src={ArrowUp} alt="Arrow icon" />
                ) : (
                  <img src={ArrowDown} alt="Arrow icon" />
                )}
              </SelectButton>
              {isCategoryOpen && (
                <Dropdown
                  options={categoryOptions}
                  selectedOption={formData.category}
                  closeDropdown={() => setIsCategoryOpen(false)}
                  onSelect={handleDropdownChange("category")}
                  isCategory
                />
              )}
            </FormGroup>
            {edit && (
              <FormGroup style={{ position: "relative" }}>
                <Label htmlFor="status">Update Status</Label>
                <Description>Change feedback state</Description>
                <SelectButton type="button" onClick={toggleDropdown("Status")}>
                  {formData.status?.name}
                  {isStatusOpen ? (
                    <img src={ArrowUp} alt="Arrow icon" />
                  ) : (
                    <img src={ArrowDown} alt="Arrow icon" />
                  )}
                </SelectButton>
                {isStatusOpen && (
                  <Dropdown
                    options={statusOptions}
                    selectedOption={formData.status}
                    closeDropdown={() => setIsStatusOpen(false)}
                    onSelect={handleDropdownChange("status")}
                    isCategory
                  />
                )}
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="detail">Feedback Detail</Label>
              <Description>
                Include any specific comments on what should be improved, added,
                etc.
              </Description>
              <Textbox
                $isError={!!errors.description}
                value={formData.description}
                onChange={handleChange}
                name="description"
              />
              {!!errors.description && (
                <ErrorMessage>{errors.description}</ErrorMessage>
              )}
            </FormGroup>
          </FormBody>

          <FormFooter>
            {edit && (
              <DeleteBtn
                type="button"
                onClick={() => {
                  if (setIsModalOpen) {
                    setIsModalOpen(true);
                  }
                }}
              >
                Delete
              </DeleteBtn>
            )}
            <Link
              to={
                edit
                  ? path
                    ? `${window.location.origin}${path}`
                    : "/"
                  : location.state?.from
              }
            >
              <CancelBtn type="button">Cancel</CancelBtn>
            </Link>

            <AddBtn type="submit">
              {edit ? "Save Changes" : "Add Feedback"}
            </AddBtn>
          </FormFooter>
        </Form>
      </FormWrapper>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={onDelete}
      />
    </>
  );
};

const FormWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 92px 24px 100px;
  max-width: 588px;
  @media (max-width: 1024px) {
    padding-top: 60px;
  }
  @media (max-width: 767.98px) {
    padding: 34px 24px 70px;
  }
`;
const Form = styled.form`
  background: var(--primary-color);
  border-radius: var(--border-radius);
  padding: 52px 42px 40px;
  margin-top: 68px;
  position: relative;
  @media (max-width: 767.98px) {
    margin-top: 55px;
    padding: 44px 24px 24px;
  }
`;
const AddLogo = styled.div`
  position: absolute;
  top: -28px;
  left: 42px;
  width: 56px;
  height: 56px;
  img {
    width: 100%;
  }
  @media (max-width: 767.98px) {
    width: 40px;
    height: 40px;
    left: 24px;
    top: -20px;
  }
`;
const Title = styled.h1`
  font-weight: bold;
  font-size: var(--h1-size);
  line-height: var(--h1-line);
  letter-spacing: var(--h1-spacing);
  color: var(--text-primary);
  margin-bottom: 40px;
  @media (max-width: 767.98px) {
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(--h3-spacing);
    margin-bottom: 24px;
  }
`;
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const SelectButton = styled.button`
  ${CommonInputStyle}

  text-align: left;
  display:flex;
  align-items: center;
  justify-content: space-between;
    &:focus {
    border: 1px solid var(--link-color);
`;
const FormGroup = styled.div`
  ${Textbox} {
    width: 100%;
    min-height: 96px;
    @media (max-width: 767.98px) {
      min-height: 120px;
    }
  }
  ${ErrorMessage} {
    margin-top: 4px;
    display: inline-block;
  }
  ${Input},${SelectButton} {
    min-height: 48px;
    width: 100%;
    padding: 13px 24px;
    @media (max-width: 767.98px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`;
const Label = styled.label`
  margin-bottom: 2px;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  letter-spacing: -0.19px;
  color: var(--text-primary);
  font-weight: bold;
  @media (max-width: 767.98px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    letter-spacing: -0.18px;
  }
`;
const Description = styled.p`
  margin-bottom: 16px;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  font-weight: 400;
  color: var(--text-secondary);
  @media (max-width: 767.98px) {
    font-size: var(--body3-size);
    line-height: var(--body3-line);
  }
`;

const FormFooter = styled.div`
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  @media (max-width: 767.98px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
`;
const AddBtn = styled(CommonButton)`
  background: #ad1fea;
  margin-left: 16px;
  &:hover {
    background: #c75af6;
  }
  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;

export default FeedbackForm;
