import { useState, useCallback } from 'react';

interface PostDataResponse {
	numericId?: number;
	error?: string;
}

function useAudit(url: string) {
	const [response, setResponse] = useState<PostDataResponse>({});

	const postData = useCallback(
		async (dataToSend: object) => {
			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dataToSend),
				});
				if (!response.ok) throw new Error('Network response was not ok');

				// Assuming the response is JSON and has an 'id' field
				const jsonResponse = await response.json();

				// Setting the response with the numericId
				setResponse(jsonResponse);
			} catch (error) {
				setResponse({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
			}
		},
		[url],
	);

	return { postData, response };
}

export default useAudit;
