import React, {Component} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import { vote, getPollData, deleteMe, addOptionToPoll } from '../utils/api';
import {Link } from 'react-router-dom';

const RADIAN = Math.PI/180;
const colors = ['#8884d8', 'red', 'green', 'orange', 'magenta'];
export default class Poll extends Component {
	constructor() {
		super();
		this.state = {}
	}
	handleClickItem = () => {
		document.getElementById('burger').classList.contains('is-active') ? (console.log('hi'), document.getElementById('burger').classList.toggle('is-active')) : null;
		document.getElementById('navMenu').classList.contains('is-active') ? document.getElementById('navMenu').classList.toggle('is-active') : null;
		//If the burger menu is active, turn it off on click of menu item
		this.state.addingOption === true ? this.setState({addingOption: false}) : null;
	}
	getPoll =(pollId)=> {
		getPollData(pollId).then(res => {
			const poll = res.data.poll;
			const uID = res.data.id;
			const pID = res.data._id;
			//return vote data, then update state
			let chartData = [];
			Object.keys(poll.options).map(item => {
				chartData.push({name: item, value: poll.options[item]});
			})

			this.setState({
				poll,
				chartData,
				uID,
				pID,
				addingOption:false
			});
		});
	}
	componentDidMount() {
		const search = window.location.pathname.split('/')[2];
		this.getPoll(search);
	}
	handleDelete = () => {
		this.handleClickItem();
		deleteMe(this.state.pID, () => {
			window.location.replace(window.location.origin);
			//go to homepage after deletion
		});
	}
	handleNewOption = () => {
		this.setState({
			addingOption: true
		})
	}
	handleNewOptionSubmit = () => {
		const option = document.getElementById('ahoy').value;
		addOptionToPoll(this.state.pID, option);
	}
	handleClick = () => {
		this.handleClickItem();
		const select = document.getElementById('voteSelect');
		const name = select.value;
		let chartData = this.state.chartData;
		if (Object.keys(chartData).indexOf(name) !== -1) return;
		const search = window.location.pathname.split('/')[2];
		chartData.map(item => {
			console.log(item);
			item.name === name ? (
				item.value += 1,
				//increase vote count in state
				vote(`${search}/${name}`)
				//increase vote count in database
				)
			 : null
		});
		this.setState({
			chartData
		});
	}
	render() {
		const data = this.state.poll;
		const url = window.location;
		const tweet = `Check out my poll!`;
		return(
			<div>
			{data ?
				<h2 className='title'>
					{data.title}
				</h2> : null
			}
					{ this.state.chartData ? <Chart chartData={this.state.chartData}/> : null}
				{data ? 
				<div className='select'>
					<select id='voteSelect' onClick={this.handleClickItem}>
						{Object.keys(data.options).map((key,index)=><option key={index} onClick={this.handleClickItem}>{key}</option>)}
						{JSON.parse(localStorage['authData']).user.id ? <option></option> : null}
						{JSON.parse(localStorage['authData']).user.id ? <option onClick={this.handleNewOption}>test</option> : null}
					</select>
				</div> : null }
				{data ?
				<button className='button' onClick={this.handleClick}>
					Vote
				</button> : null }
				{this.state.addingOption === true ? 
					<div className='field column is-6 is-offset-3'>
						<label className='label'>New Option</label>
						<div className='control'>
							<input className='input' type='text' id='ahoy' />
						</div>
						<button className='button is-link is-info' onClick={this.handleNewOptionSubmit}>Submit</button>
					</div>
					: null}
				{this.state.chartData ? <div>
					{
					this.state.chartData.map(
						(item, index) => (<p key={index}>{`${item.name}: ${item.value}`}</p>))}
				</div> : null }
				{data ? 
				<a href={`https://twitter.com/intent/tweet?url=${encodeURI(url)}&text=${encodeURI(tweet)}`} onClick={this.handleClickItem} className='is-primary button'>
					<i className='fa fa-fw fa-twitter'></i>Share!
				</a> : null}
				{this.state.uID === JSON.parse(localStorage['authData']).user.id ? 
					<a className='button is-danger' onClick={this.handleDelete}>
						Delete
					</a> : null }
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
		//---------------------------------------
		//Ensure label text size never goes lower than min
		const min = 15;
		const pSize = (percent*40).toFixed(0);
		//console.log(percent)
		const fSize = (pSize > min) ? pSize : min;

		return (
			percent > 0 ? (<text x={x} y={y} fill='black' fontSize={fSize} textAnchor='middle'>
				{`${item.name} - ${(percent*100).toFixed(0)}%`}
			</text>) : (<div></div>)
		);
	}
	render() {
		let chartData = [];

		this.props.chartData.map(entry => entry.value).reduce((acc, val) => acc+val) === 0 ? (
			this.props.chartData.map(entry => { chartData.push({name: entry.name, value: entry.value + 1}) })
			//recharts doesn't display pie charts if all values are 0, because of its inability to compute the percentage
			//this sets all values equal to 1 only when all actual values equal 0, so that the pie chart will always display and with appropriate percentages
			) : '';
		return(
		<ResponsiveContainer  width='100%' height={400} id='mobilePi'>
			<PieChart>
					<Pie isAnimationActive={false} data={chartData.length > 0 ? chartData.slice() : this.props.chartData.slice()} outerRadius='100%' innerRadius='60%' dataKey='value' nameKey='name' labelLine={false} label={this.renderLabel}>
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