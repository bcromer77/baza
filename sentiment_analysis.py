from transformers import pipeline

# Load pre-trained sentiment-analysis model
classifier = pipeline("sentiment-analysis")

# Example sentence
result = classifier("I love creating content about fashion!")
print(result)

