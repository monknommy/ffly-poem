from boto3.dynamodb.types import TypeDeserializer

import requests
from requests_aws4auth import AWS4Auth

region = '' # e.g. us-east-1
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = '' # the Amazon ES domain, with https://
index = 'lambda-index'
type = 'lambda-type'
url = host + '/' + index + '/' + type + '/'

headers = { "Content-Type": "application/json" }


def deserialize(deser, d):
    result = {}
    for k in d:
        result[k] = deser.deserialize(d[k])
    return result

def handler(event, context):
    deser = TypeDeserializer()
    for record in event["Records"]:
        keys = deserialize(deser, record["dynamodb"]["Keys"])
        new_image = deserialize(deser, record["dynamodb"]["NewImage"])
        print(keys, new_image)


# record = {
#     "eventID": "7a3cc4044e22e945ed482336d697ce4b",
#     "eventName": "INSERT",
#     "eventVersion": "1.1",
#     "eventSource": "aws:dynamodb",
#     "awsRegion": "us-west-1",
#     "dynamodb": {
#         "ApproximateCreationDateTime": 1551148403.0,
#         "Keys": {"edge": {"S": "SELF"}, "id": {"S": "POEM_371134"}},
#         "NewImage": {
#             "annotation": {
#                 "S": "寻寻觅觅：意谓想把失去的一切都找回来，表现非常空虚怅惘、迷茫失落的心态。\n凄凄惨惨戚戚：忧愁苦闷的样子。\n乍暖还（huán）寒：指秋天的天气，忽然变暖，又转寒冷。\n将息：旧时方言，休养调理之意。\n怎敌他：对付，抵挡。晚：一本作“晓”。\n损：表示程度极高。\n堪：可。\n著：亦写作“着”。\n怎生：怎样的。生：语助词。\n梧桐更兼细雨：暗用白居易《长恨歌》“秋雨梧桐叶落时”诗意。\n这次第：这光景、这情形。\n怎一个愁字了得：一个“愁”字怎么能概括得尽呢？"
#             },
#             "edge": {"S": "SELF"},
#             "genre": {"S": "词"},
#             "name": {"S": "声声慢"},
#             "id": {"S": "POEM_371134"},
#             "content": {
#                 "S": "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。\n满地黄花堆积。憔悴损，如今有谁堪摘？守著窗儿，独自怎生得黑？梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个、愁字了得！"
#             },
#         },
#         "SequenceNumber": "108010200000000014334470662",
#         "SizeBytes": 1078,
#         "StreamViewType": "NEW_IMAGE",
#     },
#     "eventSourceARN": "arn:aws:dynamodb:us-west-1:262807792923:table/dev-ffly-poem-meta/stream/2019-02-26T01:38:18.778",
# }
#event = {"Records": [record]}
#handler(event, None)
