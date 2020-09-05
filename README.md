# Foolstack

![Project Demo](readme-content/Foolstack-Google-Chrome-2020-09.gif)

(*The demo did not capture my file system dialog, selecting images loads them from file :)*)

## Create, Design, and Document Projects with ease

Foolstack is an interactive software architechture design, and documentation software.

Foolstack allows you to import projects from Github (or simply create one on your own), giving you insights to project Languages, and technology stack breakdown, issues, commit history and much more.

Each project also contains documentation on API endpoints (if there are any), Database design, Frontend implementation and practices, and Backend services

The goal of the project is to design a software tool that allows developers of different backgrounds and experience levels organize their projects in a more intuitive fashion than plain text, and allow users to create boilerplate documentation for more complex projects (for example, documenting how to build a MERN stack application). The project interacts with Github and Bitbucket to allow users the flexibility of building documentation for existing projects, allowing for updates on raised PR's, issues, and commits for the project.

### Tech Stack

This project was built using **React, Grails, MongoDB, JavaScript, Groovy, Java, and HTML/CSS**.

***Frontend***
  * Built using **React** and **JavaScript**
  * Complex state management as well as API requests made through **Redux** and **Redux-Sagas**
  * Prelimenary designs planned out in **Figma**
  * Responsive design practices implemented to ensure a responsive and functional Mobile View of the web-app
  * Hosted on Netlify

***Backend***
  * Built using **Grails**, **Groovy**, and **Java**
  * Developed Grails services to interact with **Github** and **Bitbucket** API's
  * Application secured through **GORM Token authentication**, using **Spring Security**
  * Hosted on **Azure** through a Tomcat instance
  
***Database***
  * **MongoDB** used for data storage
  * Production database hosted on **Azure** with a **MongoDB Atlas** cluster
  
***All the source code for the frontend of the project can be found in foolstack-client/src, and all the backend functionality can be found in foolstack-server/grails-app with controllers in the /controllers directory, services (brains of each endpoint) in /services, domain classes (database mappings) in /domain***
