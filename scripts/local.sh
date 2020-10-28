#!/bin/bash
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
project_dir="${script_dir}/.."
dist_dir=".dist/"

echo "INFO: This script invokes the function locally"


echo "INFO: Initialising system"
rm -Rf $dist_dir
mkdir -p $dist_dir
cdk synth --no-staging > "$dist_dir/template.yaml"

echo "INFO: Invoking function"
invocation=$(sam local invoke -t "$dist_dir/template.yaml")
prev_code=$(echo $?)
if [ "0" != $prev_code ]; then
  echo "ERROR: Failed to invoke function."
  echo $invocation
  exit 1
fi

echo "INFO: Invocation finished"
echo "RESULT: $invocation"