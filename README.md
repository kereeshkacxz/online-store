# Online-Store (Vue + GO)

### Документация API для интернет-магазина

### Общая информация
- Для доступа к защищенным эндпоинтам требуется JWT токен (передавать в заголовке `Authorization: Bearer <token>`).
- Все пути начинаются с `/online-store/api/v1`.
- `uuid` - строковый формат идентификатора.
- Роли:
  - `admin`: Полный доступ.
  - `manager`: Управление товарами, категориями, брендами, изображениями.
  - `user`: Просмотр товаров и создание покупок.

---

### 1. **Товары**

#### Получить список товаров (с пагинацией и поиском)
- **POST** `/catalog/product_list`
- Доступ: `user`, `manager`, `admin`
- Тело запроса:
  ```json
  {
    "page": int,
    "limit": int,
    "search": str,
    "price_min": float optional,
    "price_max": float optional,
    "category_id": uuid optional,
    "brand_id": uuid optional,
    "optional_data": {
        "param_1": str
    }
  }
  ```
- Ответ:
  ```json
  {
    "products": [
      {
        "name": str,
        "description": str,
        "price": float,
        "category_id": uuid,
        "brand_id": uuid,
        "optional_data": {
            "param_1": str
        }
      }
    ],
    "total": int
  }
  ```

#### Добавить товар
- **POST** `/catalog/product`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "name": str,
    "description": str,
    "price": float,
    "category_id": uuid,
    "brand_id": uuid,
    "optional_data": {
        "param_1": str
    }
  }
  ```
- Ответ:
  ```json
  {
    "id": uuid
  }
  ```

#### Обновить товар
- **PUT** `/catalog/product/{product_id}`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "name": str,
    "description": str,
    "price": float,
    "category_id": uuid,
    "brand_id": uuid,
    "optional_data": {
        "param_1": str
    }
  }
  ```
- Ответ: `200 OK`

#### Удалить множество товаров
- **DELETE** `/catalog/product`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "products_ids": list[uuid]
  }
  ```
- Ответ: `204 No Content`

---

### 2. **Левая панель**

#### Получить левую панель
- **GET** `/catalog/filters?search=str`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "price_min": float,
    "price_max": float,
    "brands": [
      {
        "id": uuid,
        "logo": url,
        "name": str
      }
    ]
  }
  ```

---

### 3. **Категории**

#### Добавить категорию
- **POST** `/catalog/category`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "name": str,
    "parent": uuid optional
  }
  ```
- Ответ: `200 OK` или `400 Bad Request` (если выбранный родитель не может иметь дочерний объект).

#### Получить категории
- **GET** `/catalog/category`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "categories": [
      {
        "id": uuid,
        "name": str,
        "categories": [
          {
            "id": uuid,
            "name": str,
            "categories": [
              {
                "id": uuid,
                "name": str
              }
            ]
          }
        ]
      }
    ]
  }
  ```

#### Удалить категорию
- **DELETE** `/catalog/category/{category_id}`
- Доступ: `manager`, `admin`
- Ответ: `204 No Content`

---

### 4. **Бренды**

#### Получить бренд
- **GET** `/catalog/brand/{brand_id}`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "id": uuid,
    "name": str,
    "description": str,
    "logo": url
  }
  ```

#### Добавить бренд
- **POST** `/catalog/brand`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "name": str,
    "description": str,
    "logo": url
  }
  ```
- Ответ:
  ```json
  {
    "id": uuid
  }
  ```

#### Обновить бренд
- **PUT** `/catalog/brand/{brand_id}`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "name": str,
    "description": str,
    "logo": url
  }
  ```
- Ответ: `200 OK`

#### Удалить бренд
- **DELETE** `/catalog/brand/{brand_id}`
- Доступ: `manager`, `admin`
- При удалении стираются все товары бренда.
- Ответ: `204 No Content`

---

### 5. **Изображения товаров**

#### Получить изображения товара
- **GET** `/images/product/{product_id}`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "data": [
      {
        "id": uuid,
        "url": url
      }
    ]
  }
  ```

#### Добавить множество изображений (файлами)
- **POST** `/images/product/{product_id}`
- Доступ: `manager`, `admin`
- Параметры:
  - `files` (multipart/form-data): Список файлов изображений.
- Ответ:
  ```json
  {
    "data": [
      {
        "id": uuid,
        "url": url
      },
      {
        "id": uuid,
        "url": url
      }
    ]
  }
  ```

#### Удалить множество изображений
- **DELETE** `/images/product/{product_id}`
- Доступ: `manager`, `admin`
- Тело запроса:
  ```json
  {
    "image_ids": list[uuid]
  }
  ```
- Ответ: `204 No Content`

---

### 6. **Пользователи и аутентификация**

#### Регистрация
- **POST** `/auth/register`
- Доступ: роль может указывать только `admin`, также при выполнении от лица `admin` не требуется подтверждение почты
- Тело запроса:
  ```json
  {
    "username": str,
    "password": str,
    "role": str optional
  }
  ```
- Ответ:
  ```json
  {
    "id": uuid,
    "username": str,
    "role": str
  }
  ```

#### Логин (получение JWT токена)
- **POST** `/auth/login`
- Доступ: `public`
- Тело запроса:
  ```json
  {
    "username": str,
    "password": str
  }
  ```
- Ответ:
  ```json
  {
    "access_token": str,
    "token_type": str
  }
  ```

#### Удалить пользователя
- **DELETE** `/auth/user`
- Доступ: `admin`
- Тело запроса:
  ```json
  {
    "username": str,
    "password": str
  }
  ```
- Ответ: `204 No Content`

---

### 7. **Покупки**

#### Получить все покупки
- **GET** `/purchases`
- Ответ:
  ```json
  {
    "data": [
      {
        "id": uuid,
        "user_id": uuid,
        "status": str
        "items": [
          {
            "product_id": uuid,
            "quantity": int,
            "name": str,
            "price": float
            "image": url
          }
        ],
        "total_price": float
      },
    ]
  }
  ```
  
#### Отменить покупку
- **PATCH** `/purchases/cancel/{id}`
- Ответ: 200

#### Создать покупку
- **POST** `/purchases`
- Доступ: `user`, `manager`, `admin`
- Тело запроса:
  ```json
  {
    "items": [
      {
        "product_id": uuid,
        "quantity": int,
      }
    ]
  }
  ```
- Ответ:
  ```json
  {
    "id": uuid,
    "user_id": uuid,
    "status": str
    "items": [
      {
        "product_id": uuid,
        "quantity": int,
        "name": str,
        "price": float
        "image": url
      }
    ],
    "total_price": float
  }
  ```

### 8. **Корзина**

#### Получить содержимое корзины
- **GET** `/cart`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "items": [
      {
        "product_id": uuid,
        "quantity": int,
        "name": str,
        "price": float
        "image": url
      }
    ],
    "total_price": float
  }
  ```

#### Добавить товар в корзину
- **POST** `/cart`
- Доступ: `user`, `manager`, `admin`
- Тело запроса:
  ```json
  {
    "product_id": uuid,
    "quantity": int
  }
  ```
- Ответ:
  ```json
  {
    "message": "Товар успешно добавлен в корзину",
    "fullness_cart": int
  }
  ```

#### Обновить количество товара в корзине
- **PUT** `/cart/{product_id}`
- Доступ: `user`, `manager`, `admin`
- Тело запроса:
  ```json
  {
    "quantity": int
  }
  ```
- Ответ:
  ```json
  {
    "message": "Количество товара в корзине обновлено",
    "fullness_cart": int
  }
  ```

#### Удалить товар из корзины
- **DELETE** `/cart`
- Доступ: `user`, `manager`, `admin`
- Тело запроса:
  ```json
- Ответ:
  ```json
  {
    "message": "Товар успешно удален из корзины",
    "fullness_cart": int
  }
  ```

#### Очистить корзину
- **DELETE** `/cart`
- Доступ: `user`, `manager`, `admin`
- Ответ:
  ```json
  {
    "message": "Корзина успешно очищена"
  }
  ```

---
