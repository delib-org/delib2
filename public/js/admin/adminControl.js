function showAdminPanel(groupUid){
  renderTemplate("#adminControl-tmpl",{},"wrapper");

  //Pending Table
  DB.child("groups/"+groupUid+"/pendings").once("value", function(pendings){

    var preContext = [];
    if(pendings.val() !== null){
      pendings.forEach(function(pending){

        var dateAskedFor = parseDate(pending.val().dateAdded,"DDMMYY");

        preContext.push({name: pending.val().name, email: pending.val().email, date: dateAskedFor, uid:pending.key, groupUid:groupUid})
      });
      var context = {pendings: preContext};

      renderTemplate("#adminControlPending-tmpl",context, "#pendingMembersTable")
    } else {console.log("No pending members")}
  })

  //Members Table
  DB.child("groups/"+groupUid+"/members").once("value", function(members){

    var preContext = [];
    if(members.val() !== null){
      members.forEach(function(member){

        var dateAskedFor = parseDate(member.val().dateAdded,"DDMMYY");

        preContext.push({name: member.val().name, email: member.val().email, date: dateAskedFor})
      });
      var context = {members: preContext}

      renderTemplate("#adminControlMembers-tmpl",context, "#CurrentMembersTable")
    } else {console.log("No members in group")}
  })

}

function approveMember(groupUid, memberUid, isCofirmed){
  console.log("moving:",groupUid, memberUid, isCofirmed)
  if(isCofirmed == undefined){ isCofirmed = false};
  if (isCofirmed){

    var pendingRef = DB.child("groups/"+groupUid+"/pendings/"+memberUid);
    var memberRef = DB.child("groups/"+groupUid+"/members/"+memberUid);


    moveFbRecord(pendingRef, memberRef);
    DB.child("users/"+memberUid+"/membership/"+groupUid).set(true);

  } else {
    DB.child("groups/"+groupUid+"/pendings/"+memberUid).remove();
    DB.child("users/"+memberUid+"/membership/"+groupUid).remove();
  }
}