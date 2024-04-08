import { useState, useEffect } from 'react';

type ResponseState = string | object | null;
const useRequirement_usageScenario = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
				const json = await response.json();
				setData(json);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
};
export default useRequirement_usageScenario;

export function usePostData() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState<ResponseState>(null);

	const postData = async (url, payload) => {
		setLoading(true);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('The request was not successful.');
			}

			// Check the content type of the response
			const contentType = response.headers.get('Content-Type');

			if (contentType && contentType.includes('application/json')) {
				// Handle JSON response
				const data = await response.json();
				setResponse(data); // Save the response data to state
				return data; // Return the data for further handling
			} else {
				// Handle text/plain or other types of responses
				const textData = await response.text();
				setResponse(textData); // You might need to adjust your state if it should handle strings as well
				return textData; // Return the text data for further handling
			}
		} catch (error) {
			setError(error);
			console.error(error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return { postData, loading, error, response }; // Include the response in the returned object
}
export function usePatchData() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(); // Add state for the response

	const patchData = async (url, payload) => {
		setLoading(true);
		try {
			const response = await fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				throw new Error('The request was not successful.');
			}
			const data = await response.json(); // Assuming the response is JSON
			setResponse(data); // Save the response data to state

			return data; // Return the data for further handling
		} catch (error) {
			setError(error);
			console.error(error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return { patchData, loading, error, response }; // Include the response in the returned object
}
