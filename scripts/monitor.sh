#!/bin/bash
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
project_dir="${script_dir}/.."

echo "INFO: Starting API monitoring. This script requires jq."

# If you modify the stack name change this too
stack_name="FunctionStack"

echo "INFO: Fetching API url"
stack_description=$(aws cloudformation describe-stacks --stack-name ${stack_name} --output json)
api_url=$(echo $stack_description | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "ApiEndpoint") | .OutputValue')

echo "INFO: API URL is ${api_url}"

echo "INFO: Starting monitor. We'd execute requests every second"
i=0
while true
do
  response=$(curl -s $api_url)
  i=$(($i+1))
  echo "$i         ->         $response"
done
