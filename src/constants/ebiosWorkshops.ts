import { Shield, Target, GitBranch, AlertTriangle, BarChart2 } from 'lucide-react';

export const EBIOS_WORKSHOPS = [
  {
    id: 1,
    title: 'Atelier 1: Socle de sécurité',
    description: 'Cadrage et identification du socle de sécurité',
    icon: Shield,
    steps: [
      'Identification des valeurs métier et parties prenantes',
      'Définition des critères de sécurité',
      'Évaluation des besoins de sécurité',
      'Détermination du périmètre et des hypothèses',
      'Identification des biens supports essentiels',
    ],
  },
  {
    id: 2,
    title: 'Atelier 2: Sources de risque',
    description: 'Identification des sources de risque et objectifs visés',
    icon: Target,
    steps: [
      'Identification des sources de risque pertinentes',
      'Caractérisation (motivation, ressources, etc.)',
      'Définition des objectifs visés',
      'Évaluation des couples sources-objectifs',
    ],
  },
  {
    id: 3,
    title: 'Atelier 3: Scénarios stratégiques',
    description: 'Élaboration des scénarios stratégiques',
    icon: GitBranch,
    steps: [
      'Construction des scénarios stratégiques',
      'Association aux sources de risque',
      'Évaluation de la gravité (impact métier)',
      'Évaluation et justification de la vraisemblance',
    ],
  },
  {
    id: 4,
    title: 'Atelier 4: Scénarios opérationnels',
    description: 'Construction des scénarios opérationnels',
    icon: AlertTriangle,
    steps: [
      'Décomposition des scénarios stratégiques',
      'Identification des mesures existantes',
      'Évaluation de la vraisemblance technique',
      'Synthèse et cartographie des risques',
    ],
  },
  {
    id: 5,
    title: 'Atelier 5: Traitement du risque',
    description: 'Définition de la stratégie de traitement',
    icon: BarChart2,
    steps: [
      'Choix des options de traitement',
      'Définition des mesures de sécurité',
      'Évaluation des risques résiduels',
      'Plan d\'amélioration continue',
      'Cadre de suivi des risques',
    ],
  },
] as const;