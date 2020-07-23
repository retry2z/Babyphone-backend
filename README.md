# Serverless-API-Workshop

![GitHub repo size](https://img.shields.io/github/repo-size/retry2z/Serverless-API-Workshop)
![GitHub stars](https://img.shields.io/github/stars/retry2z/Serverless-API-Workshop?style=social)
![GitHub forks](https://img.shields.io/github/forks/retry2z/Serverless-API-Workshop?style=social)

## Description

This is a basic REST API to store data about a room-product. All guests can view rooms and a room details. Logged user can modify their own profile information, create new room data, edit and remove their own rooms. Guest or logged user can join/leave a room and receive an information about events.

## Technologies

- ExpressJS.
- Firebase Function, Realtime Database, Cloud Firestore, Authentication.

## Installing and configuration before running

Create config folder and config.js into it with API key from Firebase project.  
```
// config.js  
  
module.exports = {  
    apiKey: "............",  
    authDomain: "........",  
    databaseURL: "........",  
    projectId: ".......",  
    storageBucket: ".......",  
    messagingSenderId: "........",  
    appId: "..........",  
    measurementId: "......."  
};  
```
Enter ```firebase init``` to init your firebase project configuration.

You can also run the application locally using ```firebase serve``` command instead of deploying it every time. When you run that command you may get an error regarding credentials. To fix it, follow the steps mentioned below:

Go to the Project Settings (Settings icon at the top left-hand side)
Go to the service accounts tab  
Down there will be the option of Generating a new key. Click on that option and it will download a file with a JSON extension.  
We need to export these credentials to our command line session. Use the command below to do that:  
```
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"
```

## Deploy

To deploy project:
```
firebase deploy
```

## Endpoints

METHOD | ROUTE | DESCRIPTION
------|-------------|---------
| |    
GET | /api/rooms | Fetching all available rooms list.
GET | /api/room/:id | Fetching a room detail information about a room.
POST | /api/rooms | Creating a new room. 
PATCH | /api/rooms | Modify the information about a owned room.  
DELETE | /api/rooms | Delete the record about a owned room. 
GET | /api/room/:id/join | Join a room.  
GET | /api/room/:id/leave | Leave a room.
POST | /api/room/:id/notification | Send a message to all users in room.  
| |    
POST | /api/auth/login | Login with email and password to receive a authorization token.  
POST | /api/auth/register | Create new account with email and password and receive a authorization token.  
| |    
GET | /api/user | View current logged user.  
PATCH | /api/user | Update information about the current user.  
PUT | /api/user/password | Change password.  
GET | /api/user/logout | Logout and destroy current authorization token.  
| |    


## Examples

https://documenter.getpostman.com/view/10051196/T1Djjedg


## Contributing to Serverless-API-Workshop
To contribute to Serverless-API-Workshop, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin Serverless-API-Workshop/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors



## Contact

If you want to contact me you can reach me at h.hristow.88@gmail.com

