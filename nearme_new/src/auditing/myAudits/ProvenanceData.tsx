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
	Typography,
	Button,
	Grid,
} from '@mui/material';

// Ensure this interface accurately reflects the structure of your provenance data
interface ProvenanceData {
	parent: string;
	relation: string;
	child: string;
	date: string;
}

interface ProvenanceDataProps {
	provenanceData: ProvenanceData[]; // This assumes ProvenanceData is the correct structure for your data
}

const ProvenanceData: React.FC<ProvenanceDataProps> = ({ provenanceData }) => {
	return (
		<Box sx={{ marginTop: 2 }}>
			<Typography variant="h6" sx={{ padding: 2 }}>
				Provenance Data
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Parent</TableCell>
							<TableCell>Relation</TableCell>
							<TableCell>Child</TableCell>
							<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{provenanceData.map((data, index) => (
							<TableRow key={index}>
								<TableCell>{data.parent}</TableCell>
								{<TableCell>{data.relation}</TableCell>}
								<TableCell>{data.child}</TableCell>
								<TableCell>{data.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container spacing={2} sx={{ justifyContent: 'center', padding: 2 }}>
				<Grid item>
					<Button variant="contained" color="success">
						Pass
					</Button>
				</Grid>
				<Grid item>
					<Button variant="contained" color="error">
						Fail
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProvenanceData;
