import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface DropdownBoxProps {
	title: string;
	options: string[];
	selectedValue: string | string[];
	onChange: (event: SelectChangeEvent<string | string[]>) => void;
	multiple?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, options, selectedValue, onChange, multiple = false }) => {
	const selectValue = multiple ? selectedValue : (selectedValue as string);

	return (
		<Box mb={2}>
			<Box component="fieldset" sx={{ border: '1px solid', borderColor: 'divider', p: 2, mt: 1, mb: 2 }}>
				<Typography
					component="legend"
					sx={{ width: 'auto', display: 'inline-block', p: '0 5px', fontSize: '1.25rem', marginBottom: '8px' }}
				>
					{title}
				</Typography>
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor={title.toLowerCase().replace(/\s+/g, '-')}>{title}</InputLabel>
					<Select
						multiple={multiple}
						value={selectValue}
						onChange={onChange}
						label={title}
						inputProps={{
							id: title.toLowerCase().replace(/\s+/g, '-'),
						}}
						renderValue={(selected) => (multiple ? (selected as string[]).join(', ') : selected)}
					>
						{options.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
};
export default DropdownBox;
