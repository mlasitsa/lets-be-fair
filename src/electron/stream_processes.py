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
    "audiodg.exe": "Windows Audio Device Graph",
    "registry" : "???",
    "node.exe" : "Node.js",
    "conhost.exe" : "???",
    "wudfhost.exe": "Windows Driver Foundation",
    "wininit.exe": "Windows Initialization",
    "mpdefendercoreservice.exe": "Microsoft Defender Core",
    "apmsgfwd.exe": "Alienware Pointing Device Service",
    "bash.exe": "Bash Terminal",
    "memcompression": "Memory Compression",
    "intelcphecisvc.exe": "Intel HECI Service",
    "igfxcuiservice.exe": "Intel Graphics Control Panel",
    "dllhost.exe": "COM Surrogate",
    "msedge.exe": "Microsoft Edge",
    "bcmushupgradeservice.exe": "Broadcom Bluetooth Upgrade Service",
    "apremote.exe": "Alienware Pointing Remote",
    "hidfind.exe": "HID Device Finder",
    "hidmonitorsvc.exe": "HID Monitor Service",
    "msedgewebview2.exe": "Edge WebView Runtime",
    "wlanext.exe": "Wireless LAN Extension",
    "dellffdpwmiservice.exe": "Dell SupportAssist",
    "bcmhostcontrolservice.exe": "Broadcom Host Control",
    "bcmhoststorageservice.exe": "Broadcom Host Storage",
    "oneapp.igcc.winservice.exe": "Intel Graphics Command Center",
    "intelaudioservice.exe": "Intel Audio Service",
    "jhi_service.exe": "Intel Dynamic Application Loader",
    "rstmwservice.exe": "Intel Rapid Storage",
    "lms.exe": "Local Management Service",
    "rtkauduservice64.exe": "Realtek Audio Service",
    "esif_uf.exe": "Intel Dynamic Platform & Thermal Framework",
    "wavessyssvc64.exe": "Waves MaxxAudio System Service",
    "wmiregistrationservice.exe": "WMI Registration",
    "msmpeng.exe": "Microsoft Defender Antivirus",
    "git-bash.exe": "Git Bash Terminal",
    "aggregatorhost.exe": "Settings Aggregator",
    "shellexperiencehost.exe": "Windows Shell Experience",
    "searchindexer.exe": "Windows Search Indexer",
    "apntex.exe": "Alps Touchpad Driver",
    "electron.exe": "Electron App",
    "searchapp.exe": "Windows Search",
    "ctfmon.exe": "CTF Loader (Text Input)",
    "lockapp.exe": "Windows Lock Screen",
    "nissrv.exe": "Microsoft Network Inspection",
    "apoint.exe": "Alps Pointing Device Driver",
    "useroobebroker.exe": "User OOBE Broker",
    "igfxem.exe": "Intel Graphics Executable",
    "mousocoreworker.exe": "Windows Update Worker",
    "unsecapp.exe": "Sink to Receive Async Callbacks",
    "systemsettings.exe": "Windows Settings",
    "smartscreen.exe": "Windows Defender SmartScreen",
    "wmiprvse.exe": "WMI Provider Host",
    "snippingtool.exe": "Snipping Tool",
    "mintty.exe": "MinTTY Terminal",
    "comppkgsrv.exe": "Microsoft Store Infrastructure",
    "textinputhost.exe": "Text Input Host",
    "wavessvc64.exe": "Waves Audio Service",
    "applicationframehost.exe": "UWP Window Manager",
    "python.exe": "Python Interpreter",
    "onedrive.exe": "Microsoft OneDrive"
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
 
