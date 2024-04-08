// DataTransformation.tsx
import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
	Box,
} from '@mui/material';

interface DataTransformation {
	nameTransformation: string;
	sourceData: string;
	date: string;
}

const DataTransformation = () => {
	// Placeholder data, replace with your actual data fetching logic
	const dataTransformations: DataTransformation[] = [
		{
			nameTransformation: 'Make image black and white',
			sourceData: 'rl.spine.dataset.739701f5-0382-4ab5-aa1a-d2cdac0812d3',
			date: '26.03.2024 11:35:36',
		},
	];

	return (
		<TableContainer component={Paper} sx={{ marginTop: 2 }}>
			<Typography variant="h6" gutterBottom component="div" sx={{ padding: 2 }}>
				Data Transformations
			</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name Transformation</TableCell>
						<TableCell>Source Data</TableCell>
						<TableCell>Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataTransformations.map((transformation, index) => (
						<TableRow key={index}>
							<TableCell>{transformation.nameTransformation}</TableCell>
							<TableCell>{transformation.sourceData}</TableCell>
							<TableCell>{transformation.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
				<Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
					Pass
				</Button>
				<Button variant="contained" color="secondary">
					Fail
				</Button>
			</Box>
		</TableContainer>
	);
};

export default DataTransformation;
