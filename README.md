# mbti-match-server

# POST /api/mbti

## request (최초 그룹 생성시)
```bash
curl -X "POST" "http://localhost:3000/api/mbti" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "groupName": "챠니친구",
  "mbti": "ESFP",
  "name": "정현"
}'
```

## request (기존에 존재하는 그룹에 추가시)
```bash
curl -X "POST" "http://localhost:3000/api/mbti" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "정현",
  "mbti": "ESFP",
  "groupId": "069cfd11-d63a-44a7-aea2-ca57a80009ad"
}'
```

## response
```json
{
  "id": "069cfd11-d63a-44a7-aea2-ca57a80009ad"
}
```


# GET /api/mbti/:groupId

## request
```bash
curl "http://localhost:3000/api/mbti/069cfd11-d63a-44a7-aea2-ca57a80009ad"
```

## response
```json
{
  "users": [
    {
      "id": "56ae189b-3984-4886-b449-9fe5f0f00c9f",
      "createdAt": "2022-04-06T15:20:48.277Z",
      "groupId": "069cfd11-d63a-44a7-aea2-ca57a80009ad",
      "name": "복이",
      "mbti": "ESFP"
    },
    {
      "id": "51541eb1-926d-4d2a-9a21-6334d6db556a",
      "createdAt": "2022-04-06T15:21:04.955Z",
      "groupId": "069cfd11-d63a-44a7-aea2-ca57a80009ad",
      "name": "정현",
      "mbti": "ESFP"
    },
    {
      "id": "93a43c2c-1e91-4e23-b2e0-6fc18f57ed8c",
      "createdAt": "2022-04-06T15:21:01.476Z",
      "groupId": "069cfd11-d63a-44a7-aea2-ca57a80009ad",
      "name": "챠니",
      "mbti": "ESFP"
    }
  ],
  "matches": [
    {
      "id": "94a711e7-da7d-4221-9560-cdb8a2cdff13",
      "createdAt": "2022-04-06T15:21:04.976Z",
      "sourceId": "51541eb1-926d-4d2a-9a21-6334d6db556a",
      "score": "BAD",
      "targetId": "93a43c2c-1e91-4e23-b2e0-6fc18f57ed8c"
    },
    {
      "id": "cbe4d2f0-3361-43a8-9c1c-62c8688011ab",
      "createdAt": "2022-04-06T15:21:04.967Z",
      "sourceId": "51541eb1-926d-4d2a-9a21-6334d6db556a",
      "score": "BAD",
      "targetId": "56ae189b-3984-4886-b449-9fe5f0f00c9f"
    },
    {
      "id": "8cdb2c51-a27c-4233-a2e0-0f0d98771219",
      "createdAt": "2022-04-06T15:21:01.489Z",
      "sourceId": "93a43c2c-1e91-4e23-b2e0-6fc18f57ed8c",
      "score": "BAD",
      "targetId": "56ae189b-3984-4886-b449-9fe5f0f00c9f"
    }
  ]
}
```
