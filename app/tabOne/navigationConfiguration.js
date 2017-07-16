// 'use strict'
//
// import { StackNavigator } from 'react-navigation'
//
// // Screens
// import TabOneScreenOne from './views/TabOneScreenOne'
// import TabOneScreenTwo from './views/TabOneScreenTwo'
//
// const routeConfiguration = {
//   TabOneScreenOne: { screen: TabOneScreenOne },
//   TabOneScreenTwo: { screen: TabOneScreenTwo },
// }
//
// // going to disable the header for now
// const stackNavigatorConfiguration = {
//   headerMode: 'none',
//   initialRoute: 'TabOneScreenOne'
// }
//
// export const NavigatorTabOne = StackNavigator(routeConfiguration,stackNavigatorConfiguration)


import React, { Component } from 'react';
import { createNavigationContainer, createNavigator, StackRouter } from 'react-navigation';

import TransitionerClass from '../Navigation/TransitionerClass';
import TabOneScreenOne from './views/TabOneScreenOne'
import TabOneScreenTwo from './views/TabOneScreenTwo'

class CustomNavigator extends Component {
	static getNavigator() {
		return NavigatorTabOne;
	}
}

const router = StackRouter({
	TabOneScreenOne: {screen: TabOneScreenOne},
	TabOneScreenTwo: {screen: TabOneScreenTwo},
});

export const NavigatorTabOne = createNavigationContainer(createNavigator(router)(TransitionerClass));