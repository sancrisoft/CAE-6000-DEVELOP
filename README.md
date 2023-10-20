# Global7500-OMS-IMS

## 1. Description

online and standalone trainer for Bombardier Global 7500 OMS and IMS systems.

## 2. Required

 - __docker__ 17.06.0-ce or greater (might work with lower versions also)
 - __docker-compose__ 1.12.0 or greater (any version that supports 'version 2')

## 3. Install and run on local

3.1 Make sure you have __docker__ and __docker-compose__ installed
```bash
docker --version
docker-compose --version
```
If not installed, refer to :
- [how to install __docker__](https://docs.docker.com/engine/installation/)
- [how to install __docker-compose__](https://docs.docker.com/compose/install/)


3.2 clone the project
```bash
git clone git@github.com:BATraining/Global7000-OMS-IMS.git
```

3.3 cd to project folder
```bash
cd Global7000-OMS-IMS
```

3.4 rename docker-compose.dist and edit the yml file, if necessary
```bash
mv docker-compose.dist docker-compose.yml
```

3.5 rename trainer-client/src/renderer/config/env.dist and edit the js file, if necessary
```bash
mv trainer-client/src/renderer/config/env.dist trainer-client/src/renderer/config/env.js
```

3.7 build the containers
```bash
docker-compose build
```

3.8 to run the application run
```bash
docker-compose up -d
```
The main application (Trainer) is accessible at [http://localhost:8180](http://localhost:8180)


## Install and run remotely

Use the dedicated Jenkins job to deploy remotely.

    !NDM! Never Deploy Manually!


##### Slack channel : #_g7000_oms

## Changelog

### 2.2.7 
    - Change the API lik to CAE link. 
