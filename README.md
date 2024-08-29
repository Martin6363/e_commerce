# Ecommerce

## Installation
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/Martin6363/e_commerance.git
```
****
### Frontend
****
```sh
cd frontend
npm i OR npm install
npm run dev
```

### Backend
****
```sh
cd backend
cp .env.example .env   OR   copy .env.example .env
composer install OR composer update
php artisan key:generate
```
### Run Database
***
Open **OsPanel** OR **XAMPP** run mysql server
```sh
php artisan migrate
php artisan db:seed
php artisan app:update-exchange-rates  ##Load updated exchange rates into the database
php artisan serve
```