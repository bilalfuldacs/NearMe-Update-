import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRequirement_usageScenario from '../customHooks/Requirement_usageScenario';

interface Audit {
	auditName: string;
	auditor: string;
	auditResult: 'Pass' | 'No Decision' | 'Fail'; // Updated to include "No Decision"
	createdBy?: string;
	auditId?: string;
}

const getStatusColor = (status: 'Pass' | 'No Decision' | 'Fail') => {
	switch (status) {
		case 'Pass':
			return { color: 'white', backgroundColor: 'green' }; // Example for custom styling
		case 'No Decision':
			return { color: 'black', backgroundColor: 'grey' }; // Grey color for "No Decision"
		case 'Fail':
			return { color: 'white', backgroundColor: 'red' }; // Example for custom styling
		default:
			return {}; // Default case, might not be needed
	}
};

const MyAudits = () => {
	const navigate = useNavigate();
	const { data: allAudits, loading } = useRequirement_usageScenario('/listaudits');
	const [filteredAudits, setFilteredAudits] = useState<Audit[]>([]);

	// Pagination state
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		if (allAudits) {
			// Check if allAudits is not null before filtering
			const auditsCreatedByAhmad = allAudits.filter((audit) => audit.createdBy === 'ahmad');

			setFilteredAudits(auditsCreatedByAhmad);
		}
	}, [allAudits]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (loading) return <div>Loading...</div>;

	const handleRowClick = (audit: Audit) => {
		if (audit.auditResult === 'No Decision') {
			navigate(`/Pending-Audits?auditId=${audit.auditId}`);
		} else {
			navigate(`/audit/${audit.auditId}`);
		}
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Audit Name</TableCell>
							<TableCell>Auditor</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredAudits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((audit, index) => (
							<TableRow key={index} onClick={() => handleRowClick(audit)} style={{ cursor: 'pointer' }}>
								<TableCell component="th" scope="row">
									{audit.auditName}
								</TableCell>
								<TableCell>{audit.createdBy}</TableCell>
								<TableCell>
									<Button variant="contained" style={getStatusColor(audit.auditResult)}>
										{audit.auditResult}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={filteredAudits.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default MyAudits;
