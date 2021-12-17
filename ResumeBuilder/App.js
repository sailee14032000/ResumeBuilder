import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AppRegistry, StyleSheet, Text, View } from 'react-native';
import LandingPage from './components/LandingPage.js';
import AboutUser from './components/AboutUser.js';
import Profile from './components/Profile.js';
import {fab} from '@fortawesome/free-brands-svg-icons';
import SkillsUser from './components/SkillsUser.js';
import ProjectsUser from './components/ProjectsUser.js';
import AchievementsUser from './components/AchievementsUser.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import ExperienceUser from './components/ExperienceUser.js';
import GraduationUser from './components/GraduationUser.js';
import ActivitiesUser from './components/ActivitiesUser.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite'
import * as Font from 'expo-font';
import {AppLoading} from "expo";

var db = SQLite.openDatabase('Users');
const stack = createNativeStackNavigator();
library.add(fab);

export default class App extends React.Component{
    
	state = {
		fontLoaded: false
	};

  
    async  loadAssetsAsync(){
		await Font.loadAsync({
		  poppins: require('./assets/fonts/Poppins.ttf'),
		  poppins_Medium: require('./assets/fonts/Poppins-Medium.ttf'),
		  poppins_Light: require('./assets/fonts/Poppins-Light.ttf'),
	  
		});
    this.setState({ fontLoaded: true });
	}
  
	componentDidMount(){

		this.loadAssetsAsync();
		db.transaction(function(txn){
			txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Users_Table'",[],
			function(tx,res){
			if (res.rows.length==0)
			{
				txn.executeSql('DROP TABLE IF EXISTS Users_Table', []);
				txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Users_Table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(30), user_about TEXT,user_skills TEXT,user_activities TEXT,user_graduation TEXT,user_achievements TEXT,user_experience TEXT, user_projects TEXT)',
              []
            );
			}
			
			});
		});
	}
	 render(){
	 if (this.state.fontLoaded) {
	 return(
			
			<NavigationContainer >
				<stack.Navigator initialRouteName= "Home">
					<stack.Screen name = "Home" component = {LandingPage} options = {{headerShown:false}}/>
					<stack.Screen name = "Profile" component = {Profile} options = {{headerShown:false}} />
					<stack.Screen name = "About" component = {AboutUser} options = {{headerShown:false}} />
					<stack.Screen name = "Skills" component = {SkillsUser} options = {{headerShown:false}} />
					<stack.Screen name = "Projects" component = {ProjectsUser} options = {{headerShown:false}} />
					<stack.Screen name = "Achievements" component = {AchievementsUser} options = {{headerShown:false}} />
					<stack.Screen name = "Graduation" component = {GraduationUser} options = {{headerShown:false}} />
					<stack.Screen name = "Activities" component = {ActivitiesUser} options = {{headerShown:false}} />
					<stack.Screen name = "Experience" component = {ExperienceUser} options = {{headerShown:false}} />
					
				</stack.Navigator>
			</NavigationContainer>
		
	 )
	 }
	 else{
		return null;
	 }
	
	}
}

