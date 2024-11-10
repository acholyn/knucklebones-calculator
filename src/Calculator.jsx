import { useRef, useState } from "react";
import { Grid2 as Grid, TextField, Button, Typography } from "@mui/material";
import "./App.css";

export default function Calculator() {
	const [grid, setGrid] = useState(Array(9).fill(""));
	const [scores, setScores] = useState([0, 0, 0]);
	const [total, setTotal] = useState(0);
	const inputRefs = useRef(Array(9).fill(null));

	const handleInputChange = (index, value) => {
		const newGrid = [...grid];
		newGrid[index] = value;
		setGrid(newGrid);
	};
	const handleKeyDown = (event, index) => {
		if (["1", "2", "3", "4", "5", "6"].includes(event.key)) {
			event.preventDefault();
			handleInputChange(index, event.key);
		} else {
			switch (event.key) {
				case "ArrowUp":
					event.preventDefault();
					if (index >= 3) inputRefs.current[index - 3].focus();
					break;
				case "ArrowDown":
					event.preventDefault();
					if (index < 6) inputRefs.current[index + 3].focus();
					break;
				case "ArrowLeft":
					event.preventDefault();
					if (index % 3 !== 0) inputRefs.current[index - 1].focus();
					break;
				case "ArrowRight":
					event.preventDefault();
					if (index % 3 !== 2) inputRefs.current[index + 1].focus();
					break;
				case "Backspace":
				case "Delete":
					event.preventDefault();
					handleInputChange(index, "");
					break;
				default:
					event.preventDefault();
					break;
			}
		}
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

	const getTextColor = (index) => {
		const colIndex = index % 3;
		const columnValues = [
			grid[colIndex],
			grid[colIndex + 3],
			grid[colIndex + 6],
		].map(Number);
		const currentValue = Number(grid[index]);

		if (isNaN(currentValue) || currentValue === 0) return "white";

		const matchCount = columnValues.filter((v) => v === currentValue).length;

		if (matchCount === 3) return "#90EE90"; //  green
		if (matchCount === 2) return "#ffe500"; //  yellow
		return "white";
	};

	return (
		<div className="kb-calculator__wrapper">
			<Button
				onClick={() => setGrid(Array(9).fill(""))}
				variant="outlined"
				className="kb-calculator__button"
				color="secondary"
				size="small"
			>
				Reset
			</Button>
			<Grid container spacing={2} className="kb-calculator">
				{grid.map((value, index) => (
					<Grid xs={4} key={index}>
						<TextField
							size="large"
							value={value}
							onChange={(e) => handleInputChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							inputRef={(el) => (inputRefs.current[index] = el)}
							type="number"
							sx={{
								"& .MuiInputBase-input": {
									color: getTextColor(index),
								},
							}}
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
