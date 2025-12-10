#!/bin/bash
source .env
vercel --prod --confirm --yes --token=$VERCEL_TOKEN
