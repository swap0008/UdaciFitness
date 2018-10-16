import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import TextButton from './TextButton';

class EntryDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryID } = navigation.state.params;
		const date = entryID.split('-')

		return {
			title: `${date[2]}/${date[1]}/${date[0]}`,
			headerStyle: {height: 20}
		};
	}

	reset = () => {
		const { remove, goBack, entryID } = this.props;

		remove();
		goBack();
		removeEntry(entryID);
	}

	shouldComponentUpdate (nextProps) {
		return nextProps.metrics !== null && !nextProps.metrics.today
	}

	render () {
		const { metrics, entryID } = this.props; 

		return (
			<View style={styles.container}>
				<MetricCard metrics={metrics} />
				<TextButton onPress={this.reset} style={{margin: 20}}>
					Reset
				</TextButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		padding: 15
	}
})

function mapStateToProps (state, { navigation }) {
	const { entryID } = navigation.state.params;

	return {
		entryID,
		metrics: state[entryID]
	};
}

function mapDispatchToProps (dispatch, { navigation }) {
	const { entryID } = navigation.state.params;

	return {
		remove: () => dispatch(addEntry({
			[entryID]: timeToString() === entryID
				? getDailyReminderValue()
				: null
		})),
		goBack: () => navigation.goBack()
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);