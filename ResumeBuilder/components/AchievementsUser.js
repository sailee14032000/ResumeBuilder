import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet, Text,TouchableOpacity,TextInput, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faTrophy,faAlignLeft} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');




export default function AchievementsUser(){
	
	const [achievements,setAchievements] = useState({user_achievement:[]});
	const [state,setState] = useState({achievementname:'',achievementdescription:''});
	const [addnewachievement,setnewachievement] = useState(false);
	

	
	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_achievements FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res['user_achievements'])
				{
					var res_json = JSON.parse(res['user_achievements']);
					setAchievements(
					  { user_achievement: res_json }
					);
					console.log(len,res);
					
					
				}
				else{
					setnewachievement({addnewachievement:true});
					
				}
			});
			});
	},[addnewachievement]);
	

	
	const saveAchievementsData = ()=>{
		
		if (state.achievementname=='')
		{
			alert('Please input achievement name');
			return;
		}
		if(state.achievementdescription=='')
		{
			alert('Please input achievement description');
			return;
		}
		
		var achievement = {
						"achievementname":state.achievementname,
						"achievementdescription":state.achievementdescription,
						
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_achievements FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_achievements']==null)
				{
					
					achievement = [achievement];
					var achievement_text = JSON.stringify(achievement);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_achievements = ? WHERE user_name = ?',
						[achievement_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewachievement(!addnewachievement);
							
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_achievements']);
					res.push(achievement);
					var achievement_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_achievements = ? WHERE user_name = ?',
						[achievement_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewachievement(!addnewachievement);
							
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
		
		
	}

	
	var achievement_list = () => {
		if(achievements.user_achievement)
		{
			return achievements.user_achievement.map((element,index) => {
			  return (
			  <View key={index}  style={Styles.inputlabel}>
					<View style={Styles.labelbox} >
						<Text>{element.achievementname}</Text>
					</View>
					<View style={Styles.labelbox} >
					<Text>{element.achievementdescription}</Text>
					</View>
			  </View>
			
			  );
			  
			}
			
			);
		}
		return;
	};

	
	var new_achievement_add = ()=>
	{	
		if (addnewachievement)
		{

		return(
					
		    <View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faTrophy} /><Text style={Styles.label}>Title</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,achievementname:text})} editable={true} style= {Styles.txtinput}  value={state.achievement} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faAlignLeft} />
						<Text style={Styles.label}>Description</Text>
					</View>
					<TextInput  onChangeText={(text)=>setState({...state,achievementdescription:text})} editable={true} style= {Styles.txtinput}  value={state.achievementDescription} />
				</View>
				<View >
				<TouchableOpacity style = {Styles.getStartedButton} onPress={saveAchievementsData}>
						<Text  style = {Styles.headlineButton}>Submit</Text>
				</TouchableOpacity>
			</View>
			</View>
		
			
		)
		}
		return;
	}
	
	return(
		<View style={Styles.formbox}>
			<View style={Styles.formbox}>
			<View style={Styles.form}>
				{achievement_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewachievement(!addnewachievement)}>
							<Text  style = {Styles.headlineButton}>+</Text>
				</TouchableOpacity>
			</View>
			{new_achievement_add()}	    
			</View>		
		</View>
		
	)
	
}

