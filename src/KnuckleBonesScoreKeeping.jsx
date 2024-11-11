import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GridCalculator from "./Calculator";

export default function KnucklebonesScoreKeeping() {
	const [showOpponent, setShowOpponent] = useState(false);

	const toggleOpponentGrid = () => {
		setShowOpponent(!showOpponent);
	};

	return (
		<>
			<Button
				variant="contained"
				startIcon={showOpponent ? <PersonRemoveIcon /> : <PersonAddIcon />}
				onClick={toggleOpponentGrid}
				size="medium"
				className="opponent__button"
			>
				{showOpponent ? "Remove Opponent Grid" : "Add Opponent Grid"}
			</Button>
			<div className="kb-scorekeeping__wrapper">
				<div className="player__wrapper">
					<Box className="grid__wrapper">
						<Typography variant="h6" className="grid__title" align="right">
							Your Grid
						</Typography>
						<GridCalculator />
					</Box>
				</div>

				<div className="opponent__wrapper">
					{showOpponent && (
						<Box className="grid__wrapper">
							<Typography variant="h6" className="grid__title" align="right">
								Opponent Grid
							</Typography>
							<GridCalculator />
						</Box>
					)}
				</div>
			</div>
		</>
	);
}
