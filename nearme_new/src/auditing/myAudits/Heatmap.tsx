import React, { useState } from 'react';
import { Box, Slider, FormGroup, FormControlLabel, Switch, Button, Grid } from '@mui/material';
import heatmapImage from './images/171025818430067385.jpeg';
import originalImage from './images/P90389007_highRes.jpg';

interface ImagePair {
	original: string;
	heatmap: string;
}

const imageData: ImagePair[] = Array(10).fill({
	original: originalImage,
	heatmap: heatmapImage,
});

const Heatmap = () => {
	const [overlayEnabled, setOverlayEnabled] = useState(false);
	const [transparency, setTransparency] = useState(50);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		if (currentIndex < imageData.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handleBack = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<Box sx={{ width: '100%', textAlign: 'center' }}>
			<FormGroup>
				<FormControlLabel
					control={<Switch checked={overlayEnabled} onChange={(e) => setOverlayEnabled(e.target.checked)} />}
					label="Overlay images"
				/>
				{overlayEnabled && (
					<Slider
						min={0}
						max={100}
						value={transparency}
						onChange={(_, newValue) => setTransparency(newValue as number)}
						aria-labelledby="transparency-slider"
						valueLabelDisplay="auto"
						sx={{ maxWidth: 300, margin: '0 auto' }}
					/>
				)}
			</FormGroup>
			{overlayEnabled ? (
				<Box sx={{ position: 'relative', width: '100%', height: '100%', marginTop: 2 }}>
					<img
						src={imageData[currentIndex].original}
						alt={`Original ${currentIndex}`}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
					<img
						src={imageData[currentIndex].heatmap}
						alt={`Heatmap ${currentIndex}`}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							opacity: transparency / 100,
						}}
					/>
				</Box>
			) : (
				<Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
					<Grid item xs={6}>
						<img
							src={imageData[currentIndex].original}
							alt={`Original ${currentIndex}`}
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</Grid>
					<Grid item xs={6}>
						<img
							src={imageData[currentIndex].heatmap}
							alt={`Heatmap ${currentIndex}`}
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</Grid>
				</Grid>
			)}
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
				<Button variant="contained" onClick={handleBack} disabled={currentIndex === 0}>
					Back
				</Button>
				<Button variant="contained" onClick={handleNext} disabled={currentIndex === imageData.length - 1}>
					Next
				</Button>
			</Box>
		</Box>
	);
};

export default Heatmap;
