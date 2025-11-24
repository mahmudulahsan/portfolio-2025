/**
 * Research & Publications
 * 
 * Add your research work, publications, and academic projects here.
 * These will be displayed in the "My Profile" window.
 * 
 * Each research item should include:
 * - title: Publication type and venue (e.g., "Conference Paper | ICML 2024")
 * - subtitle: Research title
 * - description: Brief description of the research
 */

export interface Research {
  title: string;
  subtitle: string;
  description: string;
}

export const researchItems: Research[] = [
  {
    title: "Conference Paper | NCIM 2025",
    subtitle: "A Lightweight Framework for Facial Emotion Recognition",
    description: "Developed a multimodal deep learning model for facial expression recognition, improving accuracy on challenging emotions with up to 94% accuracy."
  },
  {
    title: "Undergraduate Thesis",
    subtitle: "Optimizing Intrusion Detection in Banking Networks",
    description: "Built ML models for anomaly detection and implemented SHAP-based Explainable AI techniques for transparency in threat detection."
  }
];
