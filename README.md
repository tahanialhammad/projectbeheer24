## 📌 Project Overview

This project (`projectbeheer24`) is a Laravel 12 application built with an Inertia.js SPA architecture.
It allows users to explore services, view detailed information, and place orders — all within a modern, responsive interface.

## Tech Stack

- Laravel 12 (PHP 8.2)
- Inertia.js (SPA bridge)
- React (frontend via Inertia)
- Spatie Laravel Permission (roles & permissions)

## Architecture

The project follows a **MVC + Service Layer** structure:

- **Models**: User, Order, Service, FormField, OrderFieldValue
- **Controllers**: Handle business flow (Orders, Users, Services, Roles, Notifications)
- **Services**: Used for business logic separation (partial usage)
- **Policies**: Authorization layer for access control
- **Notifications**: Used for order status updates
- **Frontend**: Inertia.js pages under `resources/js/Pages`

## Core Flow

1. Services define dynamic form fields
2. Users create Orders based on a Service
3. OrderFieldValue stores dynamic form data
4. Admin manages service, orders and invoicesvia dashboard
5. Notifications are sent on order updates

