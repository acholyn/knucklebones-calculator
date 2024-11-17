import { useEffect, useRef, useState } from "react";
import {
	Grid2 as Grid,
	TextField,
	Button,
	Typography,
	ButtonGroup,
} from "@mui/material";
import { Refresh, Calculate } from "@mui/icons-material";
import "./App.css";
import { match2, match3 } from "./App";

export default function Calculator() {
	const [grid, setGrid] = useState(Array(9).fill(""));
	const [scores, setScores] = useState([0, 0, 0]);
	const [columnTotals, setColumnTotals] = useState([0, 0, 0]);

	const [total, setTotal] = useState(0);
	const inputRefs = useRef(Array(9).fill(null));

	useEffect(() => {
		const newTotal = scores.reduce((sum, score) => sum + score, 0);
		setTotal(newTotal);
	}, [scores]);

	const handleInputChange = (index, value) => {
		const newGrid = [...grid];
		newGrid[index] = value;
		setGrid(newGrid);
		calculateScores();
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
				case "Enter":
					event.preventDefault();
					calculateScores();
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

	const resetScore = () => {
		setGrid(Array(9).fill(""));
		setScores([0, 0, 0]);
		setColumnTotals([0, 0, 0]);
		setTotal(0);
	};

	const calculateScores = () => {
		const newScores = [0, 0, 0];
		const columnTotals = [0, 0, 0];

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
			columnTotals[col] = columnScore;
		}

		setScores(newScores);
		setColumnTotals(columnTotals);

		// const totalScore = newScores.reduce((sum, score) => sum + score, 0);
		// setTotal(totalScore);
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

		if (matchCount === 3) return match3; //  green
		if (matchCount === 2) return match2; //  yellow
		return "white";
	};

	return (
		<div className="kb-calculator__wrapper">
			<ButtonGroup size="small">
				<Button
					onClick={resetScore}
					variant="outlined"
					color="secondary"
					startIcon={<Refresh />}
				>
					Reset
				</Button>
				<Button
					onClick={calculateScores}
					variant="contained"
					startIcon={<Calculate />}
				>
					Calculate Score
				</Button>
			</ButtonGroup>
			<Typography variant="h6">Total: {total}</Typography>
			<Grid container spacing={2} className="kb-calculator">
				{grid.map((value, index) => (
					<TextField
						className="kb-calculator__cell"
						key={index}
						size="large"
						value={value}
						onChange={(e) => handleInputChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						inputRef={(el) => (inputRefs.current[index] = el)}
						sx={{
							"& .MuiInputBase-input": {
								color: getTextColor(index),
							},
						}}
					/>
				))}
				{columnTotals.map((total, index) => (
					<Typography
						variant="body1"
						align="center"
						key={`total-${index}`}
						color="grey"
					>
						{total}
					</Typography>
				))}
			</Grid>
		</div>
	);
}
