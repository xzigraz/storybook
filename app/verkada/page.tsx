'use client';

import React from "react";
import { MainLayout } from "@/ui-component/Layout/mainLayout";
import { SectionLayout } from "@/ui-component/Layout/sectionLayout";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./_verkada.page.scss";
import _ from "lodash";

const Data = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 2, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 2, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 2, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 0, 2, 0, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const Data2 = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 2, 0, 0, 0, 0, 0, 1, 1,
	1, 1, 0, 1, 1, 1, 1, 2, 1, 1,
	1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
	1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
	1, 1, 2, 1, 1, 1, 1, 0, 1, 1,
	1, 1, 0, 0, 2, 0, 0, 0, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const Data3 = [
	{
		id: 1,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 2,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 3,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 4,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 5,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 6,
		type: 2,
		name: "camera",
		label: "2"
	},
	{
		id: 7,
		type: 0,
		name: "empty",
		label: "0"
	},
	{
		id: 8,
		type: 1,
		name: "wall",
		label: "1"
	},
	{
		id: 9,
		type: 1,
		name: "wall",
		label: "1"
	}
]

const VerkadaPage = () => {
	const [floorTiles, setFloorTiles] = React.useState(Data);
	const [floorTiles2, setFloorTiles2] = React.useState(Data2);
	const [floorTiles3, setFloorTiles3] = React.useState(Data3);

	const handleCellClick = (rowIndex, cellIndex, cellValue) => {
		if (cellValue === 1) {
			return;
		}

		let clonedFloorTiles = _.cloneDeep(floorTiles);

		// My Code
		// clonedFloorTiles.forEach((row, rowInx) => {
		// 	if (rowInx === rowIndex) {
		// 		row.forEach((cell, cellInx) => {
		// 			if (cellInx === cellIndex) {
		// 				cell = cellValue === 2 ? 1 : 2; 
		// 			}
		// 		})
		// 	}
		// })

		// Bon pointed me to this.
		clonedFloorTiles[rowIndex][cellIndex] = cellValue === 2 ? 0 : 2; 

		setFloorTiles(clonedFloorTiles);
	}

	const handleCellClick2 = (cellIndex, cellValue) => {
		if (cellValue === 1) {
			return;
		}

		let clonedFloorTiles = _.cloneDeep(floorTiles2);

		clonedFloorTiles[cellIndex] = cellValue === 2 ? 0 : 2; 

		setFloorTiles2(clonedFloorTiles);
	}

	const handleCellClick3 = (cellIndex, cell) => {
		if (cell.type === 1) {
			return;
		}

		let clonedFloorTiles = _.cloneDeep(floorTiles3);

		clonedFloorTiles.forEach((tile, index) => {
			if (index === cellIndex) {
				tile.type = cell.type === 2 ? 0 : 2;
				tile.name = cell.type === 2 ? "empty": "camera";
				tile.label = cell.type === 2 ? "0" : "2";
			}
		})

		setFloorTiles3(clonedFloorTiles);
	}

	return <MainLayout className="verkada-page peach-white">
		<>
			<SectionLayout>
				<>
					<h1>Verkada Coding Interview Retrospective</h1>
					<h2>The ask</h2>
					<p>The mock shows a 10 x 10 grid, the cells in the grid will have a number 1, 2, or 0. 1 means it is a wall, when clicked, nothing happens. Click on 2 will change the tile to 0 which means a camera is removed. Click on 0 will change the tile to 2, meaing there's a camera placed in this tile.</p>
					<p>The data given was something like this.</p>
					<SyntaxHighlighter language="javascript" style={dracula} wrapLongLines showLineNumbers >
{`
	const Data = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 2, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 2, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 2, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 0, 2, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]
`}
					</SyntaxHighlighter>
					<p>I wrote my code to something like this.</p>
					<SyntaxHighlighter language="react" style={dracula} wrapLongLines showLineNumbers >
{`
	const App = () => {
		const [floorTile, setFloorTile] = useState(Data);
		const handleCellClick = (rowIndex, cellIndex, cellValue) => {
			if (cellValue === 1) {
				return;
			}

			let clonedFloorTiles = _.cloneDeep(floorTiles);

			// My Code
			// clonedFloorTiles.forEach((row, rowInx) => {
			// 	if (rowInx === rowIndex) {
			// 		row.forEach((cell, cellInx) => {
			// 			if (cellInx === cellIndex) {
			// 				cell = cellValue === 2 ? 1 : 2; 
			// 			}
			// 		})
			// 	}
			// })

			// Bon pointed me to this.
			clonedFloorTiles[rowIndex][cellIndex] = cellValue === 2 ? 0 : 2; 

			setFloorTiles(clonedFloorTiles);
		}
		return <div className="floor-layout">
			{floorTiles.map((row, rowIndex) => <React.Fragment key={'\${rowIndex}-\${Math.random()}'}>
				{row.map((cell, cellIndex) => <div key={'\${cellIndex}-\${Math.random()}'} onClick={() => handleCellClick(rowIndex, cellIndex, cell)}>{cell}</div>)}
			</React.Fragment>)}
		</div>
	}
`}
					</SyntaxHighlighter>
					<p>Which renders to something like this. I made the rookie mistake on line 16 of trying to reassign the value in the array. It is not a reference but a copy of the value. And at this point, I am already off balance and I wasn't able to correct my course.</p>
					<div className="floor-layout">
						{floorTiles.map((row, rowIndex) => <React.Fragment key={`${rowIndex}-${Math.random()}`}>
							{row.map((cell, cellIndex) => <div key={`${cellIndex}-${Math.random()}`} onClick={() => handleCellClick(rowIndex, cellIndex, cell)}>{cell}</div>)}
						</React.Fragment>)}
					</div>
					<p>However, in my defense, this data isn't something you will see in real world use case. First of all, we don't need to define array of an arraies to create this grid. It can be a flat list and it'll do the same thing. Like what I did below, so instead of looping twice, you just need to do it once.</p>
					<p>And in the real world, you will have an array of objects that has additional information in it. Like the Data2 below. And in that case, my forEach loop in the earlier code will work because then it is a reference and I can assign the value to the correct field.</p>
					<SyntaxHighlighter language="react" style={dracula} wrapLongLines showLineNumbers >
{`
	const Data = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 2, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 1, 1, 1, 1, 2, 1, 1,
		1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
		1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
		1, 1, 2, 1, 1, 1, 1, 0, 1, 1,
		1, 1, 0, 0, 2, 0, 0, 0, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1
	];

	const Data2 = [
		{
			id: 1,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 2,
			type: 2,
			name: "camera",
			label: "2"
		},
		{
			id: 3,
			type: 0,
			name: "empty",
			label: "0"
		}
		...
	]

	const App = () => {
		const [floorTile, setFloorTile] = useState(Data);
		const handleCellClick = (cellIndex, cellValue) => {
			if (cellValue === 1) {
				return;
			}

			let clonedFloorTiles = _.cloneDeep(floorTiles);

			clonedFloorTiles[cellIndex] = cellValue === 2 ? 0 : 2; 

			setFloorTiles(clonedFloorTiles);
		}
		return <div className="floor-layout">
			{floorTiles.map((cell, cellIndex) => 
				<div key={'\${cellIndex}-\${Math.random()}'} onClick={() => handleCellClick(cellIndex, cell)}>{cell}</div>
			)}
		</div>
	}
`}
					</SyntaxHighlighter>
					<div className="floor-layout">
						{floorTiles2.map((cell, cellIndex) => 
							<div key={`${cellIndex}-${Math.random()}`} onClick={() => handleCellClick2(cellIndex, cell)}>{cell}</div>)}
					</div>
					<p>The final UI will look like this. I am reducing the grid size, but the idea is the same. And the next part of the ask is to add a dropdown, and based on the dropdown, it's possible to place other devices on the 0 tile. I think I did okay there, but we just didn't have enough time to finish it.</p>
					<SyntaxHighlighter language="react" style={dracula} wrapLongLines showLineNumbers>
					{`
	const Data = [
		{
			id: 1,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 2,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 3,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 4,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 5,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 6,
			type: 2,
			name: "camera",
			label: "2"
		},
		{
			id: 7,
			type: 0,
			name: "empty",
			label: "0"
		},
		{
			id: 8,
			type: 1,
			name: "wall",
			label: "1"
		},
		{
			id: 9,
			type: 1,
			name: "wall",
			label: "1"
		}
	];

	const App = () => {
		const [floorTile, setFloorTile] = useState(Data);
		const handleCellClick = (cellIndex, cellValue) => {
			if (cell.type === 1) {
				return;
			}

			let clonedFloorTiles = _.cloneDeep(floorTiles3);
			
			// This would've worked, however, this is still not ideal, since we already know
			// the index of the tile we click on, so we can do something like
			//
			// clonedFloorTiles[cellIndex].type = cell.type === 2 ? 0 : 2;
			// clonedFloorTiles[cellIndex].name = cell.type === 2 ? "empty": "camera";
			// clonedFloorTiles[cellIndex].label = cell.type === 2 ? "0" : "2";

			clonedFloorTiles.forEach((tile, index) => {
				if (index === cellIndex) {
					tile.type = cell.type === 2 ? 0 : 2;
					tile.name = cell.type === 2 ? "empty": "camera";
					tile.label = cell.type === 2 ? "0" : "2";
				}
			})

			setFloorTiles(clonedFloorTiles);
		}
		return <div className="floor-layout">
			{floorTiles3.map((cell, cellIndex) => 
				<div
					className={cell.type === 1 ? "wall" : cell.type === 2 ? "camera" : ""} 
					key={'\${cell.id}-\${cell.name}'} 
					onClick={() => handleCellClick3(cellIndex, cell)}>{cell.label}</div>
			)}
		</div>
	}
`}						
					</SyntaxHighlighter>
					<div className="floor-layout-9">
						{floorTiles3.map((cell, cellIndex) => 
							<div
								className={cell.type === 1 ? "wall" : cell.type === 2 ? "camera" : ""} 
								key={`${cell.id}-${cell.name}`} 
								onClick={() => handleCellClick3(cellIndex, cell)}>{cell.label}</div>
						)}
					</div>
				</>
			</SectionLayout>
		</>
	</MainLayout>
}

export default VerkadaPage;