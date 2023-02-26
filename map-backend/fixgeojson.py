import json

# Load GeoJSON file
with open("police_data.geojson") as f:
    data = json.load(f)

# Convert Point features to LineString features
for feature in data["features"]:
    if feature["geometry"]["type"] == "Point":
        coordinates = feature["geometry"]["coordinates"]
        # Create LineString feature as circle around the Point
        feature["geometry"] = {
            "type": "LineString",
            "coordinates": [
                [coordinates[0] + 0.001, coordinates[1]],
                [coordinates[0], coordinates[1] + 0.001],
                [coordinates[0] - 0.001, coordinates[1]],
                [coordinates[0], coordinates[1] - 0.001],
                [coordinates[0] + 0.001, coordinates[1]],
            ],
        }

# Save converted GeoJSON file
with open("police_data_c.geojson", "w") as f:
    json.dump(data, f)
