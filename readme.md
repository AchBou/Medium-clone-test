# Welcome to Medium-clone-hackaton!

Hi! Ceci est un archive applicatif concernant l'application Medium Clone. Elle met en oeuvre un stack technique de 3 chouches: Partie Frontend, Partie Backend pour Authentification, et Partie Backend pour APIs.


# Requirements

Pour installer l'application, les composants suivants doivent etre disponible sur votre environnement local / serveur:
 - GIT
 - Docker
 - Angular
 - Serveur PHP ( Ngnix ou Apache )
 - NodeJS
 - MySql



## Installing
Dockerless:
 - Smart Auth
	```
	npm install
	node app.js
	```
 - Smart Doctorina:
	 ```
	 compose install
	php -S 127.0.0.1:8000 -t public
	 ```
 - Front angular
	 ```
	 npm install
	 ng serve
	 ```

Docker: **In progress**

# Choix techniques

L'application a ete realise avec le stack technique suivant:


 - **Frontend**: Angular v11
	> Avec l'utilisation de libraires complementaires.
	> - Angular Material: Elements graphiques



-  **Backend**: ExpressJS - Symofny 4
	> -Developement API base sur l'outil API Plateform.
	> -Utilisation de libraire de securite JWT et module Node native Crypto pour la securite.

- **BDD**: Mysql.


## Server-Side Rendering

L'application Frontend est disponible en rendu cote serveur et rendu cote client.


- **Pour un build SSR**: *( output dans le dossier dist/client )*
	- Serveur de test: `npm run serve`
	- Build final: `npm run buid`

- **Pour un build SSR**: *( output dans le dossier dist/server )*
	- Serveur de test: `npm run serve:ssr`
	- Build final: `npm run buid:ssr`


## Authors

* **BOUNANE ACHRAF** - *Test work* - [AchBou](https://github.com/AchBou)
