import { useState } from "react";
import {
	Button,
	Container,
	Box,
	Typography,
	Grid2 as Grid,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GridCalculator from "./Calculator";

export default function KnucklebonesScoreKeeping() {
	const [showOpponent, setShowOpponent] = useState(false);

	const addOpponentGrid = () => {
		setShowOpponent(true);
	};
	const removeOpponentGrid = () => {
		setShowOpponent(false);
	};

	return (
		<Container maxWidth="lg">
			<Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
				Knucklebones Game
			</Typography>
			<Grid container spacing={4}>
				<Grid xs={12} md={6}>
					<Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
						<Typography variant="h5" sx={{ mb: 2 }}>
							Your Grid
						</Typography>
						<GridCalculator />
					</Box>
				</Grid>
				{!showOpponent && (
					<Grid
						xs={12}
						md={6}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Button
							variant="contained"
							startIcon={<PersonAddIcon />}
							onClick={addOpponentGrid}
							size="large"
						>
							Add Opponent Grid
						</Button>
					</Grid>
				)}
				{showOpponent && (
					<>
						<Button
							variant="contained"
							startIcon={<PersonRemoveIcon />}
							onClick={removeOpponentGrid}
							size="large"
						>
							Remove Opponent Grid
						</Button>
						<Grid xs={12} md={6}>
							<Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
								<Typography variant="h5">Opponent Grid</Typography>
								<GridCalculator />
							</Box>
						</Grid>
					</>
				)}
			</Grid>
		</Container>
	);
}
