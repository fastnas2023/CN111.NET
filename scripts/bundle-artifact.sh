#!/bin/bash
set -e

echo "Installing bundler dependencies..."
npm install -D parcel @parcel/config-default parcel-resolver-tspaths html-inline

cat > .parcelrc << 'PARCEL'
{
  "extends": "@parcel/config-default",
  "resolvers": ["parcel-resolver-tspaths", "..."]
}
PARCEL

echo "Building artifact..."
npx parcel build index.html --no-source-maps

echo "Inlining HTML..."
npx html-inline dist/index.html > bundle.html

echo "Artifact created at bundle.html"
