import psutil
import json
import time
from collections import Counter 


ALLOWED_PROCESSES = {"code.exe": "VS Code",
    "chrome.exe": ("Google Chrome" , 1),
    "cmd.exe": ("Command Prompt", 1),
    "powershell.exe": ("PowerShell", 1),
    "explorer.exe": ("Windows Explorer", 1),
    "firefox.exe": ("Firefox", 1),
    "notepad.exe": ("Notepad", 1)}


def build_snapshot():
    counts = Counter(proc.name().lower() for proc in psutil.process_iter())
    snapshot = {}

    for proc, count in counts.items():
        if proc in ALLOWED_PROCESSES:
            snapshot[proc] = (ALLOWED_PROCESSES[proc], count)

    return snapshot

previous_snapshot = {}

while True:
    snapshot = build_snapshot()

    if previous_snapshot != snapshot:
        previous_snapshot = snapshot
        # I need to update UI
        print("🔁 Detected change. Updating UI...")
    else:
        pass 

    time.sleep(3)
 
