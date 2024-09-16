import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="delete-confirmation-title" variant="h6" component="h2">
          Are you sure you want to delete this item?
        </Typography>
        <Typography sx={{ mt: 2 }}>This action cannot be undone.</Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
