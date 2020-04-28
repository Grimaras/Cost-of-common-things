# Lancer le logiciel
## Lancement rapide tout en un
Cette solution permets de simuler sur un ordinateur l'ensemble de l'architecture qui devrait etre installe piece par piece.

Afin d'utiliser cette methode vous devez avoir Docker et Docker Compose d'installe

Lancez tout simplement cette commande a la racine du projet:
```html
docker-compose -f quickstart.yml up
```

Cette methode est la plus rapide car elle va lancer des version precompilees des applicatifs.

Apres quelques minutes de telechargement et une fois que les donees ont ete importes le jeu est pret a l'adresse de l'hote :81
(ex: http://localhost:81/ )

### Mettre a jour le lancement rapide
Afin de mettre a jour lancez cette commande:
```html
docker-compose -f quickstart.yml pull
```