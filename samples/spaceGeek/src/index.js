/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.d7278f18-8099-4539-8fce-07b8c27425dc";

/**
 * Array containing space facts.
 */
var BERN_FACTS = [
    "Bernie Sanders is the first non-Christian to win a U.S. primary.",
    "Sanders lived paycheck to paycheck growing up in Brooklyn.",
    "His brother, Larry Sanders, is also a politician in the United Kingdom.",
    "Sanders lost his first election in high school.",
    "Sanders grew up reading Karl Marx.",
    "Sanders attended the March on Washington in nineteen sixty three.",
    "He has not tried LSD, but has been to parties where everybody else has.",
    "Sanders delivered an eight hour filibuster against tax cuts in 2010.",
    "Sanders has been married twice.",
    "Sanders won his first mayoral election by 10 votes.",
    "He has his own Ben and Jerry's ice cream flavor.",
    "Sanders was a high school track star and a pretty good basketball player.",
    "Sanders father, Eli Sanders, was a paint salesman.",
    "Sanders is the longest serving independent member of Congress in American history.",
    "If he becomes president of the United States, he will be the oldest elected president in U.S. history.",
    "He won a second term in the Senate with 71 percent of the vote in 2012.",
    "He was the third socialist ever elected to Congress.",
    "He moved to Vermont in 1964.",
    "While in college, he marched for civil rights.",
    "He asked President Obama to raise taxes without Congress.",
    "He lists 18 priorities on his Senate web site, including: civil liberties, dental care, and women’s rights.",
    "He used to make documentary films.",
    "He used to be a journalist.",
    "He used to be a carpenter.",
    "He was a lecturer at Harvard University.",
    "He was born on September eighth nineteen forty one."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BernieGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BernieGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BernieGeek.prototype = Object.create(AlexaSkill.prototype);
BernieGeek.prototype.constructor = BernieGeek;

BernieGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BernieGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BernieGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BernieGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BernieGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BernieGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BernieGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Bernie Geek tell me a bernie fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * BERN_FACTS.length);
    var fact = BERN_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your bernie fact: " + fact;

    response.tellWithCard(speechOutput, "BernieGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BernieGeek skill.
    var bernieGeek = new BernieGeek();
    bernieGeek.execute(event, context);
};

