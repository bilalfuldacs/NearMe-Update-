import React from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography,
} from '@mui/material';

interface EvaluationModule {
	name: string;
	status: 'In progress' | 'Ready' | 'Failed';
	decision: 'Pass' | 'Fail' | 'None';
	action: string; // For the action button text
}

const EvaluationModules = () => {
	// This is placeholder data, replace it with your actual fetching logic
	const modules: EvaluationModule[] = [
		{
			name: 'XAI job 1 for Tank model',
			status: 'In progress',
			decision: 'None',
			action: 'View results',
		},
		// ... more data
	];

	// Helper function to render the status button based on the module's status
	const renderStatusButton = (status: EvaluationModule['status']) => {
		let color: 'success' | 'warning' | 'error' | 'inherit' = 'inherit';
		let text = status;

		switch (status) {
			case 'In progress':
				color = 'warning';
				text = 'In progress';
				break;
			case 'Ready':
				color = 'success';
				text = 'Ready';
				break;
			case 'Failed':
				color = 'error';
				text = 'Failed';
				break;
			default:
				break;
		}

		return (
			<Button variant="contained" color={color} disableElevation>
				{text}
			</Button>
		);
	};

	return (
		<Box sx={{ marginY: 2 }}>
			<Typography variant="h6" gutterBottom>
				Evaluation modules
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Decision</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{modules.map((module, index) => (
							<TableRow key={index}>
								<TableCell>{module.name}</TableCell>
								<TableCell>{renderStatusButton(module.status)}</TableCell>
								<TableCell>
									<Button
										variant={module.decision === 'Pass' ? 'contained' : 'outlined'}
										color="success"
										sx={{ marginRight: 1 }}
									>
										Pass
									</Button>
									<Button variant={module.decision === 'Fail' ? 'contained' : 'outlined'} color="error">
										Fail
									</Button>
								</TableCell>
								<TableCell>
									<Button variant="text" color="primary">
										{module.action}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default EvaluationModules;
