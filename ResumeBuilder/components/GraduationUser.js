import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {AppRegistry, StyleSheet, Text,TouchableOpacity,TextInput, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faSchool,faBook} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'
var db = SQLite.openDatabase('Users');

export default function GraduationUser(){
	const [graduations,setGraduations] = useState({user_graduation:[]});
	const [state,setState] = useState({schoolname:'',grade:''});
	const [addnewgraduation,setnewgraduation] = useState(false);
	
	
	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_graduation FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				var res = results.rows.item(0);
			    if(res['user_graduation'])
				{
					var res_json = JSON.parse(res['user_graduation']);
					setGraduations(
					  { user_graduation: res_json }
					);
					
				}
				else{
					setnewgraduation({addnewgraduation:true});
					
				}
			});
			});
	},[addnewgraduation]);
	
	const saveGraduationsData = ()=>{
		
		if (state.schoolname=='')
		{
			alert('Please input school name');
			return;
		}
		if(state.grade=='')
		{
			alert('Please input grade');
			return;
		}
		var graduation = {
						"schoolname":state.schoolname,
						"grade":state.grade,
					};
		db.transaction(function(txn){
			txn.executeSql('SELECT user_graduation FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>
			{
				var len = results.rows.length;
				
				var res = results.rows.item(0);
				
			    if(res['user_graduation']==null)
				{
					
					graduation = [graduation];
					var graduation_text = JSON.stringify(graduation);
					
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_graduation = ? WHERE user_name = ?',
						[graduation_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewgraduation(!addnewgraduation);
							
						}
						else alert('Registration Failed');
						});
					});
				}
				else{
					
					res = JSON.parse(res['user_graduation']);
					res.push(graduation);
					var graduation_text = JSON.stringify(res);
					db.transaction(function(txn){
						txn.executeSql( 'UPDATE Users_Table SET user_graduation = ? WHERE user_name = ?',
						[graduation_text,'sailee'],
						(tx,results)=>{
						
						if(results.rowsAffected>0)
						{
							alert('Success');
							setnewgraduation(!addnewgraduation);
							
						}
						else alert('Registration Failed');
						});
					});
				}
			});
			});
	}


	
	var graduation_list = () => {
		if(graduations.user_graduation)
		{
			return graduations.user_graduation.map((element,index) => {
			  return (
			  <View key={index}  style={Styles.inputlabel}>
					<View style={Styles.labelbox} >
						<Text>{element.schoolname}</Text>
					</View>
					<View style={Styles.labelbox} >
						<Text>{element.grade}</Text>
					</View>
			  </View>
			
			  );
			  
			}
			
			);
		}
		return;
	};

	var new_graduation_add = ()=>
	{	
		if (addnewgraduation)
		{
		return (

			<View style={Styles.form}>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faSchool} /><Text style={Styles.label}>School</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,schoolname:text})}  editable={true} style= {Styles.txtinput}  value={state.schoolname} />
				</View>
				<View style={Styles.inputlabel}>
					<View style={Styles.labelbox}>
						<FontAwesomeIcon style={Styles.icon} icon={faBook} />
						<Text style={Styles.label}>Grade</Text>
					</View>
					<TextInput onChangeText={(text)=>setState({...state,grade:text})}  editable={true} style= {Styles.txtinput}  value={state.grade} />
				</View>
				<View >
				<TouchableOpacity style = {Styles.getStartedButton} onPress={saveGraduationsData}>
						<Text  style = {Styles.headlineButton}>Add</Text>
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
				{graduation_list()}
				<TouchableOpacity style = {Styles.addButton} onPress={()=>setnewgraduation(!addnewgraduation)}>
							<Text  style = {Styles.headlineButton}>+</Text>
			  </TouchableOpacity>
			</View>
			{new_graduation_add()}	    		
		    </View>
		</View>
	)
	
	}

