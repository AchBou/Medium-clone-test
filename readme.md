# Welcome to Medium-clone-hackaton!

Hi! Ceci est un archive applicatif concernant l'application Medium Clone. Elle met en oeuvre un stack technique de 3 chouches: Partie Frontend, Partie Backend pour Authentification et APIs.


# New version Highlights and Bug Fixing:
- Switching to full Express Backend
- Using Sequelize as ORM for Database communication
- Re-orgnizing frontend Architecture (See [Frontend project Architecture](#Frontend project Architecture))
- Adding correct routing for single articles

# Requirements

Pour installer l'application, les composants suivants doivent etre disponible sur votre environnement local / serveur:
 - GIT
 - Docker
 - Angular
 - NodeJS
 - MySql


## Installing
Dockerless:
 - Backend Node
	```
	npm install
	node app.js
	```
 - Front angular
	 ```
	 npm install
	 ng serve
	 ```

Docker:
Run the following command in the root of the project:
	```
    docker-compose up --build
	```

# Choix techniques

L'application a été realiser avec le stack technique suivant:


 - **Frontend**: Angular v11
	> Avec l'utilisation de libraires complementaires.
	> - Angular Material: Elements graphiques


- **BDD**: Mysql.


## Server-Side Rendering

L'application Frontend est disponible en rendu cote serveur et rendu cote client.


- **Pour un build SSR**: *( output dans le dossier dist/client )*
	- Serveur de test: `npm run serve`
	- Build final: `npm run buid`

- **Pour un build SSR**: *( output dans le dossier dist/server )*
	- Serveur de test: `npm run serve:ssr`
	- Build final: `npm run buid:ssr`

## Notable Functionalities:
   - Home Page land on a random article
   - Tags suggestions with autocomplete
   - Generated reference
   - Utility storage for server side rendering ( since LocalStorage does not exist on Server)

## Frontend project Architecture

```
📦src
 ┣ 📂app    
 ┃ ┣ 📂components     // Core REUSABLE (Therefore grouped) Components
 ┃ ┃ ┣ 📂article
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┗ 📂signup
 ┃ ┣ 📂models       // Interfaces for the entities
 ┃ ┣ 📂pages        // main pages loaded by the routing logic
 ┃ ┃ ┣ 📂auth-space
 ┃ ┃ ┗ 📂home
 ┃ ┣ 📂services  
 ┃ ┃ ┣ 📂api        // API calling services
 ┃ ┃ ┃ ┣ 📂articles
 ┃ ┃ ┣ 📂auth       // Authentification services
 ┃ ┃ ┣ 📂guards     // Guard blocking Unauthenticated routes
 ┃ ┃ ┃ ┗ 📂auth-guard     
 ┃ ┃ ┗ 📂utils                // utility services
 ┃ ┃ ┃ ┗ 📂localstorage       // A service to handle the SSR localstorage
 ┃ ┣ 📜app-routing.module.ts  // Routing module
 ┃ ┣ 📜app.component.css
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.spec.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜app.server.module.ts
 ┃ ┗ 📜material.module.ts   // Service grouping Angular Material Modules
 ┣ 📂assets
 ┣ 📂environments
 ┃ ┣ 📜environment.prod.ts
 ┃ ┗ 📜environment.ts        // Storing the api URI
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜main.server.ts      // SSR main entrypoint
 ┣ 📜main.ts             // Main entrypoint
 ┣ 📜polyfills.ts
 ┣ 📜styles.css
 ┗ 📜test.ts
```

## Backend project Architecture
```
📦MediumCloneAPI
 ┣ 📂bin                  // Server configuration and starting point
 ┃ ┗ 📜www
 ┣ 📂config               // (Archived for demo purposes and later to be saved/read from env variables)
 ┃ ┣ 📜auth.config.js     // Configuration regarding authentication
 ┃ ┗ 📜db.config.js       // Configuration regarding Sequelize
 ┣ 📂Controllers          // Controllers
 ┣ 📂DB
 ┃ ┗ 📜index.js           // DB config and instancing
 ┣ 📂middlewares          // Utility middlewares
 ┃ ┣ 📜authJWT.js                 // Auth guard
 ┃ ┣ 📜index.js
 ┃ ┗ 📜verifySignUp.js            // SignUp verification ( such as existing identifications)
 ┣ 📂models               // Sequelize Models
 ┣ 📂routes               // Endpoints mapping
 ┣ 📂services             // Contracts for the controllers
 ┣ 📜app.js               // Main application entrypoint
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

## Authors

* **BOUNANE ACHRAF** - *Test work* - [AchBou](https://github.com/AchBou)
