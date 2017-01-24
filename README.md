# Alexa LISA skill
> Experimental Alexa Skill to imitate normal human interaction
## Story :
### Life is Short!
> Yes - thats a fact. We get too busy with things in our life, that sometime "life" takes a back seat. We sometime forget that there are really interesting things around us, and we instead are caught in a race with no end.

LISA ( derived from Life Is Short.. ) attempts to be the bridge between us and the outside world in a friendly and funny manner, and tries to build a human connection with us in this otherwise highly tech influenced world.

### Introducing LISA
LISA is actually very simple. She is a custom Amazon Skill, which suggests an individual to get out of home and explore the city. LISA does this by using the data ( specifically ART Center Locations ) provided by Las Vegas Open Data Portal.

In this project, I have focused primarily on the conversation aspect between a human and the machine ( Alexa ). The essence, which is somewhat sarcastic, is the use of a machine to motivate a person to get out of his/her house and be freed from machines for a bit!

### Conversation with Lisa
Here is an actual conversation transcript with Lisa.
```
Me: "Alexa open Lisa"
Lisa : "I am your friend Lisa, you can say I am bored, or you can ask me to mind my own business... How can I help you today?"
Me : "I am bored!"
Lisa : "Again!"
Me : "Yes"
Lisa : "May be you should call a friend?"
Me : "No!!"
Lisa : "Tell you what, I got an idea. You are new to the city. Why don't you check some place out?"
Me : "Like what?"
Lisa : "May be go to casino, or go to las vegas strip?"
Me : "No way!"
Lisa : "What about visiting some art studio? Do you want some suggestions?"
Me : "Sounds interesting!"
Lisa : "Here's my suggestion: Arts District Tree Guards 2000, which is a Sculpture by Jeff at Arts Factory. Should I send the details to you?"
Me : "Yes!"
Lisa : "Awesome. I sent you the details. Follow the directions, and don't get lost!"

[A text message using AWS SNS is sent to my phone (hard coded at the moment) with the details and direction to Arts District Tree Guards 2000.]

Me : "Thanks Lisa!"
Lisa : "GoodBye. And don't forget the groceries on your way back!. I have sent the list to that as well!"
```

## Refer https://github.com/alexa/skill-sample-nodejs-fact on how to setup skills on AWS etc..

## Skills Setup Details
### Intent
```
{
  "intents": [
    {
      "intent": "IAmBoredIntent"
    },
    {
      "intent": "YesIntent"
    },
    {
      "intent": "NoIntent"
    },
    {
      "intent": "UnsureIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    }
  ]
}
```

### Utterances
```
IAmBoredIntent I am bored
YesIntent Yes
YesIntent Where should i go
YesIntent What should I do
YesIntent I am listening
YesIntent Sounds Interesting
NoIntent No
NoIntent No Way
UnsureIntent Like what
UnsureIntent Hmm
UnsureIntent I don't know
AMAZON.StopIntent Thanks Lisa
```