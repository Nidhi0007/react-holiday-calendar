import React from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
const ModalPopup = ({ isShowing, hide, selectedHoliday }) => {
  return (
    <Dialog
      open={isShowing}
      onClose={hide}
      fullWidth={true}
      maxWidth={'sm'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{selectedHoliday.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedHoliday.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalPopup;
