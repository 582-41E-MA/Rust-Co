GIT HUB : https://github.com/TurtleTipper78/Rust-Co

Note Secrétariat

Rust & Co est un site de vente de véhicules d'occasion. L'équipe utilise une méthode de développement itératif.

Voici les membres de notre équipe:

Paul Dawson
Gabriel Plouffe
Fabien Turgeon

------------------------------------------------
------------------------------------------------

Ètape 1: Établir les taches

Backend: 
	Modelisation de la DB
	Création de l'API
	Intégration Firebase(JSON)
	Publication Render

Front-end:
	Crétion de l'app React.Js 
	Organisation des components
	Intégration du Design

Design:
	Création de la Maquette Graphique

Secrétariat:
		Gestion du Git 
		Préparation et suivie des sprints

------------------------------------------------
------------------------------------------------

Étape 2: Assigner les responsabilitées

Gestionnaire Git (Merge, Pull request)⤵				   Maquette Graphique
									    Fabien Turgeon ⤶
Gestion du projet(Gestion des sprints)⤴

BackEnd API-Node.Js⤵
				Gabriel Plouffe
Modelisation DB⤴ 

FrontEnd React.Js -> Paul Dawson


------------------------------------------------
------------------------------------------------

Étape 3: Sélection les technologies utilisés

FrontEnd: React.Js, HTML, CSS(Tailwind) et Possible Intégration Next.JS

BackEnd: Node.Js, Firebase, Render

Design: Figma 

Communication: Discord

Organisation/Sprint: Github, Figma


------------------------------------------------
------------------------------------------------

Étape 4: Définir les users story

Priorité (A)
A.1: En tant qu'utilisateur je veux consulter des vehicules
A.2: En tant qu'utilisateur je veux acheter des vehicules
A.3: En tant qu'utilisateur je veux reserver des vehicules
A.4: En tant qu'utilisateur je veux avoir un compte d'utilisateur

Priorité (B)
B.1: En tant qu'admin je veux publier des vehicules
B.2: En tant qu'admin je veux modifier des vehicules
B.3: En tant qu'admin je veux supprimer des vehicules
B.4: En tant qu'admin je veux supprimer des utilisateurs
B.5: En tant qu'utilisateur Je veux pouvoir choisir parmi une variété de méthodes de paiement.
B.5: En tant qu'utilisateur Je veux pouvoir choisir parmi une variété de méthodes de livraison.
B.6: En tant qu'utilisateur je veux une interface resposive
B.7: En tant qu'utilisateur et admin je veux un historique des achats
B.8: En tant qu'utilisateur et admin, je souhaite une interface intéractive et esthétique.
B.9: En tant qu'utilisateur et admin, je souhaite un site sécuritaire.

Priorité (C)
C.1: En tant qu'utilisateur je veux pouvoir demander un nouveau mot de passe
C.2: En tant qu'utilisateur je veux pouvoir sauvegarder des vehicules dans mon compte(wishlist)
C.3: En tant qu'admin je veux que le site utilise un framework react moderne(next.js)


------------------------------------------------
------------------------------------------------

Étape 5: Définir les sprints

-Sprint 0:
		Modelisation DB Relationnelle(WorkBench) - Gabriel (2h)
		Création du Discord channel - Gabriel (<1h)
		Création du Build React - Paul (1h)
		Note Secrétariat - Fabien (3h)
		Création du rep git - Fabien (<1h)
		Assignation Sprint 1 - Fabien (<1h)
		
-Sprint 1:

FrontEnd - Paul
			4 avril : 2h
			6 avril: 7h
			7 avril : 10h
			8 avril: 3h
			9 avril: 4h

		Créer le projet react
		Création des components: 
			Entête, 
			Accueil, 
			Liste de voitures, 
			À Propos, 
			Termes et conditions, 
			Politique de confidentialité, 
			Admin,
			Footer
		Création des routes
		Création des formulaires create-voiture et create-user
		Implémenter i18next (Internationalization)

BackEnd - Gabriel
		Finition DB (<1h)
		Création mockVehicule.JSON/mockUser.JSON (1h)
		Création de la structure de l'API (<2h)
		Création de la db sur Firebase (2h)
		Implémenter sur Render - (<1h)

Design - Fabien
		Moodboard (3h)
		Logo (2h)
		Icon (1h)
		Typographie (2h)
		Couleur (2h)
		Maquette (1h)

Github - Fabien
		Création des tâches (1h)
		Assignation des sprints (2h)
		Assignation des tâches (2h)

-Sprint 2:

FrontEnd - Paul
		Admin CRM: Employé(e)s, Voitures et clients(Create, Show, Edit, Delete)
		Employé(e)s CRM: Voitures et clients(Show, Edit, Delete)
		Intégration du Design
		Gestion des messages d'erreur(Validation)
		Authentification des routes
		Login
		Systeme d'ajout image
		Création Panier 
		Création Checkout

BackEnd - Gabriel
		Ajout Employés et Clients dans la DB
		Assigner les privileges
		Authentification(JWT)
		Gestion des routes(Authentification)
		Middleware Auth
		Validation Login et connection avec React
		Création des tables Commande, Facturation et Reservation

Design - Fabien
		Maquette Graphique détaillée 
		Présentation Sprint 2
		Création d'image de produit
		Custom burger
		Dossier logo compagnie

-Sprint 3:

FrontEnd 
		Animation
		Special Effects
		Modal Login, Panier, create account
		Carousel liens fitres
		Unit Testing (Fabien)
		Stripe Checkout(Fabien)

BackEnd
		

Design - Fabien
		Présentation Sprint 3


------------------------------------------------
------------------------------------------------

Étape 6: Présentation
