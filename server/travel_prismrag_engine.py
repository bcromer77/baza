# travel_prismrag_engine.py

from utils.haversine import score_distance
from utils.scoring import (
    score_cosine, score_language, score_sentiment,
    score_engagement_gbm, score_revenue, topsis_rank
)

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

