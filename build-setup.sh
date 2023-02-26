#!/bin/bash

# Ensure any used dirs exist
mkdir -p ./_build/public/

# Copy over Bootstrap files
cp -r ./node_modules/bootstrap/dist/* ./_build/public/

# Setup _build/ with all non-TypeScript files and folders
rsync -a \
 --exclude='*.ts' \
 --exclude='_build/' \
 --exclude='node_modules/' \
 --exclude='.git*' \
 --include='node_modules/bootstrap/dist' -R ./ ./_build/ 
