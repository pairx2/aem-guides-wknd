#!/bin/sh

SDK_PATH="../aem-sdk"
DISPATCHER_VERSION="2.0.40"

TARGET_PATH="target"

mkdir -p $TARGET_PATH/tmp/validate

$SDK_PATH/dispatcher-sdk-$DISPATCHER_VERSION/bin/validator full -d $TARGET_PATH/tmp/validate dispatcher/target/aem-abbott-platform-cloud-dispatcher.dispatcher-0.1.0-SNAPSHOT/

rm -r "$TARGET_PATH/tmp/validate"
