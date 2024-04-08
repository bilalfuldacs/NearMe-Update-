import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardActionArea, CardContent, Container, Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Index = () => {
	const navigate = useNavigate();

	const cards = [
		{ title: 'My Audits', description: 'View completed and pending audits', path: '/myAudits' },
		{ title: 'Usage scenario', description: 'View and create Usage scenarios', path: '/Usage-Scenario' },
		{
			title: 'Evaluation Requirements',
			description: 'Data/model evaluation requirements',
			path: '/model-evaluation',
		},
		{ title: 'New Audit', description: 'Start a new audit', path: '/new-audit' },
		{ title: 'xAI', description: 'Start an xAI job', path: '/XAI' },
		{ title: 'SafeAI', description: 'Start a SafeAI job' },
		// ... other cards
	];

	const handleCardClick = (path: string) => {
		navigate(path);
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Grid container spacing={4}>
					{cards.map((card, index) => (
						<Grid item key={index} xs={12} sm={6} md={4}>
							<Card onClick={() => handleCardClick(card.path)}>
								<CardActionArea sx={{ backgroundColor: 'grey.200' }}>
									<Box sx={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<MenuIcon sx={{ fontSize: 60, color: 'grey.600' }} />
									</Box>
								</CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{card.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{card.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default Index;
