import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

export default function UdaciSlider({value, onChange, max, step, unit}) {
	return (
		<View style={[styles.row, {justifyContent: 'space-between'}]}>
			<Slider
				style={{flex: 1}}
				minimumValue={0}
				maximumValue={max}
				step={step}
				value={value}
				onValueChange={(value) => onChange(value)}
			/>
			<View style={styles.metricCounter}>
				<Text style={{textAlign: 'center', fontSize: 25}}>{value}</Text>
				<Text style={{color: 'gray', fontSize: 18}}>{unit}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center'
	}
});