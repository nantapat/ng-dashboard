const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});

const bodyParser = require('body-parser');

const app = express();
app.use(cors);
app.use(bodyParser.urlencoded({extended:true}));

function checkUser(request,response){
    const email = request.params.email;
    admin.auth().getUserByEmail(email)
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
        return response.send(userRecord.toJSON());
    })
    .catch(function(error) {
        console.log("Error fetching user data:", error);
        return response.send({
            status: 'FAIL!!'
        });
    });
}

function addAdmin(request,response){
    const email = request.params.email;
    const role = request.params.role;
    console.log(email+"--"+role);
    admin.auth().getUserByEmail(email).then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {
            role: role
        });
        return response.send({
            status: 'OK!!'
        });
    }).catch((error) => {
        console.log(error);
        return response.send({
            status: 'FAIL!!'
        });
    });

   
}
function checkAdmin(request,response){
    const email = request.params.email;
    admin.auth().getUserByEmail(email).then((user) => {
        // Add incremental custom claim without overwriting existing claims.
        const currentCustomClaims = user.customClaims;
        console.log(currentCustomClaims);
        return response.send({
            status: 'OK!!'
        });
      }).catch((error) => {
        console.log(error);
      });
}



app.get('/check', (request, response) => {
    response.send({
        status: 'Alive!!'
    });
});

app.get('/checkUser/:email', checkUser);
app.get('/checkAdmin/:email', checkAdmin);
app.put('/user', function(request, response) {
    var email = request.param('email');
    var displayName = request.param('displayName');
    var photoURL = request.param('photoURL');
    admin.auth().getUserByEmail(email).then((user) => {
        admin.auth().updateUser(user.uid, {
            displayName: displayName,
            photoURL: photoURL,
        })
        .then(function(userRecord) {
            console.log("Successfully updated user", userRecord.toJSON());
            return response.send({
                status: 'OK!!',
                email:email
            });
        })
        .catch(function(error) {
            console.log("Error updating user:", error);
            return response.send({
                status: 'FAIL!!'
            });
        });
        return true;
      
    }).catch((error) => {
        console.log(error);
        return response.send({
            status: 'FAIL!!'
        });
    });
});
app.get('/addRole', function(request, response) {
    var email = request.param('email');
    var role = request.param('role');
    admin.auth().getUserByEmail(email).then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {
            role: role
        });
        return response.send({
            status: 'OK!!',
            email:email,
            role: role
        });
    }).catch((error) => {
        console.log(error);
        return response.send({
            status: 'FAIL!!'
        });
    });
  });




exports.app = functions.https.onRequest(app);
