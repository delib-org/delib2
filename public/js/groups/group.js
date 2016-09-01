function showGroup(groupUid){

   //show header

   //show footer&header

   DB.child("groups/"+groupUid).once("value", function(dataSnapshot){
      //show header
      var title = dataSnapshot.val().title;
      renderTemplate("#groupHeaderTitle-tmpl", {group: title}, "#headerTitle");
      renderTemplate("#headerMenu-tmpl", {chatUid: groupUid, entityType: "groups"}, "#headerMenu");

      //    getLocalNotifications();


      //show footer
      renderTemplate("#showEntityPanel-tmpl", {}, "footer");

      isMembership();
   }).then(function(rendered) {
      subsManager.isUpdatesSet();
   });


   var showGroupCallback = function(subEntities){

      if(subEntities.exists()){

         var subEntitiesUnderGroup = subEntities.val();
         var numberOfSubEntities = Object.keys(subEntitiesUnderGroup).length;
         var subEntitiesUnderGroupArray = new Array();

         var i = 1;

         subEntities.forEach(function(subEntity){

            DB.child(subEntity.val().entityType+"/"+subEntity.key).once("value", function(data){

               var preContext = new Object();

               if (data.exists()){

                  var title = data.val().title;
                  var description = data.val().description;
                  //          console.log("t: "+ title + ", d: "+ description);

                  preContext = {
                     uuid: subEntity.key,
                     title: title,
                     description: description
                  }

                  subEntitiesUnderGroupArray.push(preContext);
               }

               if (i === numberOfSubEntities){
                  var context = {groups: subEntitiesUnderGroupArray};
                  renderTemplate("#groupPage-tmpl", context, "wrapper");
                  $("wrapper").hide();
                  $("wrapper").fadeIn();
               }

               i++;
            })
         })
      } else {
         renderTemplate("#groupPage-tmpl",{}, "wrapper");
      }
   };


   //show wrapper
   DB.child("groups/"+groupUid+"/subEntities").on("value", showGroupCallback);
   
   var turnOff = function () {
      DB.child("groups/"+groupUid+"/topics").off("value", showGroupCallback);
   };
   
   setActiveEntity("groups", groupUid, "value", showGroupCallback, turnOff);


   if(!back){
      setUrl("group", groupUid);
   }


}


//show group topics
//function showGroupTopics(groupUid){
//   //get group topics
//
//   DB.child("groups/"+ groupUid.toString()+"/topics").on("value",
//}
