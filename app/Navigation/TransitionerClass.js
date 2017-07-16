import React, { Component } from 'react';
import { Animated, View, StyleSheet, Easing, Platform, Dimensions } from 'react-native';
import { Transitioner } from 'react-navigation';

const { height, width } = Dimensions.get('window');

class TransitionerClass extends Component {

	constructor(props) {
		super(props);

		this._configureTransition = this._configureTransition.bind(this);
		this._renderScene = this._renderScene.bind(this);
		this._render = this._render.bind(this);
	}

	_configureTransition(transitionProps, prevTransitionProps) {
		const { state } = this.props.navigation;
		const { index } = state;

		if (index === 0) {
			return {
				timing: Animated.timing,
				duration: 800,
				easing: Easing.in(Easing.bounce),
			};
		} else {
			return {
				timing: Animated.timing,
				duration: 800,
				easing: Easing.inOut(Easing.ease),
			};
		}
	}

	_renderScene(transitionProps, scene) {
		const { state } = this.props.navigation;
		const { position } = transitionProps;
		const { index, routes } = state;

		const opacity = position.interpolate({
			inputRange: [index - 1, index, index + 0.999, index + 1],
			outputRange: [0, 1, 0.3, 0],
		});

		const rotate = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: ['45deg', '0deg', '0deg']
		});

		const translateXForward = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [100, 0, 0],
		});

		const translateXBackward = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [0, 0, 100],
		});

		const scaleX = position.interpolate({
			inputRange: [index - 1, index, index + 1],
			outputRange: [0, 0, height],
		});

		const Scene = this.props.router.getComponentForState(state);

		if (index === 0) {
			return (<Animated.View key={scene.key} style={[styles.sceneStyle, { opacity, transform: [{ translateX: translateXBackward }] }]}>
					{<Scene navigation={this.props.navigation} />}
				</Animated.View>
			);
		} else {
			return (<Animated.View key={scene.key} style={[styles.sceneStyle, { opacity, transform: [{ translateX: translateXForward }] }]}>
					{<Scene navigation={this.props.navigation} />}
				</Animated.View>
			);
		}
	}

	_render(transitionProps, prevTransitionProps) {
		const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene));

		return (
			<View style={styles.wrapperStyle}>
				{scenes}
			</View>
		);
	}

	render() {
		return (
			<Transitioner
				configureTransition={this._configureTransition}
				navigation={this.props.navigation}
				render={this._render}
				onTransitionStart={this.onTransitionStart}
				onTransitionEnd={this.onTransitionEnd}
			/>
		);
	}
}

const styles = StyleSheet.create({
	sceneStyle: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0
	},
	wrapperStyle: {
		flex: 1,
		position: 'relative'
	}
});

export default TransitionerClass;