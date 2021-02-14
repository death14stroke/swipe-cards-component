import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/components/Deck';

const DATA = [
	{
		id: 1,
		text: 'Card #1',
		uri: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg'
	},
	{
		id: 2,
		text: 'Card #2',
		uri: 'https://images-na.ssl-images-amazon.com/images/I/51qmhXWZBxL.jpg'
	},
	{
		id: 3,
		text: 'Card #3',
		uri:
			'https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg'
	},
	{
		id: 4,
		text: 'Card #4',
		uri: 'https://images-na.ssl-images-amazon.com/images/I/41j7-7yboXL.jpg'
	},
	{
		id: 5,
		text: 'Card #5',
		uri:
			'https://images-na.ssl-images-amazon.com/images/I/717DWgRftmL._SX522_.jpg'
	},
	{
		id: 6,
		text: 'Card #6',
		uri: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg'
	},
	{
		id: 7,
		text: 'Card #7',
		uri: 'https://images-na.ssl-images-amazon.com/images/I/51qmhXWZBxL.jpg'
	},
	{
		id: 8,
		text: 'Card #8',
		uri:
			'https://images-na.ssl-images-amazon.com/images/I/51vlGuX7%2BFL.jpg'
	}
];

export default function App() {
	const renderCard = item => {
		return (
			<Card key={item.id}>
				<Card.Title>{item.text}</Card.Title>
				<Card.Image source={{ uri: item.uri }}></Card.Image>
				<Text style={{ marginBottom: 10, marginTop: 10 }}>
					I can customize the card further.
				</Text>
				<Button
					icon={{ name: 'code', color: 'white' }}
					backgroundColor='#03A9F4'
					title='View Now!'
				/>
			</Card>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card>
				<Card.Title>All done!</Card.Title>
				<Text style={{ marginBottom: 10 }}>
					There's no more content here
				</Text>
				<Button title='Get more!' backgroundColor='#03A9F4' />
			</Card>
		);
	};

	return (
		<View style={styles.container}>
			<Deck
				data={DATA}
				renderCard={renderCard}
				renderNoMoreCards={renderNoMoreCards}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
