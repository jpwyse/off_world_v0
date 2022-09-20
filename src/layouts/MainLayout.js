import React from "react";
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const MainLayout = () => {
	return (
		<React.Fragment>
			<Box
				component="main"
	      sx={{
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'center',
	        alignItems: 'center',
	        height: '100vh',
	        width: '100vw',
	        background: '#FAF0E6',
	        zIndex: 1,
	        pt: 0,
	        pb: 10,
	      }}
	    >
	    	<Outlet />
			</Box>
		</React.Fragment>
	);
};

export default MainLayout;