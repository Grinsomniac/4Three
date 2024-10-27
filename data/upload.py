import json
import boto3
from botocore.exceptions import ClientError

session = boto3.Session(profile_name='default')
dynamodb = session.resource('dynamodb')
table_name = 'DrugInfo'
table = dynamodb.Table(table_name)

def upload_to_dynamodb(file_path):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
        
        for item in data:
            try:
                response = table.put_item(Item=item)
                print(f'Successfully uploaded: {item}')
            except ClientError as e:
                print(f'Error uploading item {item}: {e.response["Error"]["Message"]}')

upload_to_dynamodb('/Users/chrisroddy/Documents/GitHub/4Three/data/output.json')