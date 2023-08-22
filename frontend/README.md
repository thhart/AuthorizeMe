This is a rather simple Angular/Spring testbed application with following features:

<ul>
<li>Spring Boot</li>
<li>Spring JPA / Repository</li>
<li>JWT</li>
<li>Role based access control RBAC</li>
<li>Spring Method security</li>
<li>Angular Drap and Drop</li>
<li>Angular Path/Role based authorization checking</li>
</ul>

# Install

<ul>
<li>Checkout this repo</li>
<li>Install npm and run npm install</li>
<li>Import project to whatever IDE</li>
</ul>

# Resources

Thanks to following persons/resources as unordered list which helped me to build this project:

<li>Imesha Sudasingha - <a href="https://medium.com/geekculture/role-based-access-control-rbac-with-spring-boot-and-jwt-bc20a8c51c15">Role Based Access Control (RBAC) with Spring Boot and JWT</a></li>
<li>Sergio Lema - <a href="https://github.com/serlesen/fullstack-jwt">Secure Your Fullstack Angular - Spring Boot Application With the JWT Authentication</a></li>
<li>Dan Vega - <a href="https://www.youtube.com/watch?v=KYNR5js2cXE&t=66s">Spring Security JWT: How to secure your Spring Boot REST APIs with JSON Web Tokens</a></li>

# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.x.x.
Angular Frontend connected to a Spring Boot backend.

## Components

### App Component

Main wrapper component. It has no logic inside. It just places the Header and the AppContent.

## Authentication

The authentication used is JWT. First, the user must login in the backend with a username and password.
If the credentials are correct, a JWT will be returned.
The JWT will be stored in the localstorage for further usage.
When available the JWT will be sent in the Authorization Header for each request made with axios.

# Backend

The backend service is a Spring Boot application with JWT authentication. Further there is a role based access control
(RBAC) implemented which might be easily adopted to other role based mechanism. Roles/Permissions have to be hard coded
by nature here since the services are tight to specific roles.

# Disclaimer

Spring and Angular are highly dynamic frameworks. This project is based on technology of year 2023. This project is just
a
showcase and not a production ready application. Further there is no guarantee of correctness or completeness of the
code.
Use it at your own risk. Please feel to complain about major misconceptions I am more than happy to learn from it.
 
# Rants

Spring HATEOAS is a mess and extremely complicated, the binding and or support to any concept MVC is not existing
