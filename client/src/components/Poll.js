import React, {Component} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import { vote } from '../utils/api';

const RADIAN = Math.PI/180;
const colors = ['#8884d8', 'red', 'green'];
export default class Poll extends Component {
	constructor(props) {
		super(props);
		const data = this.props.location.state;
		const chartData = [];
		Object.keys(data.options).map(key=>chartData.push({name: key, value: data.options[key], id: data.id}));
		this.state = {
			chartData,
			data
		}
	}
	handleClick = () => {
		const select = document.getElementById('voteSelect');
		const name = select.value;
		let chartData = this.state.chartData;
		chartData.map(item => {
			item.name === name ? (
				item.value += 1,
				vote(`${item.id}/${name}`)
				)
			 : null
		});
		this.setState({
			chartData
		});
	}
	render() {
		const data = this.state.data;
		return(
			<div>
				<h2 className='title'>
					{data.title}
				</h2>
					<Chart chartData={this.state.chartData}/>
				<div className='select'>
					<select id='voteSelect'>
						{Object.keys(data.options).map((key,index)=><option key={index}>{key}</option>)}
					</select>
				</div>
				<button className='button' onClick={this.handleClick}>
					Vote
				</button>
				<div>
					{
					this.state.chartData.map(
						(item, index) => (<p key={index}>{`${item.name}: ${item.value}`}</p>))}
				</div>
			</div>
			)
	}
}

class Chart extends Component {
	renderLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		const item = this.props.chartData[index];
		const min = 15;
		const pSize = (percent*40).toFixed(0);
		const fSize = pSize > min ? pSize : min; 
		return (
			<text x={x} y={y} fill='black' fontSize={fSize} textAnchor='middle'>
				{`${item.name} - ${(percent*100).toFixed(0)}%`}
			</text>
		);
	}
	render() {
		let chartData = [];

		this.props.chartData.map(entry => entry.value).reduce((acc, val) => acc+val) === 0 ? (
			this.props.chartData.map(entry => { chartData.push({name: entry.name, value: entry.value + 1}) })
			) : '';
		return(
		<ResponsiveContainer width='100%' height={400} id='mobilePi'>
			<PieChart>
					<Pie isAnimationActive={false} data={chartData.length > 0 ? chartData.slice() : this.props.chartData.slice()} outerRadius={180} innerRadius={90} dataKey='value' nameKey='name' labelLine={false} label={this.renderLabel}>
						{
							this.props.chartData.map((entry, index) => (
								<Cell key={index} fill={colors[index % colors.length]}/>
								)
							)
						}
					</Pie>
				</PieChart>
		</ResponsiveContainer>
			)
	}
}