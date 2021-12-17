import { StyleSheet,Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({

      profilepage : {
	     flex:1,
		 alignItems : 'center',
		 backgroundColor : '#ffffff',
	 },
	 
	 profilepage_bg:{
		height : windowHeight*0.2,
		width:windowWidth,
		borderBottomLeftRadius :12,
		borderBottomRightRadius:12,
		elevation:7,
		borderBottomWidth:3,
		borderRightWidth:3,
		borderLeftWidth:3,
		borderColor:'#ffffff',
		
		
	 },
	 profile_info : {
		height : windowHeight*0.35,
		width:windowWidth,
		alignItems:'center',
		position:'relative',
		
		
	 },
	 image:{
		  height: '100%',
		  width:'100%',
		  
	 },
	 profilepage_pic:{
		  position:'absolute',
		  alignSelf: 'center',
		  top: windowHeight*0.2 - 50,
		  height:100,
		  width:100,
		  borderWidth:3,
		  borderColor:'#ffffff',
		  overflow:'hidden',
		  borderRadius:50,
		  elevation:7,
	 },
	 profile_image:{
		  height: '100%',
		  width:'100%',
		  
	 },
	 profile_name:{
		  position:'absolute',
		  alignSelf: 'center',
		  top: windowHeight*0.2 + 60,
		  fontSize:18,
		  fontFamily:'poppins',
		  
	 },
	 navtext:{
		  fontFamily:'poppins',
	 },
	 resume_information:{
		  width:windowWidth,
		  flexGrow:1,
		  elevation:7,
		  

	 },
	 resume_information_bg:{
		  width:'100%',
		  flexGrow:1,
		  flexDirection:'column',
		  borderTopWidth:3,
		  borderLeftWidth:3,
		  borderRightWidth:3,
		  borderColor:'#ffffff',
		 
	 },
	 resume_information_ajp:{
		  width:'50%',
		  flex:1,
		  
	 },
	 resume_info_box:{
		  elevation:7,
		  
		  borderRadius:12,
		  width : '90%',
		  marginTop:'10%',
		 
		  marginLeft:'5%',
		 
	 },
	 about:{
		  backgroundColor:'#ffffff',
		  flex:1,
		  elevation:5,
		  borderRadius:12,
		  width : '90%',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
		  justifyContent:'center',
		  alignItems:'center',
	 },
	 jobs:{
		  backgroundColor:'#ffffff',
		  flex:1,
		  elevation:5,
		  borderRadius:12,
		  width : '90%',
		  marginTop:'2%',
		  marginBottom:'2%',
		  justifyContent:'center',
		  alignItems:'center',
		  marginLeft:'5%',
	 },
	 projects:{
		  backgroundColor:'#ffffff',
		  elevation:5,
		  flex:1,
		  borderRadius:12,
		  width : '90%',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
		  justifyContent:'center',
		  alignItems:'center',
	 },
	 graduation:{
		  backgroundColor:'#ffffff',
		  elevation:5,
		  flex:1,
		  borderRadius:12,
		  width : '90%',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
		  justifyContent:'center',
		  alignItems:'center',
	 },
	 skills:{
		  backgroundColor:'#ffffff',
		  elevation:5,
		  flex:2,
		  borderRadius:12,
		  width : '90%',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
		  justifyContent:'center',
		  alignItems:'center',
	 },
	 achievements:{
		  backgroundColor:'#ffffff',
		  elevation:5,
		  flex:1,
		  borderRadius:12,
		  width : '90%',
		  justifyContent:'center',
		  alignItems:'center',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
	 },
	 extra_curricular:{
		  backgroundColor:'#ffffff',
		  elevation:5,
		  flex:1,
		  borderRadius:12,
		  width : '90%',
		  justifyContent:'center',
		  alignItems:'center',
		  marginTop:'2%',
		  marginBottom:'2%',
		  marginLeft:'5%',
	 },
	 resume_information_ajp_button:{
		  flexDirection:'row',
		 
		  justifyContent:'center',
		  alignItems:'center',
	 },
	 button_img_apj:{
	      
		  marginLeft:5,
		  marginRight:5,
		 
	 },
	 icon:{
		  alignSelf: 'flex-start',
		  color:'#ff735c',
		  marginRight:4,
		  marginLeft:4,
		
	 },
	 percentage_complete_profile:{
		  backgroundColor:'#fff',
		  width:'95 %',
		  height :'30%',
		  marginLeft:'2.5%',
		  marginRight:'2.5%',
		  marginTop:'4%',
		  marginBottom:'2%',
		  elevation:5,
		  borderRadius:12,


	 },

      formbox:{
        width:windowWidth,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
      },
      form:{
        paddingHorizontal:10,
        paddingVertical:20,
        elevation:3,
		marginVertical:10,
        backgroundColor:'#fafafa',
        width:windowWidth*0.9,
        borderRadius:12,
      },
      inputlabel:{
        marginVertical:8,
        elevation:2,
        backgroundColor:'#fafafa',
        borderRadius:4,
		fontFamily:'poppins',
		paddingHorizontal:4,
		paddingVertical:4,
      },
      label:{
            color:'#ff735c',
			marginTop:4,
			fontFamily:'poppins_Medium',
			marginLeft:4,
      },
	  labelbox:
	  {
			
			flexDirection:'row',
			alignItems:'center',
	  },
     
	  addButton:{
			 shadowColor: '#000',
		     shadowOffset: { width: 0, height: 1 },
		     shadowOpacity: 0.8,
		     shadowRadius: 2,  
		     elevation: 2,
		     borderRadius : 4,
			 alignSelf: 'flex-start',
		     backgroundColor :'#ff735c',
		     paddingHorizontal:10,
			 paddingVertical:4,
		     
	  },
	  page : {
	     flex:1,
		 justifyContent:'center',
		 alignItems : 'center',
		 backgroundColor : '#ffffff',
	 },
	 ul :{
	      shadowColor: '#000',
		  shadowOffset: { width: 0, height: 1 },
		  shadowOpacity: 0.8,
		  shadowRadius: 2, 
		  elevation: 5,
		  alignItems:'center',
		  justifyContent:'center',
		  backgroundColor :'#ffffff',
		  height: windowHeight*0.6,
		  width:windowWidth*0.9,
		  borderRadius : 25,
		  marginBottom:30,
		 
		 
	 },
	
	 flatlist : {
		flexGrow:1,
		alignItems:'center',
		justifyContent:'center',
		
	 },
	 carouselimg : {
		  width:windowWidth*0.9,
		  height :windowWidth*0.63,
		  borderRadius : 25,
		  marginTop:4,
		  marginBottom:4,
		 
	 },
	 perccomplete :{
		justifyContent:'center',
		alignItems:'center',
		width:'30%',
		height:'100%',

		
	},
	headline : {
		  
		  textAlign:'center',
		  fontSize:17,
		  marginTop:4,
		  fontFamily:'poppins',
		  marginBottom:4,
		 
	 },
	percent:{
		textAlign:'center',
		position:'absolute',
		
		fontSize:20,
		fontWeight:'800',
		color:'#ff735c',
	},
	perccomplete_text:{
		position:'absolute',
		
		fontSize:16,
		fontWeight:'800',
		color:'#000',
		fontFamily:'poppins',
	},
	 subtitle : {
		  
		
		  color:'#463f3f',
		  fontSize:16,
		  marginTop:4,
		  marginBottom:4,
		  textAlign:'center',
		  flexWrap: 'wrap',
		  paddingHorizontal:5,
		  fontFamily:'poppins_Light',
		  
	 },
	progressBar:{
		color:'#ff735c',
		height:'10',
	},
	 itemstyle:{
		 width:windowWidth*0.9,
		  

	 },
	 getStartedButton : {
	     shadowColor: '#000',
		 shadowOffset: { width: 0, height: 1 },
		 shadowOpacity: 0.8,
		 shadowRadius: 2,  
		 elevation: 3,
		 alignSelf: 'flex-start',
		 paddingHorizontal:10,
		 paddingVertical:4,
		 borderRadius : 4,
		 backgroundColor :'#ff735c',
		
		 
	 },
	  headlineButton : {
		  textAlign:'center',
		  fontSize:18,
		  color:'#ffffff',
		  fontFamily:'poppins_Medium',
		  borderRadius:4,

	  },
      txtinput: {
        height:30,
        borderBottomWidth: 1,
        borderColor: '#c7c5c5',
		fontFamily:'poppins',
		paddingHorizontal:5,
		
      },
      slinks:{
            flexDirection:'row',
            alignItems:'center',
			marginBottom:2,
      },
      slinkstxtinput:{
            flexGrow:1,
            borderBottomWidth: 1,
            marginLeft:8,
            height:30,
			fontFamily:'poppins',
            borderColor: '#c7c5c5',
    
      }
});