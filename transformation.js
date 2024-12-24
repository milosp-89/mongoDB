// main agg framework for submissions:

[
  {
    "$match": {
      "form.id": 24236
    }
  },
  {
    "$project": {
      "_id": 0,
      "submission_id": "$metadata.submission_id.value",
      "submitted_at": "$metadata.submitted_at.value",
      "metadata_fields": {
        "$concatArrays": [
          {
            "$slice": [
              { "$objectToArray": "$metadata" },
              0,
              1
            ]
          },
          {
            "$slice": [
              { "$objectToArray": "$metadata" },
              2,
              5
            ]
          }
        ]
      },
      "submission": {
        "$map": {
          "input": { "$objectToArray": "$submission" },
          "as": "field",
          "in": {
            "k": "$$field.k",
            "v": "$$field.v.value"
          }
        }
      }
    }
  },
  {
    "$addFields": {
      "metadata_fields": {
        "$arrayToObject": {
          "$map": {
            "input": "$metadata_fields",
            "as": "field",
            "in": {
              "k": "$$field.k",
              "v": "$$field.v.value"
            }
          }
        }
      },
      "submission": {
        "$arrayToObject": "$submission"
      }
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          "$metadata_fields",
          "$submission"
        ]
      }
    }
  }
]
