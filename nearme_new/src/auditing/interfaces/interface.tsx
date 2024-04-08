// Interfaces.ts
export interface Requirement {
	checked: boolean;
	requirementId: string;
	// Include additional properties as needed.
}

export interface UsageScenario {
	createdDate: string;
	createdBy: string;
	title: string;
	usageScenarioId: number;
	usageScenario: string;
}

export interface TableData {
	checked: boolean;
	requirementName: string;
	requirements: Requirement[];
	createdBy: string;
	requirementId?: string;
}

export interface State {
	modelSelection: string;
	datasetSelection: string[];
	usageScenario: string; // Assume single selection for simplicity.
	usageScenarios: UsageScenario[]; // To store fetched usage scenarios.
	metricsSelection: string[];
	auditName: string;
	auditComment: string;
	modelTableData: TableData[];
	datasetTableData: TableData[];
	expandedGroup: string | null;
}

export type Action =
	| { type: 'SET_MODEL_SELECTION'; payload: string }
	| { type: 'SET_DATASET_SELECTION'; payload: string[] }
	| { type: 'SET_USAGE_SCENARIO'; payload: string }
	| { type: 'SET_USAGE_SCENARIOS'; payload: UsageScenario[] } // Updated to handle fetched scenarios.
	| { type: 'SET_METRICS_SELECTION'; payload: string[] }
	| { type: 'SET_AUDIT_NAME'; payload: string }
	| { type: 'SET_AUDIT_COMMENT'; payload: string }
	| { type: 'TOGGLE_MODEL_CHECKBOX'; index: number }
	| { type: 'TOGGLE_DATASET_CHECKBOX'; index: number }
	| { type: 'TOGGLE_GROUP'; payload: string }
	| { type: 'SET_MODEL_TABLE_DATA'; payload: TableData[] }
	| { type: 'SET_DATASET_TABLE_DATA'; payload: TableData[] };

export interface DropdownBoxProps {
	title: string;
	options: string[]; // Options will be title strings from usageScenarios.
	selectedValue: string; // Assume single selection for simplicity.
	onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}
