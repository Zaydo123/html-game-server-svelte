import time
import pyautogui
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Retrieve all environment variables
env_vars = os.environ

# Add delay between each command to handle the typing speed
pyautogui.PAUSE = 0.02

# Give some time to the user to focus on the field where the typing needs to happen
time.sleep(5)

num = 0
for var, value in env_vars.items():
    # Check if variable is from .env file
    if var in open('.env').read():
        # Type variable name
        pyautogui.write(var)
        # Press TAB
        pyautogui.press('tab')
        # Type variable value
        pyautogui.write(value)
        # Press TAB twice to move to the next line
        pyautogui.press('tab')
        # Press ENTER to save
        pyautogui.press('enter')

        for i in range(0,52+num):
            pyautogui.press('tab')

        num += 4

print("Finished Typing!")
