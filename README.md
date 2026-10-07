# myfirstsite

Sites en scroll construits avec le skill scroll-craft (moteur `scrollcraft.js` / `scrollcraft.css`).

| Site | Fichier | Contenu |
|---|---|---|
| **PROPAGATE** | `scrollcraft/builds/propagate/index.html` | Le t-shirt PROPAGATE, construit à partir des deux vidéos fournies. Brief, plan et vérifications dans `BRIEF.md` à côté. |
| **Nitsy Fashion** | `scrollcraft/builds/nitsy/index.html` | Salon de coiffure, style premium, tresse dessinée en code. Formulaire de contact à brancher. |
| **Nitsy Fashion, le film** | `scrollcraft/builds/nitsy-film/index.html` | Version « film continu » avec les photos envoyées (à remplacer par celles du salon). |
| ALBA | `index.html` | Exemple inventé (canette de café protéiné). |
| Maison Jeudy | `maison.html` | Exemple inventé (boutique d'objets). |

## Voir un site en local

Les vidéos sont chargées par `fetch`, donc il faut un petit serveur, pas un double-clic :

```bash
cd scrollcraft/builds/propagate
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## PROPAGATE : à compléter

- **Achat :** coller l'adresse de la page produit de la boutique dans `CHECKOUT_URL`, en haut de la partie « your turn » de `scrollcraft/builds/propagate/propagate.js`. La couleur et la taille choisies y sont ajoutées (`?print=blue&size=L`). Tant que c'est vide, le bouton affiche « Checkout is not connected yet ».
- **Tailles :** S à XXL sont des valeurs provisoires, à ajuster dans `index.html`.
- **Prix, matière, grammage :** non indiqués, car inconnus.
