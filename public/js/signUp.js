$(document).ready(function() {
   // Getting references to our form and inputs
   var loginForm = $("form.login");
   var emailInput = $("input#email-input").val().trim();
   var passwordInput = $("input#password-input").val().trim();
 
   // When the form is submitted, we validate there's an email and password entered
   loginForm.on("submit", function(event) {
     event.preventDefault();
     var userData = {
       email: emailInput,
       password: passwordInput,
     };

     if (emailInput == "" || passwordInput == "") 
     {
      $("#p1").html("Error: form is missing a field")
    }
     
     if (!userData.email || !userData.password) {
       return;
     }
     

     // If we have an email and password we run the loginUser function and clear the form
     loginUser(userData.email, userData.password);
     emailInput.val("");
     passwordInput.val("");
   });

 
   // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
   function loginUser(email, password) {
     $.post("/api/login", {
       email: email,
       password: password
     })
       .then(function() {
         $.get("/api/user_data", data => {
            window.location.replace("/member");
         });
         // If there's an error, log the error
       })
       .catch(function(err) {
        $("#p1").html("Error: username and password did not match.");
       });
   }
 });
 