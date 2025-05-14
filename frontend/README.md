# Nel's Kitchen

Website ini memiliki fungsi untuk share resep masakan

Memiliki fitur :
Login
Register
Recipes
Home (Landing Page)
Dashboard (Admin User)
Komen (User Biasa)

Tech stack:
vite
shadcn components
react-router-dom
prop-types
lucide-react

sekarang saya ingin custom hooks untuk fetch data yang dinamis dari data.json saya di @/data/data.json, pakai cara paling best practice

## Resep

```
id (Primary Key)
title
description
ingredients
steps
image

```

## Komen

```
id (Primary Key)
user_id (Foreign Key)
recipe_id (Foreign Key)
comment_text
created_at
updated_at
```

## User

```
id (Primary Key)
username
email
password (hashed)
role (admin/user)
```
