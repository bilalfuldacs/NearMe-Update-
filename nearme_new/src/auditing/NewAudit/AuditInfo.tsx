import React from 'react';
import { Paper, TextField, Box } from '@mui/material';

interface AuditInfoProps {
	auditName: string;
	setAuditName: React.Dispatch<React.SetStateAction<string>>;
	auditor: string;
	summary: string;
	setAuditComment: React.Dispatch<React.SetStateAction<string>>;
	readonly?: boolean;
}

export const AuditInfo: React.FC<AuditInfoProps> = ({
	auditName,
	setAuditName,
	auditor,
	summary,
	setAuditComment,
	readonly,
}) => {
	return (
		<Box>
			<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
				<TextField
					required
					label="Audit Name"
					value={auditName}
					onChange={(e) => setAuditName(e.target.value)}
					fullWidth
					margin="dense"
					InputProps={{
						readOnly: readonly,
					}}
				/>
				<TextField
					label="Auditor"
					value={auditor}
					InputProps={{
						readOnly: true,
					}}
					fullWidth
					margin="dense"
				/>
				<TextField
					label="Audit Comment"
					value={summary}
					onChange={(e) => setAuditComment(e.target.value)}
					multiline
					rows={4}
					fullWidth
					margin="dense"
				/>
			</Paper>
		</Box>
	);
};
