function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 12)];
  }
  return color;
}

function parseDate(dateInMillisec, format){
  var d=new Date(dateInMillisec);

  var dayInMonth="0"+d.getDate();
  dayInMonth = dayInMonth.slice(-2);


  var month=d.getMonth();
  var monthsNames = ["ינואר", "פברואר", "מרץ", "ארפיל", "מאי", "יוני", "יולי", "אוג'", "ספט'", "אור'", "נוב'", "דצמ'"];
  month = monthsNames[month];

  var year=d.getYear()+1900;

  var minutes="0"+d.getMinutes();
  minutes = minutes.slice(-2);

  var hours="0"+d.getHours();
  hours = hours.slice(-2);

  var seconds="0"+d.getSeconds();
  seconds = seconds.slice(-2);

  switch (format){
    case "DDMMYY":
      return (year+" "+month+" "+dayInMonth);
      break;
    default:
      return (year+"-"+month+"-"+dayInMonth+" - "+hours+":"+minutes+":"+seconds);
  }


}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function animateHeader(){
  $("header").hide();
  $("header").show(400);
}

function isNotEmpty(variable){
  if (variable != null || variable != undefined || variable != "" ){
    return true;
  } else {
    return false;
  }
}

function back(){
  var entityType = activeEntity.entityType;
  var entityUid = activeEntity.uid;

  showEntities(entityType,entityUid);
}

function entityTypeToHebrew (entityType){
  switch (entityType){
    case "groups":
      return "קבוצה";
      break;
    case "topics":
      return "נושא";
      break;
    case "questions":
      return "שאלה";
      break;
    case "chats":
      return "שיחה";
      break;
    default:
      console.log("unknowen entity");
      return undefined;
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


function playCough(){
  var cough = new Audio("sounds/Cough-SoundBible.com-1409703798.wav");
  cough.play();
}

function playCheer(){
  var cheer = new Audio("sounds/SMALLCROWDAPPLAUSEYannickLemieux1268806408.wav");
  cheer.play();
}


function moveFbRecord(oldRef, newRef) {
  oldRef.once('value', function(snap)  {
    newRef.set( snap.val(), function(error) {
      if( !error ) {  oldRef.remove(); }
      else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
    });
  });
}

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function findSelfParent(){
  DB.once("value",function(data){
    data.forEach(function(data2){
      console.log(data2.key)
      DB.child(data2.key).once("value",function(data3){
        data3.forEach(function(data4){
//          console.log(data4.val().parentEntityUid,data4.key, data2.key)
          if (data4.val().parentEntityUid == data4.key){
            console.log(data4.val().parentEntityUid,data4.key, data2.key);
          }
        })
      })
    })
  })
}

function testSpeedOfFirebase(){
  var dStart = new Date(); var n = dStart.getTime();
  console.log("start running", n);

  DB.child("questions/"+"-KUvB0T6KxAhOxTwh2U_"+"/options/option0/thumbUp").once("value", function(data1){
    console.dir (data1.val());
    var d2 = new Date(); var n = d2.getTime();
    console.log("got thumbUp information", n);
    DB.child("questions/"+"-KUvB0T6KxAhOxTwh2U_"+"/parentEntities/groups").once("value", function(data2){
      console.dir (data2.val());
      var d3 = new Date(); var n = d3.getTime();
      console.log("got parents information", n);
    })
  })

  DB.child("questions/"+"-KUvB0T6KxAhOxTwh2U_").once("value", function(data){
    console.dir (data.val());
    var d1 = new Date(); var n = d1.getTime();
    console.log("got all the information", n);
  })
}
