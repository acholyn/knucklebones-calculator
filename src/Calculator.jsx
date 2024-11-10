import { useState } from "react";
import { Grid2 as Grid, TextField, Button, Typography } from "@mui/material";
import "./App.css";

export default function Calculator() {
	const [grid, setGrid] = useState(Array(9).fill(""));
	const [scores, setScores] = useState([0, 0, 0]);
	const [total, setTotal] = useState(0);

	const handleInputChange = (index, value) => {
		const newGrid = [...grid];
		newGrid[index] = value;
		setGrid(newGrid);
	};

	const calculateScores = () => {
		const newScores = [0, 0, 0];

		for (let col = 0; col < 3; col++) {
			const columnValues = [grid[col], grid[col + 3], grid[col + 6]].map(
				Number
			);
			const valueCounts = {};

			// Count occurrences of each number in the column
			columnValues.forEach((value) => {
				if (value !== 0 && !isNaN(value)) {
					// Ignore empty cells (0 or NaN)
					valueCounts[value] = (valueCounts[value] || 0) + 1;
				}
			});

			// Calculate score for this column
			let columnScore = 0;
			for (const [value, count] of Object.entries(valueCounts)) {
				if (count > 1) {
					columnScore += Number(value) * count * count;
				} else {
					columnScore += Number(value); // Add single occurrences
				}
			}

			newScores[col] = columnScore;
		}

		setScores(newScores);
		const totalScore = newScores.reduce((sum, score) => sum + score, 0);
		setTotal(totalScore);
	};

	return (
		<div className="kb-calculator__wrapper">
			<Grid container spacing={2} className="kb-calculator">
				{grid.map((value, index) => (
					<Grid xs={4} key={index}>
						<TextField
							fullWidth
							value={value}
							onChange={(e) => handleInputChange(index, e.target.value)}
							type="number"
						/>
					</Grid>
				))}
			</Grid>
			<Button
				onClick={calculateScores}
				variant="contained"
				className="kb-calculator__button"
			>
				Calculate Score
			</Button>
			<Typography variant="h6">Total: {total}</Typography>
		</div>
	);
}
