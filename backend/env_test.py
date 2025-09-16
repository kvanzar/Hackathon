# backend/test_env.py

import os
from dotenv import load_dotenv
from pathlib import Path

print("--- Starting .env diagnostic test ---")

# Define the path to the .env file, assuming it's in the same directory
env_path = Path('.') / '.env'
print(f"Attempting to load file from absolute path: {env_path.resolve()}")

# Check if the file exists before trying to load it
if env_path.exists():
    print("✅ SUCCESS: .env file found at the expected location.")
    # The 'override=True' ensures we're not using stale, cached variables.
    # The 'verbose=True' will print out exactly what the library is doing.
    load_dotenv(dotenv_path=env_path, override=True, verbose=True)
else:
    print(f"❌ ERROR: .env file NOT found at '{env_path.resolve()}'")
    print("--- Test Aborted ---")
    exit()

print("\n--- Checking loaded environment variables ---")
keys_to_check = [
    "OPENAI_API_KEY",
    "AMADEUS_API_KEY",
    "AMADEUS_API_SECRET",
    "GEOAPIFY_API_KEY",
]

all_found = True
for key in keys_to_check:
    value = os.getenv(key)
    if value:
        # Hide the actual key for security, showing only the first few characters
        print(f"✅ Found {key}: {value[:4]}...")
    else:
        print(f"❌ ERROR: {key} not found or is empty!")
        all_found = False

print("\n--- Test Finished ---")
if all_found:
    print("✅ SUCCESS: All required keys were loaded correctly from your .env file.")
else:
    print("❌ FAILURE: One or more keys could not be loaded. Please double-check your .env file for typos or syntax errors.")