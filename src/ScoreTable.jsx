import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { match2, match3 } from "./App";
export default function ScoreTable() {
	const rows = [1, 2, 3, 4, 5, 6].map((value) => ({
		diceValue: value,
		twoMatching: value * 2 * 2,
		threeMatching: value * 3 * 3,
	}));

	return (
		<TableContainer component={Paper}>
			<Table aria-label="score reference table" size="small">
				<TableHead>
					<TableRow>
						<TableCell>Dice Value</TableCell>
						<TableCell align="right">2 Matching</TableCell>
						<TableCell align="right">3 Matching</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.diceValue}>
							<TableCell component="th" scope="row">
								{row.diceValue}
							</TableCell>
							<TableCell align="right" sx={{ color: match2 }}>
								{row.twoMatching}
							</TableCell>
							<TableCell align="right" sx={{ color: match3 }}>
								{row.threeMatching}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
