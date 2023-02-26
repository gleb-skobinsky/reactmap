import jsonlines
import json

input_file = "data.jsonl"
output_file = "output.json"

markers = []

with jsonlines.open(input_file) as reader:
    for obj in reader:
        markers.append(obj)

with open(output_file, "w") as f:
    json.dump({"markers": markers}, f)
