 Описание методов API 

## User

###  Actions:
  
#### `index`: 
  `GET /v1/users` получить всех пользователей
  
    Сервер отвечает одним из http-кодов `(401|403|200)`
      401:
      {
        "name": "Unauthorized",
        "message": "Your request was made with invalid credentials.",
        "code": 0,
        "status": 401,
        "type": "yii\\web\\UnauthorizedHttpException"
      }
      
      403:
      {
        "name": "Forbidden",
        "message": "Only Administrator can do this",
        "code": 0,
        "status": 403,
        "type": "yii\\web\\ForbiddenHttpException"
      }
      
      200:
      [
        {
            "id": 1,
            "username": "username1",
            "email": "username1@test.com"
        },
        {
            "id": 2,
            "username": "username2",
            "email": "username2@test.com"
        }
      ]
     
#### `view`: 
  `GET /v1/users/:id` получить одного пользователя по ID
  
    Сервер отвечает одним из http-кодов `(403|401|200)`
      403:
      {
        "name": "Forbidden",
        "message": "You can only view your user information.",
        "code": 0,
        "status": 403,
        "type": "yii\\web\\ForbiddenHttpException"
      }
      401:
      {
        "name": "Unauthorized",
        "message": "Your request was made with invalid credentials.",
        "code": 0,
        "status": 401,
        "type": "yii\\web\\UnauthorizedHttpException"
      }
      200:
      {
        "id": 1,
        "username": "username1",
        "email": "username1@test.com"
      }
  
#### `update`: 
  `PUT|PATCH /v1/users/:id` обновить информацию пользователя по ID
  
  В теле запроса отправляем необходимые для изменения параметры 
  
    Сервер отвечает одним из http-кодов `(403|401|200)`
      403:
      {
        "name": "Forbidden",
        "message": "You can only update your user information.",
        "code": 0,
        "status": 403,
        "type": "yii\\web\\ForbiddenHttpException"
      }
      401:
      {
        "name": "Unauthorized",
        "message": "Your request was made with invalid credentials.",
        "code": 0,
        "status": 401,
        "type": "yii\\web\\UnauthorizedHttpException"
      }
      200:
      {
        "id": 1,
        "username": "usernameNew",
        "email": "usernameNew@test.com"
      }

#### `sign-up`: 
  `POST /v1/users/sign-up` регистрация пользователя

  В теле запроса отправляем {username, email, password}
  
  Сервер отвечает кодом `200` и отправляет в случае усхеха `auth_token`. 
  Если валидация не проходит, возвращается текст ошибки и название свойства, в котором возникла ошибка.
  
#### `auth`: 
  `POST /v1/users/auth` аутентификация пользователя

  В теле запроса отправляем {username, password}
  
    Сервер отвечает одним из http-кодов `(403|500|200)`
      403:
      {
        "name": "Forbidden",
        "message": "Wrong credentials",
        "code": 0,
        "status": 403,
        "type": "yii\\web\\ForbiddenHttpException"
      }
      500:
      {
        "name": "Exception",
        "message": "Password must be a string and cannot be empty.",
        "code": 0,
        "type": "yii\\base\\InvalidArgumentException",
      }
      200:
      `auth_token`
  
