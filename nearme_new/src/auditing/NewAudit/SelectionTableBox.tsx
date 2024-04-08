import React, { useState } from 'react';
import {
	Box,
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Pagination,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
interface TableData {
	checked: boolean;
	requirementName: string;
	requirement: string;
	createdBy: string;
}

interface SelectionTableBoxProps {
	title: string;
	dropdownOptions: string[];
	tableData: TableData[];
	selectedValue: string[]; // Always an array
	onDropdownChange: (event: SelectChangeEvent<string[]>) => void;
	onCheckboxChange: (index: number) => void;
	multiple?: boolean;
}

export const SelectionTableBox: React.FC<SelectionTableBoxProps> = ({
	title,
	dropdownOptions,
	tableData,
	selectedValue,
	onDropdownChange,
	onCheckboxChange,
	multiple = false,
}) => {
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	const count = Math.ceil(tableData.length / rowsPerPage);
	const indexOfFirstItem = (page - 1) * rowsPerPage;
	const currentTableData = tableData.slice(indexOfFirstItem, indexOfFirstItem + rowsPerPage);

	return (
		<Box mb={2}>
			<Box component="fieldset" sx={{ border: '1px solid', borderColor: 'divider', p: 2, mt: 1, mb: 2 }}>
				<Typography component="legend" sx={{ marginBottom: 2 }}>
					{title}
				</Typography>
				<FormControl fullWidth margin="normal" variant="outlined">
					<InputLabel>{title}</InputLabel>
					<Select
						multiple={multiple}
						value={selectedValue}
						onChange={onDropdownChange}
						label={title}
						renderValue={(selected) => (typeof selected === 'string' ? selected : selected.join(', '))}
					>
						{dropdownOptions.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox"></TableCell>
								<TableCell>Requirement Name</TableCell>
								<TableCell>Requirement</TableCell>
								<TableCell>Created by</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentTableData.map((row, index) => {
								const actualIndex = indexOfFirstItem + index;
								return (
									<TableRow key={actualIndex} selected={row.checked}>
										<TableCell padding="checkbox">
											<Checkbox checked={row.checked} onChange={() => onCheckboxChange(actualIndex)} />
										</TableCell>
										<TableCell>{row.requirementName}</TableCell>
										<TableCell>{row.requirement}</TableCell>
										<TableCell>{row.createdBy}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={count}
					page={page}
					onChange={handleChangePage}
					color="primary"
					showFirstButton
					showLastButton
				/>
			</Box>
		</Box>
	);
};
