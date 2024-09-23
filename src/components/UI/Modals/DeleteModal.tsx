import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { CancelBtn as CBtn, DeleteBtn as DBtn } from "@/styles/CommonButton";
import styled, { css } from "styled-components";
interface DeleteModalOptions {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteModalOptions> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <>
      <Dialog
        onClose={onClose}
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions sx={{ paddingBottom: "0", paddingTop: "10px" }}>
          <Button onClick={onClose} sx={{ minWidth: "30px", height: "30px" }}>
            <CloseIcon />
          </Button>
        </DialogActions>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            paddingTop: "0px",
            fontFamily: "Jost, sans-serif",
            textAlign: "center",
            maxWidth: "300px",
            lineHeight: "normal",
            margin: "0 auto",
            "@media (max-width: 767.98px)": {
              fontSize: "16px",
            },
          }}
        >
          {"Are you sure to delete this feedback?"}
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            paddingBottom: "34px",
            minWidth: "400px",
            "@media (max-width: 767.98px)": {
              minWidth: "unset",
            },
          }}
        >
          <CancelBtn onClick={onClose}>Cancel</CancelBtn>
          <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Btn = css`
  padding: 10px 36px;
  min-height: 40px;
  width: auto;
  @media (max-width: 767.98px) {
    min-height: 36px;
  }
`;
const CancelBtn = styled(CBtn)`
  ${Btn}
`;
const DeleteBtn = styled(DBtn)`
  ${Btn}
  margin-right: unset;
`;
export default DeleteConfirmationModal;
