## Deployment

## Deploy Database
To deploy to the database you need to do the following things: 
* Connect to db
* Log in with root user 
* use sql script to populate database

## Deploy Backend
* go to /backend directory
* go into terminal 
* execute the following command: `$ gcloud config set project sopra-projekt-390609`
* execute the following command: `$ gcloud app deploy`

## Deploy Frontend
* go to directory /frontend/sopra-frontend
* go to the terminal 
* run the following command: `$ npm run build`
* execute the following command: `$ gcloud config set project sopra-projekt-frontend`
* run the following command: `$ gcloud app deploy

## URL's
|          Service           | URL                                                      |
|:--------------------------:|:--------------------------------------------------------:|
|          Frontend          | https://sopra-projekt-frontend.ey.r.appspot.com          |
|          Backend           | https://sopra-projekt-390609.ey.r.appspot.com            |
|         Swagger-ui         | https://sopra-projekt-390609.ey.r.appspot.com/swagger-ui |
| Backend Project Dashboard  | https://console.cloud.google.com/home/dashboard?project=sopra-projekt-390609 |
| Frontend Project Dashboard | https://console.cloud.google.com/home/dashboard?project=sopra-projekt-frontend |
| Firebase Project Dashboard | https://console.firebase.google.com/project/sopraproject-a157e/overview |
