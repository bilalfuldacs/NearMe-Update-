import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useRequirement_usageScenario from '../customHooks/Requirement_usageScenario';
import { useNavigate } from 'react-router-dom';

interface FieldSet {
	metric: string;
	compare: string;
	value: string;
}

interface Fields {
	requirementName: string;
	fieldSets: FieldSet[];
	userSelection: string;
}

interface DataResponse {
	title?: string;
	requirement: {
		target: string;
		operator: string;
		value: string;
	};
	userSelection?: string;
}
// Define a type for the hook's return value that includes the possibility of data being null
interface RequirementUsageScenarioReturn {
	data: DataResponse | null;
	loading: boolean;
	error: any; // Adjust the error type based on your error handling strategy
}
function EvaluationRequirementsForm() {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const navigate = useNavigate();
	const [fields, setFields] = useState<Fields>({
		requirementName: '',
		fieldSets: [{ metric: '', compare: '', value: '' }],
		userSelection: '',
	});
	const [isReadOnly, setIsReadOnly] = useState(false);

	const requirementName = params.get('requirementName');
	const showBackButton = requirementName && isReadOnly;
	const apiUrl = requirementName ? `/requirements/${requirementName}` : '';
	const { data } = useRequirement_usageScenario(apiUrl) as RequirementUsageScenarioReturn;

	const handleBackClick = () => {
		navigate('/model-evaluation'); // Navigate back to the model-evaluation page
	};

	useEffect(() => {
		const userSelection = params.get('userSelection');
		if (data && params.get('readOnly')) {
			setIsReadOnly(true);

			setFields({
				requirementName: data.title ?? '',
				fieldSets: [
					{
						metric: data.requirement.target,
						compare: data.requirement.operator,
						value: data.requirement.value,
					},
				],
				userSelection: data.userSelection || '',
			});
		} else if (userSelection) {
			setIsReadOnly(false);
			setFields((prevFields) => ({
				...prevFields,
				userSelection: userSelection,
			}));
		}
	}, [data, isReadOnly]);

	const handleFieldSetChange = (index, event) => {
		const { name, value } = event.target;
		const updatedFieldSets = [...fields.fieldSets];
		if (updatedFieldSets[index]) {
			updatedFieldSets[index] = {
				...updatedFieldSets[index],
				[name]: value,
			};
		}
		setFields({ ...fields, fieldSets: updatedFieldSets });
	};

	const addFieldSet = () => {
		setFields((prevFields) => ({
			...prevFields,
			fieldSets: [...prevFields.fieldSets, { metric: '', compare: '', value: '' }],
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const originalPayload = {
			...fields,
			createdBy: 'ahmad',
		};
		const transformedPayload = {
			createdBy: 'Auditor', // Assuming you still need to change this; adjust as necessary
			title: originalPayload.requirementName, // Directly using the user-entered title
			requirement: originalPayload.fieldSets.map((fieldSet) => ({
				target: fieldSet.metric, // Directly using the user-entered metric as target
				operator: fieldSet.compare, // Directly using the user-entered comparison operator
				value: fieldSet.value, // Directly using the user-entered value
			})),
			requirementType: originalPayload.userSelection, // Directly using the user selection for requirement type
		};

		try {
			const response = await fetch('/requirements', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transformedPayload),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			//const responseData = await response.json();

			navigate('/model-evaluation');
		} catch (error) {
			console.error('Error during submission:', error);
		}
	};

	return (
		<div className="content-area">
			<TextField
				label="Requirement Name"
				fullWidth
				value={fields.requirementName}
				onChange={(e) => setFields({ ...fields, requirementName: e.target.value })}
				margin="normal"
				InputProps={{
					readOnly: isReadOnly,
				}}
			/>
			{fields.fieldSets.map((fieldSet, index) => (
				<Grid container spacing={2} key={index} mt={2}>
					<Grid item xs={4}>
						<TextField
							label="Metric"
							fullWidth
							name="metric"
							value={fieldSet.metric}
							InputProps={{
								readOnly: isReadOnly,
							}}
							onChange={(e) => handleFieldSetChange(index, e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Compare"
							fullWidth
							name="compare"
							value={fieldSet.compare}
							InputProps={{
								readOnly: isReadOnly,
							}}
							onChange={(e) => handleFieldSetChange(index, e)}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Value"
							fullWidth
							name="value"
							value={fieldSet.value}
							InputProps={{
								readOnly: isReadOnly,
							}}
							onChange={(e) => handleFieldSetChange(index, e)}
						/>
					</Grid>
				</Grid>
			))}
			{!isReadOnly && (
				<>
					<Button variant="contained" size="small" onClick={addFieldSet} sx={{ mt: 2 }}>
						Add New Field Set
					</Button>
					<Button variant="contained" size="small" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
						Submit
					</Button>
				</>
			)}
			{showBackButton && (
				<Button variant="contained" onClick={handleBackClick} sx={{ mt: 2 }}>
					Back
				</Button>
			)}
		</div>
	);
}

export default EvaluationRequirementsForm;
