import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Button,
	Menu,
	MenuItem,
	Pagination,
	CircularProgress,
} from '@mui/material';
import { usageScenarioUrls, evaluationRequirementUrls } from './apiConfig';
import useRequirement_usageScenario from './customHooks/Requirement_usageScenario';
//Details page to list requirements and usage scnearios

const Details = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const usageScenarioUrl = usageScenarioUrls;
	const evaluationRequirementUrl = evaluationRequirementUrls;
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [pageData, setPageData] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isUsageScenario = location.pathname.startsWith('/Usage-Scenario');
	const { data, loading, error } = useRequirement_usageScenario(
		location.pathname.startsWith('/Usage-Scenario') ? usageScenarioUrl : evaluationRequirementUrl,
	);

	useEffect(() => {
		if (data) {
			setTotalPages(Math.ceil(data.length / itemsPerPage));
			const pageStart = (currentPage - 1) * itemsPerPage;
			setPageData(data.slice(pageStart, pageStart + itemsPerPage));
		}
	}, [data, currentPage]);

	const handleNewButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (location.pathname.startsWith('/model-evaluation')) {
			setAnchorEl(event.currentTarget);
		} else {
			navigate('/new-usage-scenario');
		}
	};

	const handleMenuItemClick = (userSelection: string) => {
		setAnchorEl(null);
		navigate(`/Evaluation-Requirements-Form?userSelection=${userSelection}`);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};
	const handleRowClick = (item) => {
		if (isUsageScenario) {
			navigate(`/new-usage-scenario?name=${encodeURIComponent(item.usageScenarioId)}&readOnly=true`);
		} else {
			navigate(`/Evaluation-Requirements-Form?requirementName=${encodeURIComponent(item.requirementId)}&readOnly=true`);
		}
	};

	if (loading)
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</div>
		);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<Container maxWidth="md" sx={{ mt: 4 }}>
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Created By</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pageData.map((item, index) => (
							<TableRow key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
								<TableCell>{item.title}</TableCell>
								<TableCell>{isUsageScenario ? item.usageScenario : item.requirementType}</TableCell>
								<TableCell>{item.createdBy}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* Pagination controls */}
				<Container sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
					<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
				</Container>
				<Button variant="contained" color="primary" onClick={handleNewButtonClick} sx={{ m: 2 }}>
					New
				</Button>
				<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
					{location.pathname.startsWith('/model-evaluation') && (
						<>
							<MenuItem onClick={() => handleMenuItemClick('model')}>Model</MenuItem>
							<MenuItem onClick={() => handleMenuItemClick('dataset')}>Dataset</MenuItem>
						</>
					)}
				</Menu>
			</Paper>
		</Container>
	);
};

export default Details;
