import json

path = 'package.json'
with open(path, 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Successfully removed BOM from package.json')
