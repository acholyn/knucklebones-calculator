import { Button, Collapse } from "@mui/material";
import "./App.css";
import ScoreTable from "./ScoreTable";
import { useState } from "react";
import KnucklebonesScoreKeeping from "./KnuckleBonesScoreKeeping";

export const match2 = "#ffe500";
export const match3 = "#90EE90";

function App() {
	const [tableVisible, setTableVisible] = useState(false);
	return (
		<div className="app-wrapper">
			<Button
				variant="outlined"
				size="small"
				color="info"
				onClick={() => setTableVisible(!tableVisible)}
			>
				{tableVisible ? "Hide Table" : "Show Scoring Table"}
			</Button>
			<div>
				<Collapse in={tableVisible}>
					<ScoreTable />
				</Collapse>
			</div>
			<KnucklebonesScoreKeeping />
		</div>
	);
}

export default App;
