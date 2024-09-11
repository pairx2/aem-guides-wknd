#!/bin/sh

SDK_PATH="../aem-sdk"
DISPATCHER_VERSION="2.0.40"

TARGET_PATH="target"

rm -r "$TARGET_PATH/out"
mkdir -p $TARGET_PATH/out

$SDK_PATH/dispatcher-sdk-$DISPATCHER_VERSION/bin/validator full -d $TARGET_PATH/out dispatcher/target/aem-abbott-platform-cloud-dispatcher.dispatcher-0.1.0-SNAPSHOT/

$SDK_PATH/dispatcher-sdk-$DISPATCHER_VERSION/bin/docker_run.sh $TARGET_PATH/out host.docker.internal:4503 80
