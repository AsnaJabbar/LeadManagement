<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
# Lead Management System
<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>
A modern, robust Lead Management System built with **Laravel 12**, **Inertia.js**, and **React**. This application provides a seamless, single-page experience (SPA) for managing sales leads with real-time status updates and advanced filtering.
## About Laravel
## 🚀 Features
Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:
- **Full CRUD Operations**: Create, Read, Update, and Soft Delete sales leads.
- **Advanced Filtering**: Session-based search (name/email), status filtering, and chronological sorting.
- **Dynamic UI**: Built with React and Headless UI for a premium, responsive feel.
- **Inline Status Updates**: Rotate through lead statuses (New, Contacted, Converted) directly from the listing table.
- **Authentication**: Secure login and password management via Laravel Breeze.
- **Dark Mode Support**: Fully responsive UI with automated dark mode styling via Tailwind CSS.
- **Flash Notifications**: Real-time success and error feedback.
- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).
## 🛠️ Technical Stack
Laravel is accessible, powerful, and provides tools required for large, robust applications.
- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React (with TypeScript), Inertia.js
- **Styling**: Tailwind CSS 4
- **State Management**: Inertia `useForm`
- **Database**: MySQL / SQLite (Soft Deletes enabled)
## Learning Laravel
## 📦 Installation
Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lead-management
   ```
If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.
2. **Install PHP Dependencies**:
   ```bash
   composer install
   ```
## Laravel Sponsors
3. **Install JS Dependencies**:
   ```bash
   npm install
   ```
We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).
4. **Environment Setup**:
   Copy `.env.example` to `.env` and configure your database settings.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
### Premium Partners
5. **Run Migrations & Seeders**:
   ```bash
   php artisan migrate --seed
   ```
- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**
6. **Start the Development Servers**:
   Run these in two separate terminals:
   ```bash
   # Terminal 1: Laravel Server
   php artisan serve
## Contributing
   # Terminal 2: Vite Dev Server
   npm run dev
   ```
Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).
## 🔑 Default Credentials
## Code of Conduct
If you ran the seeders, you can log in with:
- **Email**: `test@example.com`
- **Password**: `password`
In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).
## 🧪 Development Notes
## Security Vulnerabilities
- **Route Management**: Uses `ziggy-js` for shared routing between Laravel and React.
- **Type Safety**: Fully typed with TypeScript interfaces for Models and Props.
- **Assets**: Entry point is located at `resources/js/app.tsx`.
If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.
---
*Built with ❤️ using Laravel & React.*
## License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
