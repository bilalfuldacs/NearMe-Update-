import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { SelectionTableBox } from './SelectionTableBox';
import DropdownBox from './DropdownBox';
import { AuditInfo } from './AuditInfo';
import useRequirement_usageScenario from '../customHooks/Requirement_usageScenario';
import { usePostData } from '../customHooks/Requirement_usageScenario';
import type { State, Action } from '../interfaces/interface';
import { useNavigate } from 'react-router-dom';

const initialState: State = {
	modelSelection: '',
	datasetSelection: [],
	usageScenario: '',
	usageScenarios: [], // Initialize as an empty array.
	metricsSelection: [],
	auditName: '',
	auditComment: '',
	modelTableData: [],
	datasetTableData: [],
	expandedGroup: null,
};

interface Model {
	name: string;
	rl: string;
}

interface Dataset {
	name: string;
}
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_MODEL_SELECTION':
			return { ...state, modelSelection: action.payload };
		case 'SET_DATASET_SELECTION':
			return { ...state, datasetSelection: action.payload };
		case 'SET_USAGE_SCENARIO':
			return { ...state, usageScenario: action.payload };
		case 'SET_METRICS_SELECTION':
			return { ...state, metricsSelection: action.payload };
		case 'SET_AUDIT_NAME':
			return { ...state, auditName: action.payload };
		case 'SET_AUDIT_COMMENT':
			return { ...state, auditComment: action.payload };
		case 'TOGGLE_MODEL_CHECKBOX': {
			const { modelTableData } = state;
			const updatedModelTableData = [...modelTableData];

			if (updatedModelTableData[action.index]) {
				updatedModelTableData[action.index] = {
					...updatedModelTableData[action.index],
					checked: !updatedModelTableData[action.index].checked,
				};
			}
			return {
				...state,
				modelTableData: updatedModelTableData,
			};
		}
		case 'TOGGLE_DATASET_CHECKBOX': {
			const { datasetTableData } = state;
			const updatedDatasetTableData = [...datasetTableData];

			if (updatedDatasetTableData[action.index]) {
				updatedDatasetTableData[action.index] = {
					...updatedDatasetTableData[action.index],
					checked: !updatedDatasetTableData[action.index].checked,
				};
			}

			return {
				...state,
				datasetTableData: updatedDatasetTableData,
			};
		}
		case 'TOGGLE_GROUP':
			return {
				...state,
				expandedGroup: action.payload === state.expandedGroup ? null : action.payload,
			};
		case 'SET_MODEL_TABLE_DATA':
			return { ...state, modelTableData: action.payload };
		case 'SET_DATASET_TABLE_DATA':
			return { ...state, datasetTableData: action.payload };
		case 'SET_USAGE_SCENARIOS':
			return { ...state, usageScenarios: action.payload };
		default:
			return state;
	}
};

const Index = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [modelOptions, setModelOptions] = useState([]);
	const [selectedModelRL, setSelectedModelRL] = useState('');
	const [datasetNames, setDatasetNames] = useState([]);
	// const modelDropdownOptions = ['Model A', 'Model B'];
	// const datasetDropdownOptions = ['Dataset A', 'Dataset B'];
	const { data, loading } = useRequirement_usageScenario('/requirementssearch?page=1&size=100');
	const { postData } = usePostData();
	const navigate = useNavigate();
	const { data: usageScenariosData, loading: loadingUsageScenarios } =
		useRequirement_usageScenario('/listallusagescenarios');
	const { data: allDatasets } = useRequirement_usageScenario(
		`/listDatasetsForAudit?rlOfTheCurrentModel=${selectedModelRL}&principalRl=rl..spine.principal.ba482f23-1e6d-4942-b978-a42f2c9ea173`,
	);
	console.log(selectedModelRL);
	const { data: allModels } = useRequirement_usageScenario(
		'/listModels?principalRl=rl..spine.principal.ba482f23-1e6d-4942-b978-a42f2c9ea173',
	);
	const handleToggleGroup = (groupId: string) => {
		dispatch({ type: 'TOGGLE_GROUP', payload: groupId });
	};

	useEffect(() => {
		if (!loadingUsageScenarios && usageScenariosData) {
			dispatch({ type: 'SET_USAGE_SCENARIOS', payload: usageScenariosData });
		}
	}, [loadingUsageScenarios, usageScenariosData]);

	useEffect(() => {
		if (Array.isArray(allModels)) {
			const options = allModels.map((model: Model) => ({
				name: model.name,
				rl: model.rl,
			}));
			setModelOptions(options);
		}
	}, [allModels]);

	useEffect(() => {
		if (Array.isArray(allDatasets)) {
			const names = allDatasets.map((dataset: Dataset) => dataset.name);
			setDatasetNames(names);
		}
	}, [allDatasets]);

	const usageScenarioOptions = state.usageScenarios.map((scenario) => scenario.title);
	useEffect(() => {
		if (data && !loading) {
			const groupedRequirements = data.reduce((acc, item) => {
				const groupId = `${item.requirementGroupId}-${item.requirementType}`; // Composite key
				if (!acc[groupId]) {
					acc[groupId] = {
						checked: false,
						requirementType: item.requirementType,
						requirementName: item.title,
						requirements: [],
						createdBy: item.createdBy,
					};
				}
				acc[groupId].requirements.push({
					checked: false,
					requirementId: item.requirementId,
					requirementName: item.title,
					requirement: `${item.requirement.target} ${item.requirement.operator} ${item.requirement.value}`,
					createdBy: item.createdBy,
				});
				return acc;
			}, {});
			const requirements = Object.keys(groupedRequirements).map((key) => ({
				...groupedRequirements[key],
				requirementGroupId: key.split('-')[0],
			}));
			const modelRequirements = requirements.filter((r) => r.requirementType.toLowerCase() === 'model');
			const datasetRequirements = requirements.filter((r) => r.requirementType.toLowerCase() === 'dataset');
			dispatch({ type: 'SET_MODEL_TABLE_DATA', payload: modelRequirements });
			dispatch({ type: 'SET_DATASET_TABLE_DATA', payload: datasetRequirements });
		}
	}, [data, loading]);

	const handleNextClick = async () => {
		// if (state.modelSelection.trim() === '') {
		// 	alert('Please select exactly one model.');
		// 	return;
		// }

		const isAnyModelRequirementSelected = state.modelTableData.some((data) => data.checked);
		if (!isAnyModelRequirementSelected) {
			alert('Please select at least one model requirement.');
			return;
		}
		// if (state.datasetSelection.length === 0) {
		// 	alert('Please select at least one dataset.');
		// 	return;
		// }

		const isAnyDatasetRequirementSelected = state.datasetTableData.some((data) => data.checked);
		if (!isAnyDatasetRequirementSelected) {
			alert('Please select at least one dataset requirement.');
			return;
		}
		if (state.auditName.trim() === '') {
			alert('Please enter an audit name.');
			return;
		}

		const getSelectedRequirementIds = (data) => {
			const checkedGroups = data.filter((group) => group.checked);

			const selectedRequirementIds = checkedGroups.flatMap((group) =>
				group.requirements.map((req) => req.requirementId),
			);

			return selectedRequirementIds;
		};

		const selectedModelRequirementIds = getSelectedRequirementIds(state.modelTableData);
		const selectedDatasetRequirementIds = getSelectedRequirementIds(state.datasetTableData);

		const combinedRequirementIds = [...selectedModelRequirementIds, ...selectedDatasetRequirementIds];

		const AuditPayload = {
			createdBy: 'ahmad',
			auditName: state.auditName,
			auditComments: state.auditComment,
		};

		try {
			const auditResponse = await postData('/audit', AuditPayload);
			const auditId = auditResponse.id;
			const requirementAssociationPayload = {
				auditId: auditId,
				requirementIds: combinedRequirementIds,
			};
			await postData('/requirementAssociation', requirementAssociationPayload);

			const auditResultPayload = {
				auditId: auditId,
				result: 'No Decision',
			};
			await postData('/auditResult', auditResultPayload);
			const auditResourceDataPaylod = {
				auditId: auditId,
				resourceLocator: selectedModelRL,
				resourceType: 'model',
			};
			await postData('/auditResource', auditResourceDataPaylod);
			const provenanceDataPaylod = {
				auditId: auditId,
				principalRl: 'rl..spine.principal.ba482f23-1e6d-4942-b978-a42f2c9ea173',
			};
			await postData('/auditInfoCollector', provenanceDataPaylod);

			console.log('About to navigate');
			navigate('/myAudits');
			console.log('Navigate should have been called');
		} catch (error) {
			console.error('Error during post operations:', error);
		}
	};
	const handleModelChange = (selectedModelName) => {
		const selectedModel = modelOptions.find((model) => model.name === selectedModelName);
		if (selectedModel) {
			setSelectedModelRL(selectedModel.rl);
			dispatch({ type: 'SET_MODEL_SELECTION', payload: selectedModelName });
		}
	};
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<SelectionTableBox
						title="Model"
						dropdownTitle="Model Selection"
						dropdownOptions={modelOptions.map((option) => option.name)}
						tableData={state.modelTableData}
						selectedValue={[state.modelSelection]}
						onDropdownChange={(event) => handleModelChange(event.target.value)}
						onCheckboxChange={(index) => dispatch({ type: 'TOGGLE_MODEL_CHECKBOX', index })}
						toggleGroup={handleToggleGroup}
						expandedGroup={state.expandedGroup}
					/>
					<SelectionTableBox
						title="DataSet"
						dropdownTitle="Dataset Selection"
						dropdownOptions={datasetNames}
						tableData={state.datasetTableData}
						selectedValue={state.datasetSelection}
						onDropdownChange={(event) => {
							const value = event.target.value;
							dispatch({
								type: 'SET_DATASET_SELECTION',
								payload: typeof value === 'string' ? [value] : value,
							});
						}}
						toggleGroup={handleToggleGroup}
						expandedGroup={state.expandedGroup}
						onCheckboxChange={(index) => dispatch({ type: 'TOGGLE_DATASET_CHECKBOX', index })}
					/>

					<DropdownBox
						title="Usage Scenarios"
						options={usageScenarioOptions} // Use the state here
						selectedValue={state.usageScenario}
						onChange={(event) => dispatch({ type: 'SET_USAGE_SCENARIO', payload: event.target.value })}
					/>

					{/* <DropdownBox
                        title="Metrics Selection"
                        options={metricsDropdownOptions}
                        selectedValue={state.metricsSelection}
                        onChange={(e) => {
                            // Dispatch an action to the reducer with the new value
                            dispatch({
                                type: 'SET_METRIC_SELECTION',
                                payload: e.target.value as string[],
                            });
                        }}
                        multiple
                    /> */}
				</Grid>
				<Grid item xs={4}>
					<AuditInfo
						auditName={state.auditName}
						setAuditName={(name) => dispatch({ type: 'SET_AUDIT_NAME', payload: name })}
						auditor="Auditor: Jhon Doe"
						summary={state.auditComment}
						setAuditComment={(summary) => dispatch({ type: 'SET_AUDIT_COMMENT', payload: summary })}
					/>
				</Grid>
			</Grid>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 45, mt: 2 }}>
				<Button variant="contained" color="primary" onClick={handleNextClick}>
					Next
				</Button>
			</Box>
		</>
	);
};
export default Index;
