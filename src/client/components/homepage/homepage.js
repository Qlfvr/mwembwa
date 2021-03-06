import React from "react";
import {Link} from "react-router-dom";
import "./homepage.scss";

const Homepage = () => (
    <div className={"container"}>
        <div className={"homepage"}>
            <div className={"responsiveHP"}>
                <div className={"head"}>
                    <h1> {"Mwenbwa"} </h1>
                    <Link to={"/sign-in-up"}>
                        <button className={"btn"} type={"button"}>
                            {" Sign In / Sign Up"}
                        </button>
                    </Link>
                    <div className={"foot"}> {"@ Team Estermont 2020"} </div>
                </div>
                <div className={"line"} />
                <div className={"rules"}>
                    <h3> {"Règles du jeu"} </h3>
                    <p> {"Créé ton profil et choisis une couleur."} </p>
                    <p>
                        {
                            "Achète des arbres pour te faire un max de feuilles! Achètes des arbres avec tes nouvelles feuilles. Tu en auras des gratuits, des payants et d'autres vérouillés par d'autres joueurs."
                        }
                    </p>
                    <p>
                        {
                            "Mais attention! Toutes les 15' tu recevras une quantité de feuilles égale au total de chacun de tes arbres et toutes les heures, tu perdras la moitié de tes feuilles!"
                        }
                    </p>
                    <p>
                        {
                            "N'hésites pas à consulter le classement pour voir la progression des autres joueurs... ainsi que le Gamelog qui te permettras de consulter toutes les actions du jeu."
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Homepage;
