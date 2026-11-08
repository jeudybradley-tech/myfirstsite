# Golden JB · brief

**Partly interviewed.** The owner answered the questions below (in the chat, 8 November 2026). Everything marked
*Décidé par Claude* was not asked and was decided while building; change it freely.

## Ce que la propriétaire a dit (réponses données)

- **Marque :** Golden JB.
- **Produits :** deux bracelets, d'après les cinq photos envoyées (`site pour bijoux.zip`) :
  - N° 1 **Maille ovale** : chaîne à mailles ovales (3 photos carrées, au café).
  - N° 2 **Trèfle noir** : trèfles noirs à quatre feuilles (2 photos en hauteur).
- **Matière :** acier inoxydable. **Prix :** « 20 », compris comme 20 $ par bracelet.
- **Style :** « Sombre et luxe ».
- **Typographie :** « utilise la même typographique que le site TIMELESS » : Inter Tight fine en capitales
  et Cormorant Garamond italique, hébergées dans `assets/fonts/`.
- **Langue :** « Français et anglais » : bouton FR / EN, français par défaut, choix retenu.
- **Commande :** « Les deux » : un bon de commande et des boutons vers les réseaux.
- **Réseaux :** « Plus tard » : Instagram et WhatsApp prévus, cachés tant qu'ils sont vides.
- **Page d'accueil :** « ils faut avoir une page d'accueil », précisé : « Écran d'ouverture » comme TIMELESS,
  phrase proposée par Claude : « Porté chaque jour, gardé pour toujours. » / « Worn every day, kept for good. »
- **Accueil :** « fait le homepage comme la deuxième photo en utilisant le style et modèle finale intégre la
  première photo comme fond d'écran » : une section d'accueil d'après sa référence (photo plein écran à droite,
  titre à gauche, bouton doré, menu avec Accueil et un sac). Le compteur de diapositives « 01 / 04 » de la
  référence n'a pas été repris : il n'y a qu'une photo. Cette section passe avant le N° 1, ce qui s'écarte de la
  grammaire galerie (où le N° 1 ouvre la page) : choix de la cliente. Le N° 1 a été inversé (photo à gauche).
- **Chaîne suspendue :** retirée à la demande de la cliente (« enlever », avec une capture de la chaîne).
  Le geste signature qui reste est la loupe du N° 2.
- **Nouveaux produits (5 photos de plus) :** « Nouveaux produits » et « Galerie Portés », 20 $ chacun,
  jonc « Un produit, 2 teintes », trèfle blanc « Produit séparé ». N° 3 Jonc serti (deux photos qui s'ouvrent
  en volets opposés, étiquette au milieu) et N° 4 Trèfle blanc (photo qui glisse dans un cadre), avant la
  galerie, qui passe à six éléments (4,2 écrans).
- **Origine du modèle trèfle :** « Je ne sais pas ». Voir la remarque plus bas.

## Décidé par Claude

- **Grammaire : galerie / catalogue.** Le vrai sujet du visiteur, c'est « qu'est-ce qu'il y a », pas
  « dois-je vous croire » : deux objets, chacun avec la même étiquette (N°, nom, matière, teinte, prix).
  Les autres grammaires ont perdu : filmique (déjà cinq fois dans ce dépôt), chapitré (pas de texte long),
  surface vivante (pas un logiciel), monde continu (pas de vidéo), affiche typo (déjà `nitsy`),
  écran partagé (pas de comparaison), cutlist rythmé (le contraire du luxe calme), tourne-objet
  (déjà `propagate`, et pas de vues tournantes du bijou).
- **Parcours :**
  1. Reconnaissance : le N° 1 est déjà là, étiqueté, au soleil d'un café.
  2. Proximité : le même bracelet, porté autrement, s'ouvre en volet.
  3. Silence : un seul « N° 2 » dans le noir.
  4. Le pic : la loupe recule, du trèfle au plus près jusqu'à l'homme entier.
  5. Choix : les deux pièces portées, en marchant de côté.
  6. Engagement : le bon de commande, composé comme une étiquette.
- **Courbe des sensations :**
  | Acte | Sensation | Ce qui la cause |
  |---|---|---|
  | 1 Héros | chaleur, envie | lumière du matin, la chaîne qui se balance devant la photo |
  | 2 Porté | intimité | un volet qui s'ouvre sur une main posée sur un carnet |
  | 3 Silence | attente | presque rien à l'écran (silence voulu, pas un trou) |
  | 4 Loupe | émerveillement | on part des trèfles en très gros plan et on recule jusqu'à l'homme |
  | 5 Portés | aisance | la salle glisse de côté, deux poignets, deux lumières |
  | 6 Commande | décision calme | un bon sobre, total en direct, rien de forcé |
- **Le pic :** « Tu fais défiler et ça part du trèfle en gros plan, puis ça recule jusqu'à l'homme. »
  Acte 4, la plus grande portion du défilement (2,6 écrans).
- **La phrase :** « C'est le site où une chaîne d'argent pend à côté des bijoux et se balance quand tu
  fais défiler. »
- **Geste signature : la chaîne suspendue.** Une chaîne de mailles ovales en acier, simulée (physique
  verlet), pend sous le menu à droite avec une petite plaque dorée « JB ». La vitesse du défilement la
  fait balancer, la souris la pousse, elle se calme toute seule. Elle s'efface avant la galerie de
  côté et le bon de commande (sur téléphone, elle reste dans l'accueil seulement).
- **Partition :**
  | Acte | Dispositif | Pourquoi |
  |---|---|---|
  | 1 N° 1 | `flow` + `parallax` (photo, reflets, chaîne au premier plan) | l'objet un, déjà en vue |
  | 2 Porté | `reveal` (volet vers le haut) | un changement d'état |
  | 3 N° 2 | `flow` + `in` | le silence avant le pic |
  | 4 Loupe | `pin` 2,6 + recul piloté par `--sc-p` (clip-path + transform) | le pic |
  | 5 Portés | `pan` | l'éventail, de côté |
  | 6 Commande | `flow`, formulaire | la fin, qui tient |

## Ancrage des plans (héros)

Photo (recule, parallaxe −1,2), étiquette (1x), reflets (0,9), chaîne (fixe, au premier plan). Il n'y a pas
de détourage de la personne : les photos n'ont pas de transparence et aucun outil de détourage n'a été
utilisé. La profondeur vient de la chaîne réelle devant la photo et du décalage photo/étiquette.

## Remarque sur le bracelet trèfle

Le modèle à trèfles noirs à quatre feuilles ressemble beaucoup à un dessin connu et protégé d'une grande
maison de joaillerie. Le site ne cite aucune marque et l'appelle seulement « Trèfle noir ». Avant de vendre,
vérifier auprès du fournisseur que ce n'est pas une copie.

## Vérifications faites (8 novembre 2026)

- Captures à 13 positions, ordinateur 1440×900 et téléphone 390×844 : l'accueil, le volet, le silence,
  le recul de la loupe à 0,2 / 0,45 / 0,75 / 1,0, la galerie et le bon de commande. Pas de défilement
  horizontal, pas d'erreur dans la console.
- Galerie de côté : débord de 648 px sur ordinateur et de 885 px sur téléphone (elle avance vraiment).
- FR / EN : textes, titres, textes alternatifs et étiquettes d'accessibilité changent ; le choix est retenu
  au rechargement.
- Bon de commande : « Commander » sous le N° 2 ajoute un trèfle (total 20 $) ; message si le nom ou le
  courriel manque ; tant que `ORDER_ENDPOINT` est vide : « Les commandes ne sont pas encore branchées,
  donc rien n'a été envoyé. »
- Clavier : la tabulation passe par la marque, l'index, FR/EN, puis les liens de la page.
- Mouvement réduit : la loupe est directement à sa position finale, la chaîne pend immobile.
- **Pas vérifié :** un vrai téléphone (iPhone, Android) ; l'envoi réel d'une commande (pas d'adresse).
