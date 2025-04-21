import psutil
import json
import time
import sys
from collections import Counter 


ALLOWED_PROCESSES = {
    "code.exe": "VS Code",
    "chrome.exe": "Google Chrome",
    "cmd.exe": "Command Prompt",
    "powershell.exe": "PowerShell",
    "explorer.exe": "Windows Explorer",
    "firefox.exe": "Firefox",
    "notepadio.exe": "Notepad",
    "svchost.exe": "Windows Service Host",
    "services.exe": "Windows Services Manager",
    "lsass.exe": "Local Security Authority Subsystem",
    "csrss.exe": "Client/Server Runtime",
    "winlogon.exe": "Windows Logon Application",
    "smss.exe": "Session Manager",
    "dwm.exe": "Desktop Window Manager",
    "taskhostw.exe": "Task Host",
    "system": "Windows Kernel/System",
    "system idle process": "CPU Idle Process",
    "sihost.exe": "Shell Infrastructure Host",
    "spoolsv.exe": "Print Spooler Service",
    "explorer.exe": "Windows Explorer (Shell)",
    "searchui.exe": "Cortana/Search Interface",
    "fontdrvhost.exe": "Font Driver Host",
    "runtimebroker.exe": "Windows Runtime Broker",
    "startmenuexperiencehost.exe": "Start Menu Host",
    "securityhealthservice.exe": "Windows Security Health",
    "securityhealthsystray.exe": "Windows Security Tray Icon",
    "audiodg.exe": "Windows Audio Device Graph"
    }


def build_snapshot():
    counts = Counter(proc.name().lower() for proc in psutil.process_iter())
    snapshot = {}

    for proc, count in counts.items():
        if proc not in ALLOWED_PROCESSES:
            snapshot[proc] = (proc, count)

    return snapshot

previous_snapshot = {}

while True:
    snapshot = build_snapshot()

    if previous_snapshot != snapshot:
        previous_snapshot = snapshot
        print(json.dumps(snapshot), flush=True)
    else:
        pass 

    time.sleep(60)
 
