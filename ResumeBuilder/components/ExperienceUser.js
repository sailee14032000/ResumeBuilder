import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet,TextInput, Text, View,TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faBuilding,faAlignLeft,faBriefcase} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');



export default function ExperienceUser(){
	const [experiences,setExperiences] = useState({user_experience:[]});
	const [state,setState] = useState({postname:'',jobdescription:'',startdate:'',enddate:'',companyname:''});
	const [addnewexperience,setnewexperience] = useState(false);
	

	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_experience FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res['user_experience'])
				{
					var res_json = JSON.parse(res['user_experience']);
					setExperiences(
					  { user_experience: res_json }
					);
					console.log(len,res);
					
					
				}
				else{
					setnewexperience({addnewexperience:true});
					
				}
			});
			});
	},[addnewexperience]);
	

	
	const saveExperiencesData = ()=>{
		
		if (state.postname=='')
		{
			alert('Please input post name');
			return;
		}
		if(state.jobdescription=='')
		{
			alert('Please input job description');
			return;
		}
		if(state.companyname=='')
		{
			alert('Please input company name');
			return;
		}
		var experience = {
						"postname":state.postname,
						"jobdescription":state.jobdescription,
						"companyname":state.companyname,
						"startdate":state.startdate,
						"enddate":state.enddate,
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_experience FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_experience']==null)
				{
					
					experience = [experience];
					var experience_text = JSON.stringify(experience);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_experience = ? WHERE user_name = ?',
						[experience_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewexperience(!addnewexperience);
							
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_experience']);
					res.push(experience);
					var experience_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_experience = ? WHERE user_name = ?',
						[experience_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewexperience(!addnewexperience);
							
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
		
		
	}

	
	var experience_list = () => {
		if(experiences.user_experience)
		{
			return experiences.user_experience.map((element,index) => {
			  return (
			  <View key={index}  style={Styles.inputlabel}>
					<View style={Styles.labelbox} >
						<Text>{element.postname}</Text>
						<Text>{element.companyname}</Text>
					</View>
					<View style={Styles.labelbox} >
					<Text>{element.jobdescription}</Text>
					</View>
			  </View>
			
			  );
			  
			}
			
			);
		}
		return;
	};

	
	
	var new_experience_add = ()=>
	{	
		if (addnewexperience)
		{
		return (
			<View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faBriefcase} />
						<Text style={Styles.label}>Role</Text>
					</View>
					
					<TextInput onChangeText={(text)=>setState({...state,postname:text})} editable={true} style= {Styles.txtinput}  value={state.postname} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faBuilding} />
						<Text style={Styles.label}>Company</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,companyname:text})} editable={true} style= {Styles.txtinput}  value={state.companyname} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faAlignLeft} />
						<Text style={Styles.label}>Job Description</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,jobdescription:text})} editable={true} style= {Styles.txtinput}  value={state.jobdescription} />
				</View>
				<View >
				<TouchableOpacity style = {Styles.getStartedButton}  onPress={saveExperiencesData}>
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
				{experience_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewexperience(!addnewexperience)}>
							<Text  style = {Styles.headlineButton}>+</Text>
			  </TouchableOpacity>
			</View>
			{new_experience_add()}	    
			</View>		
		    
		</View>
	
		
	)
	

}
