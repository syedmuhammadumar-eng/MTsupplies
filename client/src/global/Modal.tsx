import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

const Modal = ({ open, setOpen }) => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">
        {"Forget Password"}
      </DialogTitle>
      <DialogContent>
        <DialogContent>
          <DialogContentText>
            please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="password"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;