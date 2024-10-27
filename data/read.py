import pandas as pd
import json

file_path = "/Users/chrisroddy/Documents/GitHub/4Three/data/UnitedHealthcare2024FormularyUpdated.xlsx"

def convert_to_dynamodb_format(item):
    """Convert a standard Python dictionary to a DynamoDB-friendly format."""
    dynamodb_item = {}
    for key, value in item.items():
        if isinstance(value, str):
            dynamodb_item[key] = {'S': value}  
        elif isinstance(value, (int, float)):
            dynamodb_item[key] = {'N': str(value)}  
        elif isinstance(value, bool):
            dynamodb_item[key] = {'BOOL': value} 
        elif isinstance(value, list):
            dynamodb_item[key] = {'L': [convert_to_dynamodb_format(v) for v in value]}  
        elif isinstance(value, dict):
            dynamodb_item[key] = {'M': convert_to_dynamodb_format(value)} 
        else:
            raise ValueError(f"Unsupported data type for key '{key}': {type(value)}")
    return dynamodb_item

df = pd.read_excel(file_path)

dynamodb_data = [convert_to_dynamodb_format(row) for index, row in df.iterrows()]

output_file = 'output_dynamodb.json'
with open(output_file, 'w') as json_file:
    json.dump(dynamodb_data, json_file, indent=4)

print(f"Data has been converted and written to {output_file}.")


