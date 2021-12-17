import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet,TextInput,ProgressBarAndroid, Text, View,TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faBuilding,faAlignLeft,faBriefcase} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');

	

	
	
	

export default function SkillsUser(){
	const [skills,setSkills] = useState({user_skill:[]});
	const [state,setState] = useState({skillname:'',skilllevel:''});
	const [addnewskill,setnewskill] = useState(false);
	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_skills FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res!=null)
				{
					var res_json = JSON.parse(res['user_skills']);
					setSkills(
					  { user_skill: res_json }
					);
					
					
				}
				else{
					setnewskill({addnewskill:true});
					
				}
			});
			});
	},[addnewskill]);
	
	const saveSkillsData = ()=>{
		
		if (state.skillname=='')
		{
			alert('Please input skill name');
			return;
		}
		if(state.skilllevel=='')
		{
			alert('Please input skill level');
			return;
		}
		var skill = {
						"skillname":state.skillname,
						"skilllevel":state.skilllevel,
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_skills FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_skills']==null)
				{
					
					skill = [skill];
					var skill_text = JSON.stringify(skill);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_skills = ? WHERE user_name = ?',
						[skill_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewskill(!addnewskill);
							setState({skilllevel:''});
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_skills']);
					res.push(skill);
					var skill_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_skills = ? WHERE user_name = ?',
						[skill_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewskill(!addnewskill);
							setState({skilllevel:''});
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
		
		
	}
	var skill_list = () => {
		if(skills.user_skill)
		{
		return skills.user_skill.map((element,index) => {
		  return (
		  <View  key={index}  style={Styles.inputlabel}>
				<View style={Styles.labelbox}>
					<View style={{alignSelf:'flex-start', width:'70%',}}>
						<Text>{element.skillname}</Text>
					</View>
					<View style={{alignSelf:'flex-end',width:'30%'}}>
						<ProgressBarAndroid style={Styles.progressBar} styleAttr='Horizontal' indeterminate={false} progress={element.skilllevel/5}/>
					</View>
				
				</View>
					
		  </View>
			
		  );
		});
		}
		return;
  };
    var new_skill_add = ()=>
	{	
		if (addnewskill)
		{
		return (
			<View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<Text style={Styles.label}>Skill</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,skillname:text})} editable={true} style= {Styles.txtinput} value={state.skill} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<Text style={Styles.label}>Progress</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,skilllevel:text})} editable={true} style= {Styles.txtinput} value={state.skilllevel} />
				</View>
				<TouchableOpacity style = {Styles.getStartedButton} onPress={saveSkillsData}>
						<Text  style = {Styles.headlineButton}>Submit</Text>
				</TouchableOpacity>
			</View>
			
		)
		}
		return;
	}
	return(
		<>
		
		<View style={Styles.formbox}>
			<View style={Styles.form}>
				{skill_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewskill(!addnewskill)}>
							<Text  style = {Styles.headlineButton}>+</Text>
				</TouchableOpacity>
			</View>
			{new_skill_add()}	    
		</View>
		</>
	)
	
}
