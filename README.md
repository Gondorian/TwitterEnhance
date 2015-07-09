# video45

###Introduction
This is for the video45 website and mobile application.

###Installation

####Web Server
Make sure you have node.js installed as well the Node Package Manager.

To get the website up and running, just clone this repository. Navigate to the repository in your terminal and run the command `sudo npm install`. This should install the dependencies for the project. After thats done, simply run the command 'node bin/www' to start the web server.

You will need couchdb installed to have a functional website. Install it and then make a new database called `video45`. Inside the database, add a new document. Set the `_id` field to `_design/user`. Click Save Document. Couchdb will add in a rev field for you. Copy the contents 'designDocument' file into the document in couchdb, making sure to not change the rev and id fields.

####Mobile App
Install Cordova by running the command `sudo npm install -g cordova`. Navigate to the `video45Mobile` directory in the repository. Run the command `cordova platform add android` to add the android platform. You will need to have the Android SDK installed for this to work.
