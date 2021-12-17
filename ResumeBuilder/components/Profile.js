import React from 'react';
import {StyleSheet,Text,View,Image,FlatList,TouchableOpacity,ImageBackground,ScrollView,Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PercentageCProfile from './PercentageCProfile.js';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUserTie,faGraduationCap,faBriefcase,faMedal,faSkating,faDiceD20,faProjectDiagram} from '@fortawesome/free-solid-svg-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Profile extends React.Component{

	

	render(){
		return(
		<View style = {Styles.profilepage}>

			<View style={Styles.profile_info}>
		
			    <View style = {Styles.profilepage_bg}>
					<ImageBackground imageStyle={{ borderBottomLeftRadius: 12,borderBottomRightRadius:12}} source={require('./Img/bg_profile.jpg')} resizeMode="cover" style={Styles.image}>
					</ImageBackground>	
				</View>
				
				<View style = {Styles.profilepage_pic }>
					<Image source={require('./Img/person.jpg')}  style={Styles.profile_image}>

					</Image>	
				</View>
				<Text  style={Styles.profile_name}>Sailee Salgaonkar</Text>
			</View>
			<View style = {Styles.resume_information}>
			    
				<ImageBackground imageStyle={{borderTopLeftRadius: 12,borderTopRightRadius:12,
		   }} source={require('./Img/bg1.png')} resizeMode="cover" style={Styles.resume_information_bg}>
				<View style = {Styles.percentage_complete_profile}>
					<PercentageCProfile percentage="68"/>
				</View>
				
				<View style={{flexDirection:'row',flexGrow:1,marginBottom:4}}>
				<View style={Styles.resume_information_ajp}>
					<TouchableOpacity style = {Styles.about} onPress={()=>{this.props.navigation.navigate('About');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faUserTie } />
							<Text style={Styles.navtext}>About</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.skills} onPress={()=>{this.props.navigation.navigate('Skills');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faDiceD20 } />
							<Text style={Styles.navtext}>Skills</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.projects}  onPress={()=>{this.props.navigation.navigate('Projects');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faProjectDiagram } />
							<Text style={Styles.navtext}>Projects</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View  style={Styles.resume_information_ajp}>
					<TouchableOpacity style = {Styles.graduation} onPress={()=>{this.props.navigation.navigate('Graduation');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faGraduationCap } />
							<Text style={Styles.navtext}>Graduation</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.jobs} onPress={()=>{this.props.navigation.navigate('Experience');}}>
						<View style = {Styles.resume_information_ajp_button} >
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faBriefcase } />
							<Text style={Styles.navtext}>Job/Internship</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.achievements} onPress={()=>{this.props.navigation.navigate('Achievements');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faMedal } />
							<Text style={Styles.navtext}>Achievements</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = {Styles.extra_curricular} onPress={()=>{this.props.navigation.navigate('Activities');}}>
						<View style = {Styles.resume_information_ajp_button}>
							<FontAwesomeIcon size={24}  style={Styles.icon}  icon={ faSkating } />
							<Text style={Styles.navtext}>Activities</Text>
						</View>
					</TouchableOpacity>
				</View>
				</View>
				</ImageBackground>	
			</View>
			
		</View>
		)
	}
}
