function init() {

  var triggers = ScriptApp.getProjectTriggers();
  var form = FormApp.getActiveForm();
  Logger.log(form);
  

  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  

  ScriptApp.newTrigger('submitToTrello')
           .forForm(form)
           .onFormSubmit()
           .create();
   
}

function submitToTrello(e) {
  var form = FormApp.getActiveForm();
  var latestItemResponses = form.getResponses().pop().getItemResponses();
 
  if (MailApp.getRemainingDailyQuota() > 0) {
    
    var email = "";
    var body = '';
 
    var subject = latestItemResponses[0].getResponse() + ' (' + latestItemResponses[1].getResponse() + ')'
    latestItemResponses.shift();
    latestItemResponses.shift();
  Logger.log(latestItemResponses);
   

    latestItemResponses.forEach(function (value, index) {
    body += '\n**' + (index + 1) + '.' + ' ' + value.getItem().getTitle() + '**' + ' ' + value.getResponse() + '\n';
    });
        
    MailApp.sendEmail(email, subject, body);
  }
  else Logger.log('F');

}
