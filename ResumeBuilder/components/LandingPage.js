import React from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Styles from './Styles.js';

const windowWidth  = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class LandingPage extends React.Component{

	
	state = {
	CarouselData : [
	{
	imgURL : require('./Img/5006163.jpg'),
	headLine : 'Create Resume on the go',
	subtitle : 'Add your details and we will create your powerful resume for free',
	},
	{
	imgURL : require('./Img/4806453.jpg'),
	headLine : 'Amazing formatting tools',
	subtitle : 'Formatting tools to create professional resume',
	},
	{
	imgURL : require('./Img/2895011.jpg'),
	headLine : 'Outshine in Resume Screening Round',
	subtitle : 'Get tips and suggestions to modify your resume',
	}
	],
	
	}

	
	render(){
		return(
			<View style = {Styles.page} >
				<View style = {Styles.ul}>
					<FlatList contentContainerStyle = {Styles.flatlist}
					data = { this.state.CarouselData }
					renderItem = {({item}) => {
						return <View   >
									<Image source = { item.imgURL } style = {Styles.carouselimg}></Image>
									<View style ={Styles.itemstyle}>
										<Text style = {Styles.headline} > {item.headLine} </Text>
										<Text style = {Styles.subtitle}  > {item.subtitle} </Text>
									</View>
								</View>
					}}
					horizontal
					keyExtractor={(item, index) => index.toString()}
					pagingEnabled = {true}
					showHorizontalScrollIndicator = {true}
					/>
				</View>
				<View >
					<TouchableOpacity style = {Styles.getStartedButton}>
						<Text  style = {Styles.headlineButton} onPress={()=>{this.props.navigation.navigate('Profile');}}>Get Started</Text>
					</TouchableOpacity>
				</View>

				
         </View>
		)
	}


} 
