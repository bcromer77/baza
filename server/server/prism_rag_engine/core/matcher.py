# server/prism_rag_engine/matcher.py

from utils.scoring import (
    score_cosine, score_distance, score_language,
    score_sentiment, score_engagement_gbm, score_revenue, topsis_rank
)

def match_creator_to_opportunities(creator_profile, opportunities):
    matches = []

    for opportunity in opportunities:
        # 1. Geospatial Scores
        distance_score = score_distance(creator_profile['coords'], 
opportunity['coords'])
        location_score = 1.0 if creator_profile['city'] == 
opportunity['city'] else 0.5

        # 2. Global Language & Sentiment
        language_score = 
score_language(len(creator_profile['translated_languages']), 
opportunity['target_languages'])
        topic_score = score_cosine(creator_profile['topic_vector'], 
opportunity['topic_vector'])
        sentiment_score = score_sentiment(
            creator_profile['sentiment'] == 
opportunity['preferred_sentiment']
        )

        # 3. Audience Fit
        audience_score = score_cosine(creator_profile['audience_vector'], 
opportunity['target_audience_vector'])
        engagement_time_score = 1.0 if creator_profile['peak_time'] == 
opportunity['event_time'] else 0.5

        # 4. Revenue Potential
        engagement_features = [
            creator_profile['engagement_rate'],
            audience_score,
            topic_score,
            engagement_time_score,
            language_score
        ]
        engagement_score = score_engagement_gbm(engagement_features)
        revenue_score = score_revenue(opportunity['budget'], 
engagement_score, language_score)

        # Aggregate Scores
        score_vec = [
            distance_score, location_score, audience_score,
            engagement_time_score, revenue_score,
            language_score, topic_score, sentiment_score
        ]

        matches.append({
            'creator_id': creator_profile['id'],
            'opportunity_id': opportunity['id'],
            'scores': score_vec
        })

    # Apply TOPSIS ranking
    weights = [0.2, 0.1, 0.15, 0.1, 0.15, 0.15, 0.1, 0.05]
    ranked = topsis_rank(matches, weights)
    return ranked

