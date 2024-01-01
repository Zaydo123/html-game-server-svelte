import os
import json
import argparse
from dotenv import load_dotenv

def load_env_vars():
    # Load .env file
    load_dotenv()

    # Retrieve only local environment variables
    env_vars = {key: value for key, value in os.environ.items() if key in open('.env').read()}

    return env_vars

def main():
    parser = argparse.ArgumentParser(description='CLI tool for loading environment variables')
    parser.add_argument('--json', action='store_true', help='Output as JSON')
    args = parser.parse_args()

    env_vars = load_env_vars()

    if args.json:
        print(json.dumps(env_vars))
    else:
        for key, value in env_vars.items():
            print(f'{key}={value}')

if __name__ == '__main__':
    main()
