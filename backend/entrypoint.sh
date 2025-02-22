#!/bin/bash

# Create database
sqlx database create

# Run sqlx migrations
sqlx migrate run

# Run application
exec "$@"
