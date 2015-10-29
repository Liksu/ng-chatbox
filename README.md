# ng-chatbox
Chat box component for angular

# install
Copy `chatbox.min.js` bundle to your site and plug it on the page.
```
$ npm install --save ng-chatbox
```
```html
<script src="node_modules/ng-chatbox/build/chatbox.min.js"></script>
```

# usage
Define dependency on your angular application like this:
```javascript
angular.module('application', ['ngChatbox'])
```
And then, use ngChatbox directive where you want to display message box:
```html
<ng-chatbox ng-model="messages"></ng-chatbox>
```
Pass array of messages to it.
Each message should be an object and contains next fields:
- **text**: shown message text
- **time**: message time
- **own**: customization of message view. Can be empty, 'mine' or 'their'

# todo
* add send message form
* auto-scroll option and new messages indication
* expand message on click
* remove messages
* override template and styles
* smiles ;)