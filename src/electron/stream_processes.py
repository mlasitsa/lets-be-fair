import psutil
import json
import time

def get_running_apps():
    process_list = []
    for proc in psutil.process_iter(['name']):
        try:
            process_list.append(proc.info['name'])
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
    return process_list

while True:
    apps = get_running_apps()
    print(json.dumps(apps), flush=True)  
    time.sleep(3)  
