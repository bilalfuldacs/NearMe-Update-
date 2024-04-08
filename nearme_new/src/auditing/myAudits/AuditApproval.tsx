import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	TextField,
} from '@mui/material';

interface AuditRowProps {
	requirement: string;
	value: number;
	result: string;
	status: string;
}

const AuditRow: React.FC<AuditRowProps> = ({ requirement, value, result, status }) => (
	<TableRow>
		<TableCell>{requirement}</TableCell>
		<TableCell>{value}%</TableCell>
		<TableCell>{result}</TableCell>
		<TableCell>{status}</TableCell>
	</TableRow>
);

const AuditApproval = () => {
	return (
		<div>
			<h2>My Audits – Pending</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Requirement</TableCell>
							<TableCell>Value</TableCell>
							<TableCell>Result</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<AuditRow requirement="Accuracy > 90%" value={91} result="Pass" status="" />
						<AuditRow requirement="mIOU for tanks > 80%" value={86.1} result="Pass" status="" />
						<AuditRow requirement="Aircraft precision > 75%" value={99} result="Pass" status="" />
					</TableBody>
				</Table>
			</TableContainer>

			<h2>Evaluation modules</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<AuditRow requirement="Accuracy > 90%" value={91} result="Pass" status="View" />
						<AuditRow requirement="mIOU for tanks > 80%" value={86.1} result="Pass" status="View" />
					</TableBody>
				</Table>
			</TableContainer>

			<div>
				<TextField label=" Audit comments" multiline rows={4} variant="outlined" fullWidth margin="normal" />
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
					<Button variant="contained" color="error" style={{ marginRight: '0.5rem' }}>
						Reject
					</Button>
					<Button variant="contained" color="primary">
						Approve
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AuditApproval;
