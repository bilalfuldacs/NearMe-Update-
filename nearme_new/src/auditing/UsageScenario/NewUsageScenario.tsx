import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, TextField, Button, Box } from '@mui/material';
import useRequirement_usageScenario from '../customHooks/Requirement_usageScenario';
import { usePostData } from '../customHooks/Requirement_usageScenario';

interface UsageScenarioData {
	title: string;
	usageScenario: string;
	// Include other properties as needed
}
const NewUsageScenario = () => {
	const { postData } = usePostData();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const navigate = useNavigate();
	const [usageScenarioFields, setUsageScenarioFields] = useState({
		usageScenarioName: '',
		scenarioDetails: '',
	});
	const [isReadOnly, setIsReadOnly] = useState(false);
	const name = params.get('name');
	const apiUrl = name ? `/usagescenario/${name}` : '';
	const { data } = useRequirement_usageScenario(apiUrl);

	useEffect(() => {
		// Assuming `data` can be of type `UsageScenarioData | null`
		const scenarioData = data as UsageScenarioData | null;

		if (scenarioData && params.get('readOnly')) {
			setIsReadOnly(true);
			setUsageScenarioFields({
				usageScenarioName: scenarioData.title || '',
				scenarioDetails: scenarioData.usageScenario || '',
			});
		}
	}, [data, isReadOnly]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
		setUsageScenarioFields((prevFields) => ({
			...prevFields,
			[field]: e.target.value,
		}));
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const payload = {
			title: usageScenarioFields.usageScenarioName,
			usageScenario: usageScenarioFields.scenarioDetails,
			createdBy: 'Bilal',
		};

		try {
			await postData('/usagescenario', payload);

			setUsageScenarioFields({
				usageScenarioName: '',
				scenarioDetails: '',
			});
			navigate('/Usage-Scenario');
		} catch (error) {
			console.error('Failed to submit usage scenario:', error);
		}
	};
	const handleBackClick = () => {
		navigate('/Usage-Scenario'); // Adjust this URL as necessary
	};

	// Determine if the back button should be shown
	const showBackButton = name && params.get('readOnly');
	return (
		<Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ p: 0 }}>
			{showBackButton && (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
					<Button variant="contained" onClick={handleBackClick}>
						Back
					</Button>
				</Box>
			)}
			<TextField
				label="Usage Scenario Name"
				variant="outlined"
				fullWidth
				value={usageScenarioFields.usageScenarioName}
				onChange={(event) => handleChange(event, 'usageScenarioName')}
				sx={{ mb: 2 }}
				InputProps={{
					readOnly: isReadOnly,
				}}
			/>
			<Paper elevation={1} sx={{ p: 2, mb: 2, minHeight: '150px' }}>
				<TextField
					placeholder="Enter scenario details"
					multiline
					rows={4}
					variant="outlined"
					fullWidth
					value={usageScenarioFields.scenarioDetails}
					onChange={(e) => handleChange(e, 'scenarioDetails')}
					InputProps={{
						readOnly: isReadOnly,
					}}
				/>
			</Paper>
			{!isReadOnly ? (
				<Button type="submit" variant="contained">
					Submit
				</Button>
			) : (
				<Box sx={{ display: 'flex' }}>
					<Button variant="contained" onClick={() => navigate('/Evaluation-Requirements-Form?userSelection=model')}>
						Create Model Evaluation
					</Button>
					<Button
						variant="contained"
						sx={{ ml: 3 }}
						onClick={() => navigate('/Evaluation-Requirements-Form?userSelection=dataset')}
					>
						Create Dataset Evaluation
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default NewUsageScenario;
