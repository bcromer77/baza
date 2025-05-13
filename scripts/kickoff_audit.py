import argparse
import requests
import os

API_URL = "http://localhost:8080/api/audit/kickoff"

def main():
    parser = argparse.ArgumentParser(description="Trigger audit")
    parser.add_argument('--client', required=True)
    parser.add_argument('--keywords', required=True)
    parser.add_argument('--platform', required=True)
    args = parser.parse_args()

    payload = {
        "client": args.client,
        "platforms": [args.platform],
        "keywords": args.keywords.split(",")
    }

    print(f"\n🔍 Sending audit kickoff request for {args.client}...\n")
    res = requests.post(API_URL, json=payload)

    if res.status_code == 200:
        print("✅ Audit kicked off successfully!")
    else:
        print(f"❌ Error: {res.status_code}\n{res.text}")

if __name__ == "__main__":
    main()

