$(function(){
  
  //start ripple effect
  $(".footer-btn").ePulse({
    bgColor: "#ded9d9",
    size: 'medium'
    
  });
  $(".headerMenuBtn").ePulse({
    bgColor: "#ded9d9",
    size: 'medium'
    
  });
    
    convertTemplate("#headerTitle-tmpl",{group: "להציל את הים"},"#headerTitle");
    convertTemplate("#headerBreadCrumbs-tmpl",{},"headerBreadCrumbs");
    convertTemplate("#headerMenu-tmpl",{},"headerMenu");
  
  
})

var userUuid = "-KIUArWGBpO4c2t5m-5c";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEumZUTCL3Jc9pt7_CjiSVTxmz9aMqSvo",
  authDomain: "synthesistalyaron.firebaseapp.com",
  databaseURL: "https://synthesistalyaron.firebaseio.com",
  storageBucket: "synthesistalyaron.appspot.com",
};
firebase.initializeApp(config);

var DB = firebase.database().ref();

//Handelbars shortcut function
function convertTemplate (template, context, destination){
  var groupsPublicTmpl = $(template).html();
  var groupPublicHandl = Handlebars.compile(groupsPublicTmpl);
  var groupPublicHTML = groupPublicHandl(context);
  $(destination).html(groupPublicHTML);
}


