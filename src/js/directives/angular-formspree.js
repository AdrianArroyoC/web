(function () {
	//Created by Jason Voirin http://www.jasonvoirin.com and http://github.com/jasonvoirin
    'use strict';
    angular.module('angularFormspree', []).directive('angularFormspree', angularFormspree);
    angularFormspree.inject = ['$http'];
    function angularFormspree($http){


	  //1. Add the email you want the messages to be sent to
	  var email = "jasonvoirin@gmail.com";
	  //2. Add the email subject line 
	  var email_subject = "JasonVoirin.com Contact Form Submission";
	  //3. Add a message the user will see when the form is submitted successfully
	  var success_message = "Your message was sent! We will be in touch soon.";
	  //4. Add a message the user will see if the form receives an error and does not submit successfully
	  var error_message = "Oops. There was an error when trying to send your message.";


	  //STOP! Other than email address, email_subject and messages, no other changes are needed.

    var init = function (scope, element, attrs){
    //contact form model
		scope.contactform = {};

		//hide any contact form messages
		scope.showMessage = false;

		scope.submit = function(){

			$http({
			    url: "http://formspree.io/" + email,
			    data: {
			    	name: scope.contactform.name,
                    email: scope.contactform.email,
                    comments: scope.contactform.comments,
	                _subject: email_subject,
			    },
			    method: 'POST',
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    transformRequest: function(obj) {
			      var str = [];
			      for(var p in obj)
			      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			      return str.join("&");
			    }
			}).then(function(response){
				scope.showMessage = true;
				scope.message = success_message;

			}).catch(function(error){
				scope.showMessage = true;
				scope.message = error_message;
			});
		}
      }
	  return {
		restrict: 'AE',
		scope: false,
		template: '<form ng-if="!showMessage" ng-submit="submit()">' +
					'<div class="form-group">' +
			      		'<input ng-model="contactform.name" class="form-control input-lg" placeholder="Name" /> ' +
			      	  '</div>' +
			      	  '<div class="form-group">' +
			      		'<input ng-model="contactform.email" type="email" class="form-control input-lg" placeholder="Email" /> ' +
			      	  '</div>' +
			      	  '<div class="form-group">' +
			      		'<textarea ng-model="contactform.comments" class="form-control contact"></textarea>' +
			      	  '</div>' +
			      	  '<div class="form-group">' +
			      		'<input type="submit" value="Submit"/>' +
			      	  '</div>' +
			      '</form>' + 
      			  '<div ng-if="showMessage"><p>{{message}}</p></div>',
		link: init
	  };
	};
}());