import json

with open("public_schools_data.geojson") as f:
    data = json.load(f)

for feature in data["features"]:
    feature["id"] = feature["properties"]["FID"]
    del feature["properties"]

with open("public_schools_data_v2.geojson", "w") as f:
    json.dump(data, f)
