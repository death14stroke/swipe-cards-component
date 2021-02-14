import React, { useState, useRef, useMemo } from 'react';
import {
	View,
	Animated,
	PanResponder,
	Dimensions,
	StyleSheet,
	LayoutAnimation,
	UIManager
} from 'react-native';
import {
	useComponentWillUpdate,
	useComponentWillReceiveProps
} from '../hooks/LifecycleHooks';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
	data,
	renderCard,
	renderNoMoreCards,
	onSwipeLeft,
	onSwipeRight
}) => {
	useComponentWillUpdate(() => {
		UIManager.setLayoutAnimationEnabledExperimental &&
			UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	});

	const [index, setIndex] = useState(0);

	useComponentWillReceiveProps(() => {
		setIndex(0);
	}, [data]);

	const position = useRef(new Animated.ValueXY());
	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => true,
				onPanResponderMove: (event, gesture) => {
					position.current.setValue({ x: gesture.dx, y: gesture.dy });
				},
				onPanResponderRelease: (event, gesture) => {
					if (gesture.dx > SWIPE_THRESHOLD) {
						forceSwipe('right');
					} else if (gesture.dx < -SWIPE_THRESHOLD) {
						forceSwipe('left');
					} else {
						resetPosition();
					}
				}
			}),
		[index]
	);

	const forceSwipe = direction => {
		const x = direction == 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

		Animated.timing(position.current, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_DURATION,
			useNativeDriver: false
		}).start(() => onSwipeComplete(direction));
	};

	const onSwipeComplete = direction => {
		const item = data[index];

		direction == 'right' ? onSwipeRight(item) : onSwipeLeft(item);

		setIndex(index + 1);
		position.current.setValue({ x: 0, y: 0 });
	};

	const resetPosition = () => {
		Animated.spring(position.current, {
			toValue: { x: 0, y: 0 },
			useNativeDriver: false
		}).start();
	};

	const getCardStyle = () => {
		const pos = position.current;
		const rotate = pos.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ['-120deg', '0deg', '120deg']
		});

		return {
			...pos.getLayout(),
			transform: [{ rotate }]
		};
	};

	const getDummyCardStyle = () => {
		return {
			transform: [{ rotate: '0deg' }]
		};
	};

	const renderCards = () => {
		if (index == data.length) return renderNoMoreCards();

		return data
			.map((item, i) => {
				if (i < index) return null;

				if (i === index) {
					return (
						<Animated.View
							key={item.id}
							style={[getCardStyle(), styles.cardStyle]}
							{...panResponder.panHandlers}>
							{renderCard(item)}
						</Animated.View>
					);
				}

				return (
					<Animated.View
						key={item.id}
						style={[
							getDummyCardStyle(),
							styles.cardStyle,
							{
								top: 10 * (i - index)
							}
						]}>
						{renderCard(item)}
					</Animated.View>
				);
			})
			.reverse();
	};

	return <View>{renderCards()}</View>;
};

Deck.defaultProps = {
	onSwipeRight: () => {},
	onSwipeLeft: () => {}
};

const styles = StyleSheet.create({
	cardStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH
	}
});

export default Deck;
