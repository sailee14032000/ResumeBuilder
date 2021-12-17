import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet,TextInput, Text, View,TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');

export default function ActivitiesUser(){
	const [activities,setActivities] = useState({user_activity:[]});
	const [state,setState] = useState({activityname:''});
	const [addnewactivity,setnewactivity] = useState(false);
	

	
	
	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_activities FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res['user_activities'])
				{
					var res_json = JSON.parse(res['user_activities']);
					setActivities(
					  { user_activity: res_json }
					);
					console.log(len,res);
					
					
				}
				else{
					setnewactivity({addnewactivity:true});
					
				}
			});
			});
	},[addnewactivity]);
	

	
	const saveActivitiesData = ()=>{
		
		if (state.activityname=='')
		{
			alert('Please input activity name');
			return;
		}
		
		var activity = {
						"activityname":state.activityname,
						
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_activities FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_activities']==null)
				{
					
					activity = [activity];
					var activity_text = JSON.stringify(activity);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_activities = ? WHERE user_name = ?',
						[activity_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewactivity(!addnewactivity);
							
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_activities']);
					res.push(activity);
					var activity_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_activities = ? WHERE user_name = ?',
						[activity_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewactivity(!addnewactivity);
							
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
		
		
	}

	
	var activity_list = () => {
		if(activities.user_activity)
		{
			return activities.user_activity.map((element,index) => {
			  return (
			  <View key={index}  style={Styles.inputlabel}>
					<View style={Styles.labelbox} >
						<Text>{element.activityname}</Text>
					</View>
			  </View>
			
			  );
			  
			}
			
			);
		}
		return;
	};

	
	var new_activity_add = ()=>
	{	
		if (addnewactivity)
		{

		return(
							
		    <View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<Text style={Styles.label}>Activity</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,activityname:text})}  editable={true} style= {Styles.txtinput}  value={state.activityname}/>

				</View>
				<TouchableOpacity style = {Styles.getStartedButton}  onPress={saveActivitiesData}>
						<Text  style = {Styles.headlineButton}>Submit</Text>
				</TouchableOpacity>
			</View>	
		
			
		)
		}
		return;
	}
	
	
	return(
	
		<View style={Styles.formbox}>
			<View style={Styles.formbox}>
			<View style={Styles.form}>
				{activity_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewactivity(!addnewactivity)}>
							<Text  style = {Styles.headlineButton}>+</Text>
				</TouchableOpacity>
			</View>
			{new_activity_add()}	    
			</View>		
		</View>
	)
	

}