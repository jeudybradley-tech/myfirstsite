# myfirstsite

Sites en scroll construits avec le skill scroll-craft (moteur `scrollcraft.js` / `scrollcraft.css`).

| Site | Fichier | Contenu |
|---|---|---|
| **TÉNÈBRE** | `scrollcraft/builds/tenebre/index.html` | Montre en édition de 88, construite à partir du clip fourni : hero en séquence d'images sur canvas, vue éclatée dessinée, anneau des 88 puis liste d'attente dans le même plan final. Brief, plan et vérifications dans `BRIEF.md` à côté. |
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
- **Clip 2 :** il n'a pas été fourni. Le gros plan est un recadrage du clip 1. Pour le remplacer, garder les mêmes noms : `assets/macro.mp4`, `macro-m.mp4`, `macro.webm`, `macro-m.webm`.
- **La vidéo montre une Rolex Datejust** (logo lisible sur le cadran, acier, 41 mm) et semble venir de Pinterest. Ça va pour une démo en local. Avant toute mise en ligne sous un autre nom, il faut vos propres images : la marque Rolex et les caractéristiques annoncées (42 mm, titane grade 5) ne vont pas ensemble.

## PROPAGATE : à compléter

- **Achat :** coller l'adresse de la page produit de la boutique dans `CHECKOUT_URL`, en haut de la partie « your turn » de `scrollcraft/builds/propagate/propagate.js`. La couleur et la taille choisies y sont ajoutées (`?print=blue&size=L`). Tant que c'est vide, le bouton affiche « Checkout is not connected yet ».
- **Tailles :** S à XXL sont des valeurs provisoires, à ajuster dans `index.html`.
- **Prix, matière, grammage :** non indiqués, car inconnus.
