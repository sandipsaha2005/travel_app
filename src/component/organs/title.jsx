import React from 'react';
import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
	FormHelperText,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';
const Title = ({ title, muiStyle }) => {
	return (
		<Box
			sx={{
				bgcolor: 'primary.main',
				p: 1.5,
				borderRadius: '10px',
				textAlign: 'start',
				...muiStyle,
			}}
		>
			<Typography variant='subtitle2' color='primary.contrastText'>
				{title}
			</Typography>
		</Box>
	);
};

export default Title;

{
	/* <Card
			sx={{
				borderRadius: '10px',
				...muiStyle,
				height: '50px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				p: 1,
			}}
			elevation={10}
		>
			<Card
				sx={{
					backgroundColor: 'primary.light',
					borderRadius: '5px',
					width: '100%',
					height: '100%',
					textAlign: 'center',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				elevation={20}
			>
				<Typography variant='h6' color='primary.contrastText'>
					{title}
				</Typography>
			</Card>
		</Card> */
}
