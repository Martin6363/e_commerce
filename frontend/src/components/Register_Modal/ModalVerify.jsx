import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRef } from 'react';

export default function ModalVerify({ user }) {
  const rootRef = useRef(null);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 145px)',
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
          display: 'none',
        },
      }}
      ref={rootRef}
    >
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: 'relative',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography id="server-modal-title" variant="h6" component="h2">
            Hi { user?.name }
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            Verification has been sent to your email address. Please verify in order to access the page
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}