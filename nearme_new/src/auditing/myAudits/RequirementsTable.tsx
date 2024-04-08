import React from 'react';
import {
	Button,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from '@mui/material';

interface RequirementData {
	requirementAssociationId: number;
	metric: string;
	compareOperator: string;
	compareValue: string;
	passFail: 'Pass' | 'Fail' | null;
}

interface RequirementsTableProps {
	title: string;
	requirements: RequirementData[];
	setRequirements: React.Dispatch<React.SetStateAction<RequirementData[]>>;
}

const RequirementsTable: React.FC<RequirementsTableProps> = ({ title, requirements, setRequirements }) => {
	const togglePassFail = (index: number, result: 'Pass' | 'Fail') => {
		setRequirements((prevData) =>
			prevData.map((item, idx) =>
				idx === index ? { ...item, passFail: item.passFail === result ? null : result } : item,
			),
		);
	};

	const getButtonColor = (isSelected: boolean, resultType: 'Pass' | 'Fail') => {
		if (isSelected) {
			return resultType === 'Pass' ? 'success' : 'error';
		}
		return 'inherit'; // Use the default color
	};

	return (
		<Box sx={{ margin: 2 }}>
			<Typography variant="h6" gutterBottom component="div">
				{title}
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Metric</TableCell>
							<TableCell>Compare Operator</TableCell>
							<TableCell>Compare Value</TableCell>
							<TableCell align="center">Decision</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requirements.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.metric}</TableCell>
								<TableCell>{row.compareOperator}</TableCell>
								<TableCell>{row.compareValue}</TableCell>
								<TableCell align="center">
									<Button
										variant={row.passFail === 'Pass' ? 'contained' : 'outlined'}
										color={getButtonColor(row.passFail === 'Pass', 'Pass')}
										onClick={() => togglePassFail(index, 'Pass')}
										sx={{
											marginRight: 1,
											...(row.passFail !== 'Pass' && {
												color: 'black',
												bgcolor: 'grey.300',
												'&:hover': { bgcolor: 'grey.400' },
											}),
										}}
									>
										Pass
									</Button>
									<Button
										variant={row.passFail === 'Fail' ? 'contained' : 'outlined'}
										color={getButtonColor(row.passFail === 'Fail', 'Fail')}
										onClick={() => togglePassFail(index, 'Fail')}
										sx={{
											...(row.passFail !== 'Fail' && {
												color: 'black',
												bgcolor: 'grey.300',
												'&:hover': { bgcolor: 'grey.400' },
											}),
										}}
									>
										Fail
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

export default RequirementsTable;
