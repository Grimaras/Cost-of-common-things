import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {goToObjective} from "../redux/reducer";
import {HTTPClient} from "../http/Client";
import {GameResultGraph} from "../Game/GameResultGraph";

export const Welcome = () => {
    const dispatch = useDispatch();
    const goToObjectiveScreen = () => dispatch(goToObjective());

    // Retry to fetch questions on boot
    useEffect(() => {
        HTTPClient.GET("").then(console.log);
    }, []);

    return (
        <section className="hero is-medium is-primary is-bold is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Construire un Téléphone
                    </h1>
                    <h2 className="subtitle">
                        <button className="button is-success" onClick={goToObjectiveScreen}>
                            Démarrer le jeu
                        </button>
                    </h2>
                        <hr />
                        <div className="columns">
                            <div className="column">
                                <h1 className="title"> Construisez un téléphone</h1>
                                Un téléphone est composé de nombreux composants comme la batterie, l'écran et le processeur
                                A chaque etape, choissez le composant qui correspond le mieux au téléphone que vous devez construire !
                            </div>
                            <div className="column">
                                <h1 className="title"> Soyez Rapides</h1>
                                Chaque seconde que vous passez à choisir vos composants augmente le budget de Recherche et Développement
                            </div>
                             <div className="column">
                                <h1 className="title"> Entrée ou haut de gamme</h1>
                                 Dimensionner correctement son téléphone est important. Construirez vous un téléphone d'éntrée de gamme qui doit
                                 se vendre beaucoup afin de rencontrer du succes ou alors un téléphone haut de gamme qui compte sur un marche de niche?
                            </div>
                            <div className="column">
                                <h1 className="title"> Faites le bon choix</h1>
                                Certains composants sont incompatibles avec les autres. Restez cohérents, vous ne pourrez pas par exemple choisir
                                un écran xxl dans une toute petite coque.
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
};
