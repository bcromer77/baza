# travel_prismrag_engine.py

import math
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# ----------------------------
# 1. Haversine Distance
# ----------------------------
def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * 
math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    return R * c

def score_distance(creator_coords, venue_coords, max_distance=50):
    d = haversine_distance(*creator_coords, *venue_coords)
    return max(0, 1 - d / max_distance)

# ----------------------------
# 2. Cosine Similarity Score
# ----------------------------
def score_cosine(vec1, vec2):
    return float(cosine_similarity([vec1], [vec2])[0][0])

# ----------------------------
# 3. Language & Sentiment
# ----------------------------
def score_language(num_langs, total_langs):
    return num_langs / total_langs

def score_sentiment(match):
    return 1.0 if match else 0.5

# ----------------------------
# 4. Engagement & Revenue
# ----------------------------
def score_engagement_gbm(features):
    # Dummy model (replace with real one or call external microservice)
    weights = np.array([0.3, 0.2, 0.2, 0.15, 0.15])
    return float(np.dot(features, weights))

def score_revenue(budget, engagement_score, language_score):
    return budget * engagement_score * (1 + language_score)

# ----------------------------
# 5. TOPSIS Scoring
# ----------------------------
def topsis_rank(creators, weights):
    matrix = np.array([c['scores'] for c in creators])
    norm = matrix / np.sqrt((matrix ** 2).sum(axis=0))
    weighted = norm * weights
    ideal_best = weighted.max(axis=0)
    ideal_worst = weighted.min(axis=0)
    scores = []
    for i in range(len(creators)):
        d_best = np.linalg.norm(weighted[i] - ideal_best)
        d_worst = np.linalg.norm(weighted[i] - ideal_worst)
        s = d_worst / (d_best + d_worst)
        scores.append(s)
    for i, c in enumerate(creators):
        c['topsis_score'] = scores[i]
    return sorted(creators, key=lambda x: x['topsis_score'], reverse=True)

# ----------------------------
# Example Creator Processing
# ----------------------------
def process_creator(creator, opportunity):
    features = {
        'distance': score_distance(creator['coords'], 
opportunity['coords']),
        'location': 1.0 if creator['city'] == opportunity['city'] else 
0.5,
        'audience': score_cosine(creator['audience_vector'], 
opportunity['target_vector']),
        'engagement_time': 1.0 if creator['peak_hour'] in 
opportunity['event_hours'] else 0.5,
        'language': score_language(creator['lang_count'], 
opportunity['target_langs']),
        'topic': score_cosine(creator['topic_vector'], 
opportunity['topic_vector']),
        'sentiment': score_sentiment(creator['sentiment'] == 
opportunity['preferred_sentiment'])
    }
    gbm_features = [
        creator['engagement_rate'],
        creator['audience_overlap'],
        features['topic'],
        features['engagement_time'],
        features['language']
    ]
    engagement_score = score_engagement_gbm(gbm_features)
    revenue_score = score_revenue(opportunity['budget'], engagement_score, 
features['language']) / opportunity['max_revenue']
    scores = [
        features['distance'], features['location'], features['audience'],
        features['engagement_time'], revenue_score, features['language'],
        features['topic'], features['sentiment']
    ]
    return {
        'creator_id': creator['id'],
        'scores': scores,
        'details': creator
    }

