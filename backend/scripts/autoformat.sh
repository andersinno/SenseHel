#!/bin/bash
# autoformat code and imports, can be ran from anywhere in the git repository
BACKEND="`git rev-parse --show-toplevel`/backend"
black -S --exclude migrations $BACKEND
isort -rc -sg migrations $BACKEND

