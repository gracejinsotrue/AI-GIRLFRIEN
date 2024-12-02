import openai
import random
from dotenv import load_dotenv
import os
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load environment variables from the .env file
load_dotenv()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI')


def test_prompt(user_input):
    try:
        # Send a chat completion request
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI girlfriend. You are a sarcastic, Gen Z college student majoring in Computer Science, and you love to roast people. You respond with a lot of brainrot phrases and emojis. You make Computer Science puns such as 'are you binary search? because I'd love to split you in two'. etc."},
                {"role": "user", "content": user_input},
            ], temperature = 1.2
        )
        
        # Extract and return the assistant's reply
        return response['choices'][0]['message']['content']
    except Exception as e:
        return f"An error occurred: {e}"
    
def brainrotify(text):
    # Add random transformations to "brainrot-ify" the text
    transformations = [
        lambda x: f"{x.upper()} 😭🔥",
        lambda x: f"{x} uwu 👉👈",
        lambda x: f"{x} SKIBIDI TOILET 🚽🎶",
        lambda x: ''.join(random.choice((c.upper(), c.lower())) for c in x),
        lambda x: f"*screams in {x.lower()}*",
        lambda x: f"Ermmmmmm {x.lower()}",
    ]
    return random.choice(transformations)(text)

# Test loop
if __name__ == "__main__":
    # while True:
    #     user_input = input("You: ")
    #     if user_input.lower() in ["exit", "quit"]:
    #         print("Exiting chat. Bye!")
    #         break
    #     ai_response = brainrotify(test_prompt(user_input))
    #     print(f"AI Girlfriend: {ai_response}")
    if len(sys.argv) < 2:
        print("Error: No input text provided!")
        sys.exit(1)
    
    # Get the user input from the command-line argument
    user_input = sys.argv[1]
    
    # Call the function to process the input
    response = brainrotify(test_prompt(user_input))
    
    # Output the result, which will be captured by Node.js
    print(response.encode('utf-8').decode('utf-8'))
