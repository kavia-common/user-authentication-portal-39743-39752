#!/bin/bash
cd /home/kavia/workspace/code-generation/user-authentication-portal-39743-39752/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

