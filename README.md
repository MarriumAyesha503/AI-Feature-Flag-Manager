## Overview

An AI-powered Feature Flag Management platform built with React, FastAPI, PostgreSQL, and the OpenAI API. The application enables teams to create, manage, and monitor feature flags while leveraging an AI assistant to automate feature flag operations through natural language. The assistant uses OpenAI function/tool calling to invoke backend APIs.

## Features

Feature Flag Management
Create feature flags
Edit existing feature flags
Delete feature flags
Enable/disable flags
Configure rollout percentages (0–100%)
Organize flags by project
Support multiple environments: Dev, Test, Stage, Prod
Track last updated timestamps
AI Assistant

## Examples

"Create a feature flag."    
"Show all production feature flags."  
"List disabled feature flags."  
"Enable the checkout feature."  
"Delete the beta-login feature."  

## Tech Stack

### Frontend 

React  
TypeScript  
Vite  
Tailwind CSS  
Axios  
React Router  

### Backend

FastAPI  
Python  
SQLAlchemy (Async) 
Alembic  
PostgreSQL  
Pydantic  

### AI

OpenAI Responses API  
Function Calling / Tool Calling  

## Architecture

                +---------------------+  
                |   React Frontend    |  
                +----------+----------+  
                           |  
                     REST API Calls  
                           |    
                +---------------------+  
                |      FastAPI        |  
                +----------+----------+  
                           |  
               SQLAlchemy Async ORM    
                           |  
                +---------------------+  
                |    PostgreSQL DB    |  
                +---------------------+  
  
                           ^  
                           |  
                    Tool Calling   
                           |  
                +---------------------+  
                |     OpenAI API      |  
                +---------------------+  

## Database Model

Each feature flag contains:

id	Primary key
name	Feature flag name
description	Description
enabled	Boolean state
rollout_percentage	Rollout percentage
project_id	Associated project
environment	Dev/Test/Stage/Prod
last_updated	Timestamp

## AI Tool Calling

The AI assistant communicates with backend tools instead of directly manipulating data.  

Implemented tools include:

Create Feature Flag  
Retrieve Feature Flags  
Delete Feature Flag  

Example flow:

User  
    |  
    v  
"Create a production feature flag named dark_mode"   
    |  
    v  
OpenAI  
    |  
Tool Call  
    |  
    v  
FastAPI  
    |  
SQLAlchemy  
    |  
PostgreSQL  
    |  
Tool Result  
    |  
OpenAI  
    |  
Assistant Response  

## REST APIs

GET	/feature-flags	Get all feature flags  
GET	/feature-flags/{id}	 Get feature flag by id  
GET	/feature-flags/environment/{environment}  Get all feature flags by environment  
POST	/feature-flags/create  Create a feature flag  
PATCH	/feature-flags/{id}	 Update a feature flag  
DELETE	/feature-flags/{id}	 Delete a feature flag  
POST	/assistant AI assistant  

## Running the Project

git clone https://github.com/<your-username>/AI-Feature-Flag-Manager.git  
cd AI-Feature-Flag-Manager  

### Backend
cd backend  
python -m venv venv  
#### Windows
venv\Scripts\activate  
pip install -r requirements.txt  
alembic upgrade head  
uvicorn app.main:app --reload  
Backend runs at:  
http://localhost:8000

### Frontend  
cd frontend  
npm install  
npm run dev  
Frontend runs at:  
http://localhost:5173

## Environment Variables  

DATABASE_URL=postgresql+asyncpg://username:password@localhost/database_name  
OPENAI_API_KEY=your_openai_api_key  
VITE_API_URL=http://localhost:8000  

## Future Enhancements  
Authentication (JWT)  
Role-based access control  
Audit history  
Search and filtering  
Bulk operations  
Scheduled feature flag activation  

## Screenshots

### Listing  
<p align="center">
  <img src="screenshots/feature-flag-listing.png" width="800">
</p>

### Create Feature Flag  
<p align="center">
  <img src="screenshots/create-flag.png" width="800">
</p>

### Create Feature Flag with AI  
<p align="center">
  <img src="screenshots/create-flag-with-ai.png" width="800">
</p>

### Edit Flag  
<p align="center">
  <img src="screenshots/edit-flag.png" width="800">
</p>
