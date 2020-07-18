# Serverless-API-Workshop

![GitHub repo size](https://img.shields.io/github/repo-size/retry2z/Serverless-API-Workshop)
![GitHub stars](https://img.shields.io/github/stars/retry2z/Serverless-API-Workshop?style=social)
![GitHub forks](https://img.shields.io/github/forks/retry2z/Serverless-API-Workshop?style=social)

## Description

This is a basic REST API to store data about a room-product. All guests can view rooms and a room details. Logged user can modify their own profile information, create new room data, edit and remove their own rooms. Guest or logged user can join/leave a room and receive an information about events.

## Technologies

- ExpressJS.
- Firebase Function, Realtime Database, Cloud Firestore, Authentication.

## Documentation and Examples

https://documenter.getpostman.com/view/10051196/T1Djjedg

## Endpoints

Product:  
 |  GET: '/api/room/' - fetching all room list.  
 |  GET: '/api/room/:id' - fetching a room detail information about a room.  
 |  POST: '/api/room/' - creating a new room.  
 |  PATCH: '/api/room/:id' - modify the information about a owned room.  
 |  DELETE: '/api/room/:id' - delete the record about a owned room.  
 |  GET: '/api/room/:id/join' - creating a new room.  
 |  GET: '/api/room/:id/leave' - creating a new room.  
 

Authentication:  
 |  POST: '/api/auth/login' - Login with email and password to receive a authorization token.  
 |  POST: '/api/auth/register' - Create new account with email and password and receive a authorization token.  

User:  
 |  GET: '/api/user' - View current logged user.  
 |  PATCH: '/api/user' - Update information about the current user.  
 |  PUT: '/api/user/password' - Change password.  
 |  GET: '/api/user/logout' - Logout and destroy current authorization token.  

## Installing and configuration before running

Create config folder and config.js into it with API key from Firebase project.

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

