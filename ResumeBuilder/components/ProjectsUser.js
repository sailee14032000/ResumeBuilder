import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet, Text,TouchableOpacity,TextInput, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCrosshairs,faAlignLeft} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');

export default function ProjectsUser(){
	const [projects,setProjects] = useState({user_project:[]});
	const [state,setState] = useState({projectname:'',projectdescription:''});
	const [addnewproject,setnewproject] = useState(false);
	

	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_projects FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res['user_projects'])
				{
					var res_json = JSON.parse(res['user_projects']);
					setProjects(
					  { user_project: res_json }
					);
					console.log(len,res);
					
					
				}
				else{
					setnewproject({addnewproject:true});
					
				}
			});
			});
	},[addnewproject]);
	

	
	const saveProjectsData = ()=>{
		
		if (state.projectname=='')
		{
			alert('Please input project name');
			return;
		}
		if(state.projectdescription=='')
		{
			alert('Please input project description');
			return;
		}
		var project = {
						"projectname":state.projectname,
						"projectdescription":state.projectdescription,
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_projects FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_projects']==null)
				{
					
					project = [project];
					var project_text = JSON.stringify(project);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_projects = ? WHERE user_name = ?',
						[project_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewproject(!addnewproject);
							
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_projects']);
					res.push(project);
					var project_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_projects = ? WHERE user_name = ?',
						[project_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewproject(!addnewproject);
							
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
		
		
	}

	var project_list = () => {
		if(projects.user_project)
		{
			return projects.user_project.map((element,index) => {
			  return (
			  <View key={index}  style={Styles.inputlabel}>
					<View style={Styles.labelbox} >
						<Text>{element.projectname}</Text>
					</View>
					<View style={Styles.labelbox} >
					<Text>{element.projectdescription}</Text>
					</View>
			  </View>
			
			  );
			  
			}
			
			);
		}
		return;
	};

	var new_project_add = ()=>
	{	
		if (addnewproject)
		{
		return (
			 <View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faCrosshairs} /><Text style={Styles.label}>Project Name</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,projectname:text})} editable={true} style= {Styles.txtinput}  value={state.projectname} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faAlignLeft} />
						<Text  style={Styles.label}>Project Description</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,projectdescription:text})} editable={true} style= {Styles.txtinput}  value={state.projectdescription} />
				</View>
				<View >
				<TouchableOpacity style = {Styles.getStartedButton} onPress={saveProjectsData}>
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
				{project_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewproject(!addnewproject)}>
							<Text  style = {Styles.headlineButton}>+</Text>
			  </TouchableOpacity>
			</View>
			{new_project_add()}	    
			</View>		
		   
		</View>
	)
	
	}

