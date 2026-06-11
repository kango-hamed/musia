"""
Tests unitaires — Machine à états MUSIA Tour Manager
Lance avec : pytest test/test_states.py -v
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from musia_tour_manager.states import TourState, is_valid_transition


# ==========================================================================
# Tests de transitions (repris + complétés)
# ==========================================================================

class TestTransitions:

    def test_veille_to_accueil(self):
        assert is_valid_transition(TourState.VEILLE, TourState.ACCUEIL)

    def test_veille_reset(self):
        assert is_valid_transition(TourState.VEILLE, TourState.VEILLE)

    def test_veille_cannot_go_to_guidage_directly(self):
        assert not is_valid_transition(TourState.VEILLE, TourState.GUIDAGE)

    def test_traitement_timeout_to_degrade(self):
        assert is_valid_transition(TourState.TRAITEMENT, TourState.DEGRADE)

    def test_tout_etat_vers_veille(self):
        """Tout état peut revenir à VEILLE (reset démo)."""
        for state in TourState:
            assert is_valid_transition(state, TourState.VEILLE), \
                f"Transition {state.name} → VEILLE devrait être valide"

    def test_retour_only_to_veille(self):
        """Depuis RETOUR, seul VEILLE est possible."""
        for state in TourState:
            if state == TourState.VEILLE:
                assert is_valid_transition(TourState.RETOUR, state)
            else:
                assert not is_valid_transition(TourState.RETOUR, state), \
                    f"RETOUR → {state.name} devrait être invalide"

    def test_degrade_can_recover(self):
        """Depuis DÉGRADÉ, on peut reprendre la visite."""
        assert is_valid_transition(TourState.DEGRADE, TourState.TRAITEMENT)
        assert is_valid_transition(TourState.DEGRADE, TourState.PRESENTATION)
        assert is_valid_transition(TourState.DEGRADE, TourState.GUIDAGE)

    def test_presentation_to_traitement(self):
        """Question visiteur → envoi VPS."""
        assert is_valid_transition(TourState.PRESENTATION, TourState.TRAITEMENT)

    def test_guidage_to_presentation(self):
        """Arrivée au waypoint → présentation."""
        assert is_valid_transition(TourState.GUIDAGE, TourState.PRESENTATION)


# ==========================================================================
# Tests des parcours complets (scénarios)
# ==========================================================================

class TestScenarios:

    def _walk(self, path: list) -> bool:
        """Vérifie qu'un chemin d'états est entièrement valide."""
        for a, b in zip(path, path[1:]):
            if not is_valid_transition(a, b):
                return False
        return True

    def test_parcours_nominal(self):
        """Scénario nominal complet : VEILLE → visite → RETOUR → VEILLE."""
        path = [
            TourState.VEILLE,
            TourState.ACCUEIL,
            TourState.GUIDAGE,
            TourState.PRESENTATION,
            TourState.TRAITEMENT,
            TourState.PRESENTATION,
            TourState.GUIDAGE,
            TourState.PRESENTATION,
            TourState.RETOUR,
            TourState.VEILLE,
        ]
        assert self._walk(path), "Le parcours nominal doit être entièrement valide"

    def test_parcours_degrade_et_recovery(self):
        """VPS coupe pendant la présentation → mode dégradé → reprise."""
        path = [
            TourState.VEILLE,
            TourState.ACCUEIL,
            TourState.GUIDAGE,
            TourState.PRESENTATION,
            TourState.TRAITEMENT,
            TourState.DEGRADE,
            TourState.PRESENTATION,
            TourState.RETOUR,
            TourState.VEILLE,
        ]
        assert self._walk(path)

    def test_reset_demo_depuis_nimporte_quel_etat(self):
        """Un opérateur peut reset en VEILLE depuis n'importe où."""
        for state in TourState:
            assert is_valid_transition(state, TourState.VEILLE), \
                f"Reset impossible depuis {state.name}"

    def test_fin_de_visite_directe(self):
        """VPS envoie END_TOUR depuis GUIDAGE → RETOUR direct."""
        assert is_valid_transition(TourState.GUIDAGE, TourState.RETOUR)

    def test_accueil_to_traitement(self):
        """Question posée dès l'accueil (avant départ)."""
        assert is_valid_transition(TourState.ACCUEIL, TourState.TRAITEMENT)


# ==========================================================================
# Tests de robustesse
# ==========================================================================

class TestRobustesse:

    def test_pas_de_transition_inconnue(self):
        """Toutes les transitions de la table pointent vers des états valides."""
        from musia_tour_manager.states import VALID_TRANSITIONS
        for src, targets in VALID_TRANSITIONS.items():
            assert isinstance(src, TourState)
            for t in targets:
                assert isinstance(t, TourState), \
                    f"Cible invalide dans VALID_TRANSITIONS[{src.name}]"

    def test_tous_les_etats_ont_une_entree(self):
        """Chaque état est atteignable depuis au moins un autre état."""
        from musia_tour_manager.states import VALID_TRANSITIONS
        reachable = set()
        for targets in VALID_TRANSITIONS.values():
            reachable.update(targets)
        for state in TourState:
            assert state in reachable, \
                f"L'état {state.name} n'est atteignable depuis aucun autre état"

    def test_tous_les_etats_ont_une_sortie(self):
        """Chaque état a au moins une transition sortante (pas de deadlock)."""
        from musia_tour_manager.states import VALID_TRANSITIONS
        for state in TourState:
            assert state in VALID_TRANSITIONS, \
                f"L'état {state.name} n'a pas de transitions définies"
            assert len(VALID_TRANSITIONS[state]) > 0, \
                f"L'état {state.name} est un deadlock (aucune sortie)"

    def test_transition_vers_etat_identique(self):
        """Seul VEILLE accepte une auto-transition (reset démo)."""
        for state in TourState:
            result = is_valid_transition(state, state)
            if state == TourState.VEILLE:
                assert result, "VEILLE → VEILLE doit être valide (reset)"
            else:
                assert not result, \
                    f"{state.name} → {state.name} ne devrait pas être valide"
