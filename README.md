# GitHub Repository: [Rust-Co](https://github.com/TurtleTipper78/Rust-Co)

## README

Rust & Co is a website for selling used vehicles. The team uses an iterative development method.

### Team Members:

- Paul Dawson
- Gabriel Plouffe
- Fabien Turgeon

---

## Étape 1: Établir les tâches

### Backend:
- Modélisation de la DB
- Création de l'API
- Intégration Firebase(JSON)
- Publication Render

### Front-end:
- Création de l'app React.Js
- Organisation des composants
- Intégration du design

### Design:
- Création de la Maquette Graphique

### Secrétariat:
- Gestion du Git
- Préparation et suivi des sprints

---

## Étape 2: Assigner les responsabilités

### Fabien Turgeon:
- Gestionnaire Git (Merge, Pull request)
- Maquette Graphique
- Gestion du projet (Gestion des sprints)

### Gabriel Plouffe:
- Backend API-Node.Js
- Modélisation DB

### Paul Dawson:
- Frontend React.Js

---

## Étape 3: Sélection des technologies utilisées

- **Frontend:** React.Js, HTML, CSS (Tailwind) et Possible Intégration Next.JS
- **Backend:** Node.Js, Firebase, Render
- **Design:** Figma
- **Communication:** Discord
- **Organisation/Sprint:** GitHub, Markdown

---

## Étape 4: Définir les user stories

### Priorité (A)
- En tant qu'utilisateur je veux consulter des véhicules
- En tant qu'utilisateur je veux acheter des véhicules
- En tant qu'utilisateur je veux réserver des véhicules
- En tant qu'utilisateur je veux avoir un compte d'utilisateur

### Priorité (B)
- En tant qu'admin je veux publier des véhicules
- En tant qu'admin je veux modifier des véhicules
- En tant qu'admin je veux supprimer des véhicules
- En tant qu'admin je veux modifier des utilisateurs
- En tant qu'admin je veux supprimer des utilisateurs
- En tant qu'employé je veux publier des véhicules
- En tant qu'employé je veux modifier des véhicules
- En tant qu'employé je veux supprimer des véhicules
- En tant qu'utilisateur je veux pouvoir choisir parmi une variété de méthodes de paiement
- En tant qu'utilisateur je veux pouvoir choisir parmi une variété de méthodes de livraison
- En tant qu'utilisateur je veux une interface responsive
- En tant qu'utilisateur et admin je veux un historique des achats
- En tant qu'utilisateur et admin, je souhaite une interface interactive et esthétique
- En tant qu'utilisateur et admin, je souhaite un site sécuritaire

### Priorité (C)
- En tant qu'utilisateur je veux pouvoir demander un nouveau mot de passe
- En tant qu'utilisateur je veux pouvoir sauvegarder des véhicules dans mon compte (wishlist)
- En tant qu'admin je veux que le site utilise un framework react moderne (next.js)

---

## Étape 5: Définir les sprints

### Sprint 0:
- Modelisation DB Relationnelle (WorkBench) - Gabriel (2h)
- Création du Discord channel - Gabriel (<1h)
- Création du Build React - Paul (1h)
- Note Secrétariat - Fabien (3h)
- Création du repo git - Fabien (<1h)
- Assignation Sprint 1 - Fabien (<1h)

### Sprint 1:

#### FrontEnd - Paul
- 4 avril : 2h
- 6 avril: 7h
- 7 avril : 10h
- 8 avril: 3h
- 9 avril: 4h

- Créer le projet react
- Création des composants:
- Entête
- Accueil
- Liste de voitures
- À Propos
- Termes et conditions
- Politique de confidentialité
- Admin
- Footer
- Création des routes
- Création des formulaires create-voiture et create-user
- Implémenter i18next (Internationalization)

#### BackEnd - Gabriel
- Finition DB (<1h)
- Création mockVehicule.JSON/mockUser.JSON (1h)
- Création de la structure de l'API (<2h)
- Création de la DB sur Firebase (2h)
- Implémenter sur Render - (<1h)

#### Design - Fabien
- Moodboard (3h)
- Logo (2h)
- Icon (1h)
- Typographie (2h)
- Couleur (2h)
- Maquette (1h)

#### GitHub - Fabien
- Création des tâches (1h)
- Assignation des sprints (2h)
- Assignation des tâches (2h)

### Sprint 2:

#### FrontEnd - Paul
- Admin CRM: Employé(e)s, Voitures et clients(Create, Show, Edit, Delete)
- Employé(e)s CRM: Voitures et clients(Show, Edit, Delete)
- Intégration du Design
- Gestion des messages d'erreur(Validation)
- Authentification des routes
- Login
- Logout
- Système d'ajout image
- Création Panier
- Création Checkout

#### BackEnd - Gabriel
- Ajout Employés et Clients dans la DB
- Assigner les privilèges
- Authentification(JWT)
- Gestion des routes(Authentification)
- Middleware Auth
- Validation Login et connection avec React
- Création des tables Commande, Facturation et Réservation

#### Design - Fabien
- Maquette Graphique détaillée (10h)
- Création d'image de produit (1h)
- Custom burger (1h)
- Scrum (2h)

### Sprint 3:

#### Paul
- Commande/Reservation/Panier
- Forms
- Modal Login, Panier
- Intégration CSS Final
- Responsive Final
- Animation/Special effect

#### Gabriel
- Commande/Facture/Panier
- Création des produits finaux
- Validation des champs form
- Upload Image
- Type Voitures

#### Fabien
- Carousel (liens fitres?) 
- Unit Testing(?)
- Stripe Checkout
- Traduction
- Upload icons
- Format Media

---

## Étape 6: Présentation

- Fabien
    - Présentation de l'équipe
    - Technologie utilisé
    - Maquette Graphique et concept
    - Observation Global

- Paul
    - Présentation des pages
    - Traduction
    - Login
    - Cool btn bro
    - CRM

- Gabriel
    - Fonction accomplie
    - Technologie (NoSQL, NodeJs)
    - Défis
    - Commentaire

- Paul
    - Défis 
    - commentaire

- Fabien 
    - Wrap-up
    - Période questions