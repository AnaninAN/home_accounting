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
      
---
## Account

###  Actions:
  
#### `create`: 
  `POST /v1/accounts` создать счет
  
    Сервер отвечает одним из http-кодов `(401|422|201)`
         401:
         {
           "name": "Unauthorized",
           "message": "Your request was made with invalid credentials.",
           "code": 0,
           "status": 401,
           "type": "yii\\web\\UnauthorizedHttpException"
         }
         422:
         [
             {
                 "field": "name",
                 "message": "Name cannot be blank."
             },
             {
                 "field": "currency_id",
                 "message": "Currency ID is invalid."
             }
         ]
         201:
         {
             "name": "acc4",
             "account_category_id": "2",
             "currency_id": "3",
             "user_id": 2,
             "created_at": 1574842287,
             "updated_at": 1574842287,
             "id": 6
         }
         
#### `index`: 
  `GET /v1/accounts` получить все счета
    Администратор получает список счетов всех пользователей, пользователь только свои счета
  
    Сервер отвечает одним из http-кодов `(401|200)`
         401:
         {
           "name": "Unauthorized",
           "message": "Your request was made with invalid credentials.",
           "code": 0,
           "status": 401,
           "type": "yii\\web\\UnauthorizedHttpException"
         }
         200:
         [
             {
                 "id": 1,
                 "name": "acc1",
                 "amount": null,
                 "account_category_id": 2,
                 "user_id": 2,
                 "currency_id": 1,
                 "created_at": 1574585703,
                 "updated_at": 1574585703
             },
             {
                 "id": 4,
                 "name": "acc2",
                 "amount": null,
                 "account_category_id": 2,
                 "user_id": 2,
                 "currency_id": 3,
                 "created_at": 1574841985,
                 "updated_at": 1574841985
             }
         ]
  
#### `view`: 
  `GET /v1/accounts/:id` получить счет по ID
  
    Сервер отвечает одним из http-кодов `(404|403|401|200)`
      404:
      {
        "name": "Not Found",
        "message": "Object not found: 3",
        "code": 0,
        "status": 404,
        "type": "yii\\web\\NotFoundHttpException"
      }
      403:
      {
          "name": "Forbidden",
          "message": "You can only view your accounts information.",
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
          "name": "acc1",
          "amount": null,
          "account_category_id": 2,
          "user_id": 2,
          "currency_id": 1,
          "created_at": 1574585703,
          "updated_at": 1574585703
      }
  
#### `update`: 
  `PUT|PATCH /v1/accounts/:id` обновить информацию счета по ID
  
  В теле запроса отправляем необходимые для изменения параметры 
  
    Сервер отвечает одним из http-кодов `(404|403|401|200)`
      404:
      {
          "name": "Not Found",
          "message": "Object not found: 3",
          "code": 0,
          "status": 404,
          "type": "yii\\web\\NotFoundHttpException"
      }
      403:
      {
          "name": "Forbidden",
          "message": "You can only update your accounts information.",
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
          "id": 4,
          "name": "nameNew",
          "amount": null,
          "account_category_id": 2,
          "user_id": 2,
          "currency_id": 3,
          "created_at": 1574841985,
          "updated_at": 1574843810
      }
      
#### `delete`: 
  `DELETE /v1/accounts/:id` удалить счет по ID
  
      Сервер отвечает одним из http-кодов `(404|403|401|204)`
        404:
        {
            "name": "Not Found",
            "message": "Object not found: 3",
            "code": 0,
            "status": 404,
            "type": "yii\\web\\NotFoundHttpException"
        }
        403:
        {
            "name": "Forbidden",
            "message": "You can only delete your accounts information.",
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
        204:
        Тело ответа пусто           

---
## Account_category (account_categories), Category (categories), Label (labels), Currency (currencies)

###  Actions:
  
#### `create`: 
  `POST /v1/entity` создать сущность
  
    Сервер отвечает одним из http-кодов `(401|403|201)`
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
         201:
         {
           "name": "cash",
           "id": 3
         }

#### `index`: 
  `GET /v1/entity` получить все сущности
  
    Сервер отвечает одним из http-кодов `(401|200)`
         401:
         {
           "name": "Unauthorized",
           "message": "Your request was made with invalid credentials.",
           "code": 0,
           "status": 401,
           "type": "yii\\web\\UnauthorizedHttpException"
         }
         200:
         [
             {
                 "id": 2,
                 "name": "card"
             },
             {
                 "id": 3,
                 "name": "cash"
             }
         ]
         
#### `view`: 
  `GET /v1/entity/:id` получить одну сущность по ID
  
    Сервер отвечает одним из http-кодов `(404|401|200)`
      404:
      {
        "name": "Not Found",
        "message": "Object not found: 3",
        "code": 0,
        "status": 404,
        "type": "yii\\web\\NotFoundHttpException"
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
        "id": 2,
        "name": "card"
      }
      
#### `update`: 
  `PUT|PATCH /v1/entity/:id` обновить информацию сущности по ID
  
  В теле запроса отправляем необходимые для изменения параметры 
  
    Сервер отвечает одним из http-кодов `(404|403|401|200)`
      404:
      {
          "name": "Not Found",
          "message": "Object not found: 3",
          "code": 0,
          "status": 404,
          "type": "yii\\web\\NotFoundHttpException"
      }
      403:
      {
          "name": "Forbidden",
          "message": "Only Administrator can do this",
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
        "name": "nameNew"
      }
      
#### `delete`: 
  `DELETE /v1/entity/:id` удалить сущность по ID
    
  
      Сервер отвечает одним из http-кодов `(404|403|401|204)`
        404:
        {
            "name": "Not Found",
            "message": "Object not found: 3",
            "code": 0,
            "status": 404,
            "type": "yii\\web\\NotFoundHttpException"
        }
        403:
        {
            "name": "Forbidden",
            "message": "Only Administrator can do this",
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
        204:
        Тело ответа пусто
