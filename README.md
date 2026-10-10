# myfirstsite

Sites en scroll construits avec le skill scroll-craft (moteur `scrollcraft.js` / `scrollcraft.css`).

| Site | Fichier | Contenu |
|---|---|---|
| **TÉNÈBRE** | `scrollcraft/builds/tenebre/index.html` | Montre squelette en édition de 88, construite à partir de la vidéo fournie : à l'ouverture la montre est entière, le scroll la démonte puis la remonte ; ensuite les détails, le dessin éclaté avec les specs, l'anneau des 88 et la liste d'attente. Brief, plan et vérifications dans `BRIEF.md` à côté. |
| **PROPAGATE** | `scrollcraft/builds/propagate/index.html` | Le t-shirt PROPAGATE, construit à partir des deux vidéos fournies. Brief, plan et vérifications dans `BRIEF.md` à côté. |
| **Nitsy Fashion** | `scrollcraft/builds/nitsy/index.html` | Salon de coiffure, style premium, tresse dessinée en code. Formulaire de contact à brancher. |
| **Nitsy Fashion, le film** | `scrollcraft/builds/nitsy-film/index.html` | Version « film continu » avec les photos envoyées (à remplacer par celles du salon). |
| ALBA | `index.html` | Exemple inventé (canette de café protéiné). |
| Maison Jeudy | `maison.html` | Exemple inventé (boutique d'objets). |

## Voir un site en local

Les vidéos sont chargées par `fetch`, donc il faut un petit serveur, pas un double-clic :

```bash
cd scrollcraft/builds/tenebre      # ou scrollcraft/builds/propagate
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## TÉNÈBRE : à compléter

- **Liste d'attente :** coller l'adresse qui recevra les inscriptions dans `WAITLIST_ENDPOINT`, en haut de `scrollcraft/builds/tenebre/tenebre.js` (requête POST en JSON `{ name, email }`). Tant que c'est vide, le formulaire dit « The waitlist is not connected yet, so nothing was sent. » et n'envoie rien.
- **Nom :** « TÉNÈBRE » est un nom provisoire choisi pour le site. Il apparaît dans `index.html` (titre, `<h1>` lettre par lettre, logo du coin, pied de page).
- **Vidéo :** le site est fait entièrement à partir de `Watch_disassembles_and_reassembles_1080p_20261010143027.mp4`, la version sur fond noir (73 images fixes dans `assets/frames/`, détails et photo du dessin dans `assets/`). Seule la première image est chargée avec la page ; les autres suivent ensuite, une sur huit d'abord, et ne sont décodées que près de l'endroit où l'on se trouve dans la page. Les caractéristiques affichées (42 mm, titane grade 5) sont les vôtres ; la montre de la vidéo est dorée sur bracelet cuir, à vérifier avant publication.

## PROPAGATE : à compléter

- **Achat :** coller l'adresse de la page produit de la boutique dans `CHECKOUT_URL`, en haut de la partie « your turn » de `scrollcraft/builds/propagate/propagate.js`. La couleur et la taille choisies y sont ajoutées (`?print=blue&size=L`). Tant que c'est vide, le bouton affiche « Checkout is not connected yet ».
- **Tailles :** S à XXL sont des valeurs provisoires, à ajuster dans `index.html`.
- **Prix, matière, grammage :** non indiqués, car inconnus.
