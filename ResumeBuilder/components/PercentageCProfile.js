import React,{useEffect} from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,ImageBackground,TextInput,ScrollView,Dimensions,Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg,{G,Circle} from 'react-native-svg';
import Styles from './Styles.js';



export default function PercentageCProfile({percentage}){

    
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;
	const radius = 40;
	const strokewidth = 10;
	const color = '#ff735c';
	const duration = 5000;
	const delay = 0;
	const halfcircle = radius+strokewidth;
	const circumference = 2*Math.PI*radius;
	const Animatedcircle = Animated.createAnimatedComponent(Circle);
	const Animatedtext = Animated.createAnimatedComponent(TextInput);
    const circleRef = React.useRef();
	const inputRef = React.useRef();
    const animatedValue = React.useRef(new Animated.Value(0.01)).current;
	
	const animation = (toValue)=>{
		
		return Animated.timing(animatedValue,{
		
		delay:500,
		toValue,
		duration:1000,
		useNativeDriver:false,
		}).start();

	}
	useEffect(()=>{

		animation(percentage);
		animatedValue.addListener(v=>{
		let offset = circumference - (circumference*(v.value))/100;
		circleRef.current?.setNativeProps({strokeDashoffset:offset});
		inputRef.current?.setNativeProps({text:`${Math.round(v.value)}%`,});
	
		});
		
	},[percentage]);
	
	return(
	        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:'100%'}}>
				<View style={Styles.perccomplete}>
					<Svg width={radius*2} height={radius*2} viewBox={'0 0 100 100'}>
						<G rotation='-90' origin='50, 50'>
							<Circle cx='50%' cy='50%' fill='transparent' stroke={color} r={radius} strokeWidth={strokewidth} strokeOpacity='0.5'   />
							<Animatedcircle ref={circleRef} cx='50%' cy='50%' fill='transparent' stroke={color} r={radius} strokeWidth={strokewidth} strokeOpacity='1'strokeDasharray = {circumference} strokeDashoffset = {circumference} strokeLinecap = 'round' />
					    
						</G>
					
					</Svg>
					<Animatedtext defaultValue="0" ref={inputRef} style={Styles.percent} />
				
				</View>
				<View style={Styles.perccomplete}>
					<Text style={Styles.perccomplete_text}>Profile complete</Text>
				</View>
			</View>

			
	)


};

