import React, {Component} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

const RADIAN = Math.PI/180;
const chartData = [];
export default class Poll extends Component {
	renderLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		const item = chartData[index];
		return (
			<text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
				{`${item.name} - ${(percent*100).toFixed(0)}%`}
			</text>
		);
	};
	render() {
		const data = this.props.location.state
		const colors = ['#8884d8', 'red'];
			
		Object.keys(data.options).map(key=>chartData.push({name: key, value: data.options[key]}));
		return(
			<div>
				<h2 className='title'>
					{data.title}
				</h2>
				<ResponsiveContainer width='100%' height={400}>
					<PieChart>
						<Pie isAnimationActive={false} data={chartData} outerRadius={180} innerRadius={90} dataKey='value' nameKey='name' labelLine={false} label={this.renderLabel}>
							{
								chartData.map((entry, index) => (
									<Cell key={index} fill={colors[index % colors.length]}/>
									)
								)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<select>
					{Object.keys(data.options).map((key,index)=><option key={index}>{key}</option>)}
				</select>
				<div>
					{Object.keys(data.options).map((key, index) => (<p key={index}>{`${key}: ${data.options[key]}`}</p>))}
				</div>
			</div>
			)
	}
}