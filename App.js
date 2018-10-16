import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import History from './components/History'
import { createTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

function UdaciStatus ({ backgroundColor, ...props }) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

const Tabs = createTabNavigator({
	History: {
		screen: History,
		navigationOptions: {
			tabBarlabel: 'History',
			tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
		}
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarlabel: 'Add Entry',
			tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
		}
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarlabel: 'Live',
			tabBarIcon: ({ tintColor }) => <Ionicons name='speedometer' size={30} color={tintColor} />
		}
	}
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : purple,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
		    headerTintColor: white,
		    headerStyle: {
		    	backgroundColor: purple,
	    	}
		}
	}
})

export default class App extends React.Component {
  componentDidMount () {
  	setLocalNotification()
  }

  render() {
    return (
    	<Provider store={createStore(reducers)}>
    		<View style={{flex: 1}}>
    			<UdaciStatus backgroundColor={purple} barStyle='light-content' />
    			<MainNavigator />
    		</View>
    	</Provider>
    );
  }
}