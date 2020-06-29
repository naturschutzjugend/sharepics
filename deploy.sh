#!/bin/bash
source ./.env.local
rsync -rltvz --delete ./dist/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}
