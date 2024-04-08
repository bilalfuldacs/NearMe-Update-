import React, { useEffect, useState, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import useRequirement_usageScenario from '../customHooks/Requirement_usageScenario';
import { usePostData } from '../customHooks/Requirement_usageScenario';
import RequirementsTable from './RequirementsTable'; // Assuming you have this component
import { Button, Box, Grid } from '@mui/material';
import { AuditInfo } from '../NewAudit/AuditInfo';
import DataTransformation from './DataTransformation';
import ProvenanceData from './ProvenanceData';
import EvaluationModules from './EvaluationModule';
import { usePatchData } from '../customHooks/Requirement_usageScenario';

interface RequirementData {
	requirementAssociationId: number;
	metric: string;
	compareOperator: string;
	compareValue: string;
	passFail: 'Pass' | 'Fail' | null;
	title: string;
}
interface ProvenanceData {
	parent: string;
	relation: string;
	child: string;
	date: string;
}

const initialState = {
	auditName: '',
	auditor: '',
	auditComment: '',
	// ... other state properties
};

function auditReducer(state, action) {
	switch (action.type) {
		case 'SET_AUDIT_NAME':
			return { ...state, auditName: action.payload };
		case 'SET_AUDITOR':
			return { ...state, auditor: action.payload };
		case 'SET_AUDIT_COMMENT':
			return { ...state, auditComment: action.payload };
		// ... other case handlers
		default:
			return state;
	}
}
const PendingAudits = () => {
	const [requirements, setRequirements] = useState<RequirementData[]>([]);
	const [{ auditName, auditor, auditComment }, dispatch] = useReducer(auditReducer, initialState);
	const [filteredprovenenceData, setfilteredprovenenceData] = useState([]);
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const auditId = query.get('auditId');
	const { data } = useRequirement_usageScenario(`/requirementAssociation?auditId=${auditId}`);
	const { data: provenenceData } = useRequirement_usageScenario(`/auditEvidence?auditId=${auditId}`);
	const { data: sideInfoData } = useRequirement_usageScenario(`/audit?auditId=${auditId}`);
	const { postData } = usePostData();
	const { patchData } = usePatchData();
	useEffect(() => {
		if (sideInfoData) {
			dispatch({ type: 'SET_AUDIT_NAME', payload: sideInfoData.auditName });
			dispatch({ type: 'SET_AUDITOR', payload: sideInfoData.createdBy });
			dispatch({ type: 'SET_AUDIT_COMMENT', payload: sideInfoData.auditComments });
		}
	}, [sideInfoData]);

	useEffect(() => {
		if (!data) return;
		const filteredData = provenenceData.provenances.map((provenance) => {
			// Determine if the current provenance item treats the main resource as a child
			const isChildAncestry = provenance.ancestry === 'CHILD';

			return {
				// If the ancestry is "CHILD", set "parent" to "rlOfRelative", otherwise to "rl"
				parent: isChildAncestry ? provenance.rl : provenance.rlOfRelative,
				// Concatenate all attributes with ", " as the separator
				relation: provenance.attributes.join(', '),
				// If the ancestry is "CHILD", set "child" to "rl", otherwise to "rlOfRelative"
				child: isChildAncestry ? provenance.rlOfRelative : provenance.rl,
				date: provenance.createdDate,
			};
		});

		setfilteredprovenenceData(filteredData);
		const processedData = data.map((item) => ({
			requirementAssociationId: item.requirementAssociationId,
			metric: item.requirement.target,
			compareOperator: item.requirement.operator,
			compareValue: item.requirement.value,
			passFail: null,
		}));

		setRequirements(processedData);
	}, [data]);
	const handleauditCommentChange = (newSummary) => {
		dispatch({ type: 'SET_AUDIT_COMMENT', payload: newSummary });
	};
	const handleSubmit = () => {
		const results = requirements.map((req) => ({
			requirementAssociationId: req.requirementAssociationId,
			result: req.passFail === null ? 'No Decision' : req.passFail,
		}));

		const patchPayload = {
			auditId: +auditId, // The + operator will attempt to convert a string to a number
			auditName,
			auditComments: auditComment,
		};
		postData('/requirementsResult', { results });
		patchData('/audit', patchPayload);
	};
	const handleAuditNameChange = () => {
		// Intentionally empty since auditName is not editable
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={8}>
				<RequirementsTable title="Requirements" requirements={requirements} setRequirements={setRequirements} />

				{<ProvenanceData provenanceData={filteredprovenenceData} />}
				<DataTransformation />
				<EvaluationModules />
			</Grid>
			<Grid item xs={12} md={4}>
				<AuditInfo
					auditName={auditName}
					auditor={auditor}
					summary={auditComment}
					readonly={true}
					setAuditName={handleAuditNameChange}
					setAuditComment={handleauditCommentChange}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PendingAudits;
