import { Button, Collapse } from "@mui/material";
import "./App.css";
import Calculator from "./Calculator";
import ScoreTable from "./ScoreTable";
import { useState } from "react";

function App() {
	const [tableVisible, setTableVisible] = useState(false);
	return (
		<div className="app-wrapper">
			<h2>Knucklebones Score calculator</h2>
			<Button
				variant="outlined"
				size="small"
				color="secondary"
				onClick={() => setTableVisible(!tableVisible)}
			>
				Show Table
			</Button>
			<div>
				<Collapse in={tableVisible}>
					<ScoreTable />
				</Collapse>
			</div>
			<Calculator />
		</div>
	);
}

export default App;
