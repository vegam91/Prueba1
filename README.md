# Movies REST API

This RESTful API is designed to manage movie data.

## Prerequisites

- Node.js (v18.16.1)
- npm (v9.5.1)
- MongoDB (v6.0.7)​

## Getting Started

#### Environment Variables

Create a `.env` file and add the following variables:

- `MONGO_URI` - Database connection URI
- `JWT_PRIVATE_KEY` - Private key for JWT authentication

#### Build

```shell
git clone https://github.com/vegam91/Prueba1.git
cd Prueba1
npm install
npm run seed
```

##### Start

```shell
npm run dev
```

## Usage

Thunder Client Collections and Environment .json files have been included for testing requests in `exports/` folder.

### API Endpoints

#### Get User Movies

```http
GET /api/movies
```

- **Description:** Retrieve a list of movies belonging to the authenticated user.

- **Headers:**
  - `x-auth-token`: jwt token (required)
- **Query Parameters:**
- `category` (optional, multiple): Filter movies by category.
- `search` (optional): Search for movies by title.

- **Response:**
  - `200 OK`: Returns a list of user movies.
  - `400 Bad Request:` Request query params is invalid.
  - `401 Unauthorized`: Missing authentication credentials.

#### Get User Movie by ID

```http
GET /api/movies/:movieId
```

- **Description:** Retrieve details of a specific movie belonging to the authenticated user.

- **Headers:**

  - `x-auth-token`: jwt token (required)

- **Parameters:**

  - `movieId`: The unique identifier of the movie.

- **Response:**
  - `200 OK`: Returns the details of the specified movie.
  - `400 Bad Request:` Request param is invalid.
  - `401 Unauthorized`: Missing authentication credentials.
  - `403 Forbidden`: Authenticated user is not the movie's owner.
  - `404 Not Found`: Movie with the given id was not found.

#### Add Movie

```http
POST /api/movies
```

- **Description:** Add a new movie to the user's collection.

- **Headers:**

  - `x-auth-token`: jwt token (required)

- **Request Body:**
  - JSON object containing movie details.

```json
{
  "title": "Titanic",
  "releasedYear": 1997,
  "categories": ["656784a28a19dd089c840afe"]
}
```

- **Response:**
  - `201 Created`: Movie was successfully added.
  - `400 Bad Request`: Request body is invalid.
  - `401 Unauthorized`: Missing authentication credentials.

#### Edit Movie

```http
PUT /api/movies/:movieId
```

- **Description:** Edit details of a specific movie belonging to the authenticated user.

- **Headers:**

  - `x-auth-token`: jwt token (required)

- **Parameters:**

  - `movieId`: The unique identifier of the movie.

- **Request Body:**
  - JSON object containing updated movie details.

```json
{
  "title": "Titanic",
  "releasedYear": 1997,
  "categories": ["656784a28a19dd089c840afe", "6567a672be5f232b70cc1b77"]
}
```

- **Response:**
  - `200 OK`: Movie was successfully edited.
  - `400 Bad Request`: Request body or param is invalid.
  - `401 Unauthorized`: Missing authentication credentials.
  - `403 Forbidden`: Authenticated user is not the movie's owner.
  - `404 Not Found`: Movie with the given ID was not found.

#### Delete Movie

```http
DELETE /api/movies/:movieId
```

- **Description:** Perform a logical deletion of a specific movie belonging to the authenticated user

- **Headers:**

  - `x-auth-token`: jwt token (required)

- **Parameters:**

  - `movieId`: The unique identifier of the movie.

- **Response:**
  - `204 No Content`: Movie was successfully deleted.
  - `401 Unauthorized`: Missing authentication credentials.
  - `403 Forbidden`: Authenticated user is not the movie's owner.
  - `404 Not Found`: Movie with the given ID was not found.
