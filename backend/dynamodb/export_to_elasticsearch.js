'use strict';
/**
 * Reference from https://blog.jayway.com/2018/09/11/aws-elasticsearch-javascript-client/
 */

//todo shawn, convert to type script.
//todo shawn figure out vpc.

const path = require('path');
const AWS = require('aws-sdk');

const { FFLY_AWS_REGION, ELASTICSEARCH_DOMAIN_ENDPOINT } = process.env;
const endpoint = new AWS.Endpoint(ELASTICSEARCH_DOMAIN_ENDPOINT);
const httpClient = new AWS.HttpClient();
const parse = AWS.DynamoDB.Converter.output;

function getAWSCredentials() {
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials((err, creds) => {
      if (err) return resolve(null);
      return resolve(creds);
    });
  });
}

/**
 * Sends a request to Elasticsearch
 *
 * @param {string} httpMethod - The HTTP method, e.g. 'GET', 'PUT', 'DELETE', etc
 * @param {string} requestPath - The HTTP path (relative to the Elasticsearch domain), e.g. '.kibana'
 * @param {Object} [payload] - An optional JavaScript object that will be serialized to the HTTP request body
 * @returns {Promise} Promise - object with the result of the HTTP response
 */
async function sendElasticsearchRequest({ httpMethod, requestPath, payload }) {
  const request = new AWS.HttpRequest(endpoint, FFLY_AWS_REGION);

  request.method = httpMethod;
  request.path = path.join(request.path, requestPath);
  request.body = JSON.stringify(payload);
  request.headers['Content-Type'] = 'application/json';
  request.headers['Host'] = ELASTICSEARCH_DOMAIN_ENDPOINT;

  const signer = new AWS.Signers.V4(request, 'es');
  const credentials = await getAWSCredentials();
  signer.addAuthorization(credentials, new Date());

  return new Promise((resolve, reject) => {
    httpClient.handleRequest(request, null,
      response => {
        const { statusCode, statusMessage, headers } = response;
        let body = '';
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', () => {
          const data = {
            statusCode,
            statusMessage,
            headers
          };
          if (body) {
            data.body = JSON.parse(body);
          }
          resolve(data);
        });
      },
      err => {
        reject(err);
      });
  });
}

exports.handler = function (event, _context, _callback) {
  event.Records.forEach((record) => {
    const newImage = parse({ "M": record.dynamodb.NewImage });
    if (newImage.edge != 'SELF' || !newImage.id.startsWith('POEM_')) {
      return;
    }
    const document = {
      'content': newImage.content,
      'name': newImage.name,
    }
    // console.log('DynamoDB New Image:', newImage);
    const params = {
      httpMethod: 'PUT',
      requestPath: 'ffly-poem/poem/' + newImage.id,
      payload: document
    };
    sendElasticsearchRequest(params)
      .then(_response => {
        console.info(_response);
      }).catch(error => {
        console.error(error);
      });
  });
  console.log('successfully processed ' + event.Records.length + ' to elastic search');
}

// function search () {
//   const params = {
//     httpMethod: 'POST',
//     requestPath: 'ffly-poem/_search',
//     payload: {
//       "size": 10,
//       "query": {
//         "multi_match": {
//           "query": "知否",
//           "fields": ["name", "content"]
//         }
//       }
//     }
//   };
//   sendElasticsearchRequest(params)
//     .then(response => {
//       console.info(response.body.hits.hits);
//     }).catch(error => {
//       console.error(error);
//     });
// }

// search()
// const record = {
//   "eventID": "7a3cc4044e22e945ed482336d697ce4b",
//   "eventName": "INSERT",
//   "eventVersion": "1.1",
//   "eventSource": "aws:dynamodb",
//   "awsRegion": "us-west-1",
//   "dynamodb": {
//     "ApproximateCreationDateTime": 1551148403.0,
//     "Keys": { "edge": { "S": "SELF" }, "id": { "S": "POEM_371134" } },
//     "NewImage": {
//       "annotation": {
//         "S": "寻寻觅觅：意谓想把失去的一切都找回来，表现非常空虚怅惘、迷茫失落的心态。\n凄凄惨惨戚戚：忧愁苦闷的样子。\n乍暖还（huán）寒：指秋天的天气，忽然变暖，又转寒冷。\n将息：旧时方言，休养调理之意。\n怎敌他：对付，抵挡。晚：一本作“晓”。\n损：表示程度极高。\n堪：可。\n著：亦写作“着”。\n怎生：怎样的。生：语助词。\n梧桐更兼细雨：暗用白居易《长恨歌》“秋雨梧桐叶落时”诗意。\n这次第：这光景、这情形。\n怎一个愁字了得：一个“愁”字怎么能概括得尽呢？"
//       },
//       "edge": { "S": "SELF" },
//       "genre": { "S": "词" },
//       "name": { "S": "声声慢" },
//       "id": { "S": "POEM_371134" },
//       "content": {
//         "S": "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。\n满地黄花堆积。憔悴损，如今有谁堪摘？守著窗儿，独自怎生得黑？梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个、愁字了得！"
//       },
//     },
//     "SequenceNumber": "108010200000000014334470662",
//     "SizeBytes": 1078,
//     "StreamViewType": "NEW_IMAGE",
//   },
//   "eventSourceARN": "arn:aws:dynamodb:us-west-1:262807792923:table/dev-ffly-poem-meta/stream/2019-02-26T01:38:18.778",
// }
// const event = { "Records": [record] }
// exports.handler(event, null, null);

