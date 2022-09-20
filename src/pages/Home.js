import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "@fontsource/vt323";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" alignItems="center" justifyContent="space-evenly">
      <Typography sx={{ font: '146px VT323', color: '#CC0000', textShadow: '5px 5px 0px rgba(0,0,0,0.2)', mt: -1 }}>
        OFF-WORLD HOME
      </Typography>
      <Box
        component="img"
        sx={{
          height: 140,
          width: 140,
        }}
        src="data:image/png;base64,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"
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("../welcome", { replace: true })}
        sx={{  
          font: '48px VT323',
          fontWeight: 'bold',
          color: '#FFFFFF',
          textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
          border: '3px solid #CC0000',
          height: '60px',
          background: '#CC0000',
          boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
          mt: 4, 
          '&:hover': { 
            color: '#B2BEB5',
            background: '#D73B3E',
            border: '3px solid #D73B3E',
            transform: 'scale(1.05)',
            boxShadow: 'rgba(105, 105, 105, 0.19) 0px 10px 20px, rgba(105, 105, 105, 0.23) 0px 6px 6px;',
          }
        }}
      >
        Back
      </Button>
    </Stack>
  );
};

export default Home;
