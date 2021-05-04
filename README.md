# Project Setup And run instrunctions

1. Open terminal
2. Navigate to the project repository
3. Run `npm install` this will install all the required dependencies
4. After installing all the dependencies run `npm start`

# -api-challenge

Your task is to implement the function(s) to calculate the score for the DISC assessment, and then expose it through a REST api.

### Requirements

Create a web server with an endpoint, `/disc/evaluate` that calls an `evaluate(answers)` function to score answers to the DISC assessment.

## API Server

---

### Requirements

1. Create an API server. Feel free to use Koa, Express, or plain Node HTTP, and any other needed libraries.
2. Implement the `/disc/evaluate` API endpoint as per documentation below.
3. Successful request should return results with a 200 response. Bad input should return a 400 response.

### API

**POST** /disc/evaluate

**Body**

| Field   | Type  | Description    |
| ------- | ----- | -------------- |
| answers | array | Answer objects |

**Answer Object**

| Field       | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| description | string | The DISC descriptive word             |
| rank        | number | 1 for Most like the user, 4 for Least |

**Response**

| Field   | Type    | Description       |
| ------- | ------- | ----------------- |
| success | boolean | Success indicator |
| scores  | object  | DISC scores       |

**Example Request** Obviously, this is not all the answers that should be included.

```
curl -X POST \
  localhost:3000/disc/evaluate \
  -H 'Content-Type: application/json' \
  -d '{
  "answers": [
  { "description": "persuasive", "rank": 1 },
  { "description": "humble", "rank": 4 }
]}'
```

**Example Response**

```
{
  success: true,
  scores: {
    d: 3,
    i: 5,
    s: -2,
    c: -2,
  },
}
```

## Scoring DISC

---

**Function** `evaluate(<Array>)`

**Arguments**

| Field   | Type  | Description    |
| ------- | ----- | -------------- |
| answers | array | Answer objects |

**Answer Object**

| Field       | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| description | string | The DISC descriptive word             |
| rank        | number | 1 for Most like the user, 4 for Least |

Response Format:

```
{
  d: <Number>,
  i: <Number>,
  s: <Number>,
  c: <Number>,
}
```

### About DISC

DISC is an assessment that analyzes your personality based on four traits - Dominance, Influence, Steadiness, and Conscientiousness.
Imagine you are given a list of descriptive words that you must rank with the numbers 1-4 indicating how much the word is like you.
Your answers are then mapped to which DISC letter they correspond to.

Keep in mind:

Words ranked 1 are considered "most like me". This creates our "motivated" value.

Words ranked 4 are considered "least like me". This creates our "latent" value.

Anything ranked 2 or 3 is ignored.

Your function should compare the user's answers to the data in `mapping-data.js`. The mapping data will tell you which letter (d, i, s, or c) the word relates to, and it's "motivated" or "latent" value.

**The `sample-answers.js` file has a set of all the answers and the expected output, which can be used to test your solution.**

### Example:

Answers given are:

```
[
  { description: 'persuasive', rank: 1 },
  { description: 'gentle', rank: 2 },
  { description: 'humble', rank: 4 },
]
```

From the mapping data:

```
[
  {
    word: 'persuasive',
    letter: 'i',
    m: 1,
    l: 0,
  },
  {
    word: 'humble',
    letter: 'c',
    m: 1,
    l: 0,
  }
]
```

"persuasive" was ranked 1, which means "most", so we will increment the "motivated" value for "I" by the value in the mapping - which is 1.

"gentle" was ranked 2, so we can ignore it.

"humble" was ranked 4, which means "least", so we will increment the "latent" value for "C" by the value in the mapping - which is 0.

At this point, our DISC score is:

```
{
  d: { motivated: 0, latent: 0 },
  i: { motivated: 1, latent: 0 },
  s: { motivated: 0, latent: 0 },
  c: { motivated: 0, latent: 0 },
}
```

At the end, subtract the latent value from the motivated value of each letter to get the final DISC score:

```
{
  d: 0,
  i: 1,
  s: 0,
  c: 0,
}
```
