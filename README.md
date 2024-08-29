# Ecommerce

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/Martin6363/e_commerance.git
```

---

### Frontend

---

```sh
cd frontend
```

```sh
npm i OR npm install
```

```sh
npm run dev
```

### Backend

---

```sh
cd backend
```

```sh
cp .env.example .env   OR   copy .env.example .env
```

```sh
composer install OR composer update
```

```sh
php artisan key:generate
```

### Run Database

---

Open **OsPanel** OR **XAMPP** run mysql server

```sh
php artisan migrate
```

```sh
php artisan db:seed
```

```sh
php artisan app:update-exchange-rates  ##Load updated exchange rates into the database

```

```sh
php artisan serve

```
