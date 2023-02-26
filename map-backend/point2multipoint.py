import json

# Open GeoJSON file
with open("data_small.geojson", "r") as f:
    data = json.load(f)

# Convert Point features to MultiPoint features
for feature in data["features"]:
    if feature["geometry"]["type"] == "Point":
        feature["geometry"]["type"] = "MultiPoint"
        feature["geometry"]["coordinates"] = [feature["geometry"]["coordinates"]]

# Save modified GeoJSON file
with open("data_small_m.geojson", "w") as f:
    json.dump(data, f)
