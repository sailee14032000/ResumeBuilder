import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {ImageBackground,  Text, View ,TextInput,Image,TouchableOpacity} from 'react-native';
import Styles from './Styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt,faEnvelope,faPhoneAlt,faUser,faGlobe} from '@fortawesome/free-solid-svg-icons';
import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('Users');

export default function About(){
	const [state,setState] = useState({fullname:"",email:"",github:"",linkedin:"",website:"",email:"",phoneno:"",address:""});
	
	useEffect(()=>{
		db.transaction(function(txn){
			txn.executeSql('SELECT user_about FROM Users_Table WHERE user_name = ?',
			['sailee'],
			(tx,results)=>{
			
			var res = results.rows.item(0);
			var res_json = JSON.parse(res['user_about']);
			console.log(res_json);
			if (res_json!=null)
			{
			setState({
				fullname:res_json.fullname,
				email:res_json.email,
				phoneno:res_json.phoneno,
				address:res_json.address,
				linkedin:res_json.linkedin,
				github:res_json.github,
				website:res_json.website,
			});
			}
			})
		});
		
	},[]);

	saveAboutData = ()=>{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var checkemail = re.test(state.email);
		if (!checkemail)
		{
			alert('Invalid Email address.');
			return;
		}
		if(state.phoneno.length!=10)
		{
			alert('Invalid Phone number.');
			return;
		}
		var about = {
						"fullname":state.fullname,
						"email":state.email,
						"phoneno": state.phoneno,
						"address":state.address,
						"github":state.github,
						"website":state.website,
						"linkedin":state.linkedin,
					};
		var about_text = JSON.stringify(about);
		db.transaction(function(txn){
			txn.executeSql('UPDATE Users_Table SET user_about = ? WHERE user_name=?',[about_text,'sailee'],
			(tx,results)=>{
			console.log(results);
			if(results.rowsAffected>0)
			{
				alert('Success');
			}
			else alert('Registration Failed');
			});
		});
	  


	}
	return(
	<ImageBackground  source={require('./Img/bg1.png')} resizeMode="cover" style={Styles.image}>
			
		<View style={Styles.formbox}>
					
		    <View style={Styles.form}>
			<View style={Styles.inputlabel}>
				<View style={Styles.labelbox}>
					<FontAwesomeIcon style={Styles.icon} icon={faUser} /><Text style={Styles.label}>Name</Text>
				</View>
				<TextInput  onChangeText={(text)=>setState({...state,fullname:text})} style={Styles.txtinput}  value={state.fullname} />
			</View>
			<View style={Styles.inputlabel}>
				<View style={Styles.labelbox}>
				<FontAwesomeIcon style={Styles.icon} icon={faEnvelope} /><Text style={Styles.label}>Email</Text>
				</View>
				<TextInput onChangeText={(text)=>setState({...state,email:text})}  style= {Styles.txtinput}  value={state.email} />
			</View>
			<View style={Styles.inputlabel}>
				<View style={Styles.labelbox}>
				<FontAwesomeIcon style={Styles.icon} icon={faPhoneAlt} /><Text style={Styles.label}>Phone</Text>
				</View>
				<TextInput onChangeText={(text)=>setState({...state,phoneno:text})} editable={true} style= {Styles.txtinput} keyboardType="phone-pad"  value={state.phoneno} />
			</View>
			<View style={Styles.inputlabel}>
				<View style={Styles.labelbox}>
				<FontAwesomeIcon style={Styles.icon}  icon={faMapMarkerAlt} /><Text style={Styles.label}>Address</Text>
				</View>
				<TextInput onChangeText={(text)=>setState({...state,address:text})} style= {Styles.txtinput} numberOfLines={5} underlineColorAndroid='transparent' multiline={true}  value={state.address} />
			</View>
			<View style={Styles.inputlabel}>
				<Text style={Styles.label}>Links</Text>
				<View>
					<View style={Styles.slinks}>

						<FontAwesomeIcon style={Styles.icon} icon={faGlobe} />
						<TextInput onChangeText={(text)=>setState({...state,website:text})} style= {Styles.slinkstxtinput} underlineColorAndroid='transparent'  value={state.website} />
					</View>
					<View style={Styles.slinks}>

						<FontAwesomeIcon style={Styles.icon} icon={['fab', 'linkedin']} />
						<TextInput onChangeText={(text)=>setState({...state,linkedin:text})} style= {Styles.slinkstxtinput} underlineColorAndroid='transparent'  value={state.linkedin} />
					</View>
					<View style={Styles.slinks}>
						<FontAwesomeIcon style={Styles.icon} icon={['fab', 'github-square']} />
						<TextInput onChangeText={(text)=>setState({...state,github:text})} style= {Styles.slinkstxtinput} underlineColorAndroid='transparent' value={state.github} />	
					</View>
				</View>
			</View>
			<View >
				<TouchableOpacity style = {Styles.getStartedButton} onPress={saveAboutData}>
						<Text  style = {Styles.headlineButton}>Save</Text>
				</TouchableOpacity>
			</View>
		</View>
		
		</View>
		</ImageBackground>	
	)
	

}