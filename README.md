InPersoned ChromeExtension
===============

> Chrome Extension for the [inperosoned.com](http://inpersoned.com) social platform. Displays upcoming events.

Uses precompiled handlebars template.

## To build handlebars template:

Prerequisites:

	* node.js
	* npm
	* handlebars.js 1.3.0 compiler

Install handlebars compiler with npm:

	npm install handlebars@1.3.0 -g

Example, run command in Scripts/templates directory:
	
	handlebars events.handlebars -f events.js -k each


## Resources

  - [nodejs.org](http://nodejs.org/)
  - [npm](http://npmjs.org/)
  - [handlebars.js](http://handlebarsjs.com/)

## TODO

  - Add login
  - Get events for user that is logged in
  - Get notifications about new messages

## License
[MIT licence](http://opensource.org/licenses/MIT)
