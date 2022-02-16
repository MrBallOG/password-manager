# password-manager

## Description

The goal of the project was to create a secure site where you can store your passwords.

## Tech stack

* React
* FastAPI
* NGINX
* Docker
* PostgreSQL

## Overview

Passwords are encrypted on client side with AES CBC and only ciphertext is stored in db. Key used for decryption and encryption is derived with PBKDF2 from user's master password. That key is then used to derive key for user's request to API concerning password's CRUD operations.
