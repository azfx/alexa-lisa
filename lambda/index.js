'use strict';

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const IdeasList = require("./data/ideas");
AWS.config.region = 'us-east-1';
var sns = new AWS.SNS();

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
	'en-US': {
		translation: {
			IDEAS: IdeasList,
			SKILL_NAME: 'Lisa',
			GET_IDEAS_MESSAGE: "Here's my suggestion: ",
			SEND_IDEA_QUESTION : "Should I send the details to you?",
			HELP_MESSAGE: 'I am your friend Lisa, you can say I am bored, or you can ask me to mind my own business... How can I help you today?',
			HELP_REPROMPT: 'How can I help you today?',
			START_CONVERSATION : 'What, you are bored again?',
			GET_CALLFRIEND_MESSAGE : 'May be you should call a friend?',
			GET_CHECKPLACESOUT_MESSAGE : "Tell you what, I got an idea. You are new to the city. Why don't you check some new place out?",
			GET_GOTOCASINO_MESSAGE: 'May be go to casino, or go to las vegas strip?',
			GET_GOTOARTPLACE_MESSAGE : 'What about visiting some art center? Do you want some suggestions?',
			GET_SEND_MESSAGE : "Awesome. I sent you the details. Follow the directions, and don't get lost",
			STOP_MESSAGE: 'Goodbye!',
		},
	},
};

const handlers = {
	'LaunchRequest': function () {
		this.emit('AMAZON.HelpIntent');
	},
	'IAmBoredIntent': function () {
		this.emit('StartConversation');
	},
	'YesIntent' : function() {
		console.log("State: ", this.attributes['state']);
		//1
		if(this.attributes['state'] == "CONVERSATION_STARTED") {
			this.emit('CallYourFriend');
		}


		if(this.attributes['state'] == "CONVERSATION_GOTOARTPLACE") {
			this.emit('LetsHaveFun');
		}

		if(this.attributes['state'] == "IDEA_GIVEN") {
			this.emit('SendDetails');
		}
	},
	'NoIntent' : function() {
		//2
		if(this.attributes['state'] == "CONVERSATION_CALLFRIEND") {
			this.emit('CheckPlacesOut');
		}

		//4
		if(this.attributes['state'] == "CONVERSATION_GOTOCASINO") {
			this.emit("GoToArtPlace");
		}
	},
	'UnsureIntent' : function() {
		//Like what?
		//3
		this.emit('GoToCasino')
	},
	'StartConversation' : function() {
		this.attributes['state'] = "CONVERSATION_STARTED";
		this.emit(':ask' , this.t('START_CONVERSATION'), this.t('START_CONVERSATION'));
	},
	'CallYourFriend' : function() {
		///1
		const speechOutput = this.t('GET_CALLFRIEND_MESSAGE');
		this.attributes['state'] = "CONVERSATION_CALLFRIEND";
		this.emit(':ask', speechOutput, speechOutput);
	},
	'CheckPlacesOut' : function() {
		///2
		const speechOutput = this.t('GET_CHECKPLACESOUT_MESSAGE');
		this.attributes['state'] = "CONVERSATION_CHECKPLACESOUT";
		this.emit(':ask', speechOutput, speechOutput);
	},
	'GoToCasino' : function() {
		///3
		const speechOutput = this.t('GET_GOTOCASINO_MESSAGE');
		this.attributes['state'] = "CONVERSATION_GOTOCASINO";
		this.emit(':ask', speechOutput, speechOutput);
	},
	'GoToArtPlace' : function() {
		///4
		const speechOutput = this.t('GET_GOTOARTPLACE_MESSAGE');
		this.attributes['state'] = "CONVERSATION_GOTOARTPLACE";
		this.emit(':ask', speechOutput, speechOutput);
	},
	'LetsHaveFun': function () {
		// Get a random ideas/suggestions from the list
		// Use this.t() to get corresponding language data
		const ideaArr = this.t('IDEAS');
		const ideaIndex = Math.floor(Math.random() * ideaArr.length);
		const randomIdea = ideaArr[ideaIndex].NAME + ", which is a " + ideaArr[ideaIndex].TYPE + " by " + ideaArr[ideaIndex].ARTIST + " at " + ideaArr[ideaIndex].LOCATION

		// Create speech output
		const speechOutput = this.t('GET_IDEAS_MESSAGE') + randomIdea + ". " + this.t('SEND_IDEA_QUESTION');
		this.attributes['state'] = "IDEA_GIVEN";
		this.attributes['ideaLocation'] = ideaArr[ideaIndex]["Location 1"];
		this.attributes['ideaName'] = ideaArr[ideaIndex].NAME
		this.emit(':askWithCard', speechOutput, this.t('SKILL_NAME'), randomIdea);
	},
	'SendDetails' : function() {
		const speechOutput = this.t('GET_SEND_MESSAGE');
		const reprompt = speechOutput;

		var params = {
			Message: this.attributes['ideaName'] + ": " + this.attributes["ideaLocation"],
			MessageStructure: 'string',
			PhoneNumber: '+14084690396'
		};

		var self = this;

		sns.publish(params, function(err, data) {
			if (err) {
				console.log(err, err.stack); // an error occurred
			}
			else {
				console.log(data);           // successful response
				self.attributes['state'] == "";
				self.emit(':tellWithCard', speechOutput, self.t('SKILL_NAME'), reprompt);
			}
		});

	},
	'AMAZON.HelpIntent': function () {
		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_MESSAGE');
		this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
		this.attributes['state'] == "";
		this.attributes['ideaLocation'] = "";
		this.attributes['ideaName'] = "";
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
		this.attributes['state'] == "";
		this.attributes['ideaLocation'] = "";
		this.attributes['ideaName'] = "";
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'SessionEndedRequest': function () {
		this.attributes['state'] == "";
		this.attributes['ideaLocation'] = "";
		this.attributes['ideaName'] = "";
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
};

exports.handler = (event, context) => {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	// To enable string internationalization (i18n) features, set a resources object.
	alexa.resources = languageStrings;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
