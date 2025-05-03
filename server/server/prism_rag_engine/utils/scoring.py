# server/prism_rag_engine/utils/scoring.py

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from math import radians, sin, cos, sqrt, atan2

def score_cosine(vec1, vec2):
    return float(cosine_similarity([vec1], [vec2])[0][0])

def score_language(lang_count, target_langs):
    if not target_langs:
        return 0.0
    return min(lang_count / len(target_langs), 1.0)

def score_sentiment(match):
    return 1.0 if match else 0.5

def score_engagement_gbm(features):
    # Placeholder gradient boosting model (replace with real model 
prediction)
    return np.clip(np.mean(features), 0, 1)

def score_revenue(budget, engagement_score, lang_score):
    return budget * engagement_score * (1 + lang_score)

def haversine_distance(coord1, coord2):
    R = 6371  # Earth radius in kilometers
    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def score_distance(coord1, coord2, max_distance=50):
    dist = haversine_distance(coord1, coord2)
    return max(0.0, 1 - dist / max_distance)

def topsis_rank(creator_scores, weights):
    scores_matrix = np.array([entry['scores'] for entry in 
creator_scores])
    norm_matrix = scores_matrix / np.sqrt((scores_matrix ** 
2).sum(axis=0))
    weighted = norm_matrix * weights

    ideal = np.max(weighted, axis=0)
    nadir = np.min(weighted, axis=0)

    dist_to_ideal = np.linalg.norm(weighted - ideal, axis=1)
    dist_to_nadir = np.linalg.norm(weighted - nadir, axis=1)

    rankings = dist_to_nadir / (dist_to_ideal + dist_to_nadir)

    for i, entry in enumerate(creator_scores):
        entry['topsis_score'] = rankings[i]

    return sorted(creator_scores, key=lambda x: x['topsis_score'], 
reverse=True)

