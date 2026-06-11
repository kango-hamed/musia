"""
MUSIA Tour Manager — Définition des états et transitions
Machine à états 7 états pour le robot guide de musée Famienkro
"""

from enum import Enum, auto


class TourState(Enum):
    """Les 7 états du système MUSIA."""
    VEILLE      = auto()   # Robot immobile WP0, caméra active, CPU minimal
    ACCUEIL     = auto()   # Visiteur détecté, pivot, message accueil
    TRAITEMENT  = auto()   # Requête envoyée VPS, attente réponse
    GUIDAGE     = auto()   # Nav2 actif, déplacement vers waypoint
    PRESENTATION= auto()   # Devant une œuvre, boucle Q&R active
    DEGRADE     = auto()   # Mode offline, réponses locales
    RETOUR      = auto()   # Fin visite, navigation WP0, retour VEILLE


# ---------------------------------------------------------------------------
# Table de transitions valides : (état_source) -> [états_cibles autorisés]
# ---------------------------------------------------------------------------
VALID_TRANSITIONS: dict[TourState, list[TourState]] = {
    TourState.VEILLE:       [TourState.ACCUEIL,
                             TourState.VEILLE],        # reset démo

    TourState.ACCUEIL:      [TourState.GUIDAGE,
                             TourState.TRAITEMENT,
                             TourState.VEILLE],

    TourState.TRAITEMENT:   [TourState.GUIDAGE,
                             TourState.PRESENTATION,
                             TourState.DEGRADE,        # timeout 2s
                             TourState.VEILLE],

    TourState.GUIDAGE:      [TourState.PRESENTATION,
                             TourState.TRAITEMENT,
                             TourState.DEGRADE,
                             TourState.RETOUR,
                             TourState.VEILLE],

    TourState.PRESENTATION: [TourState.TRAITEMENT,
                             TourState.GUIDAGE,
                             TourState.DEGRADE,
                             TourState.RETOUR,
                             TourState.VEILLE],

    TourState.DEGRADE:      [TourState.TRAITEMENT,    # réseau rétabli
                             TourState.GUIDAGE,
                             TourState.PRESENTATION,
                             TourState.RETOUR,
                             TourState.VEILLE],

    TourState.RETOUR:       [TourState.VEILLE],
}


def is_valid_transition(from_state: TourState, to_state: TourState) -> bool:
    """Vérifie si une transition est autorisée."""
    return to_state in VALID_TRANSITIONS.get(from_state, [])


def state_label(state: TourState) -> str:
    """Retourne le nom lisible de l'état pour les logs."""
    return state.name
