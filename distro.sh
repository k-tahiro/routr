#!/usr/bin/env bash

set -e

build_for_platform() {
    PLATFORM=$1
    DOWNLOAD_FILE=$2

    # ROUTR_VERSION is set at the CI/CD process
    BUILD_NAME="routr-$ROUTR_VERSION""_$PLATFORM-x64_bin"
    # Cleanup
    rm -rf $BUILD_NAME
    mkdir -p $BUILD_NAME/libs

    cp -a config $BUILD_NAME
    rm -rf $BUILD_NAME/stack.properties
    cp -a etc $BUILD_NAME
    cp libs/* $BUILD_NAME/libs
    cp routr $BUILD_NAME/
    cp routr.bat $BUILD_NAME/
    cp README.md $BUILD_NAME/
    cp LICENSE $BUILD_NAME/
    wget -N "https://storage.googleapis.com/routr/$DOWNLOAD_FILE"
    tar xvf $DOWNLOAD_FILE
    mv jre-$PLATFORM $BUILD_NAME/jre
    tar -czvf $BUILD_NAME.tar.gz $BUILD_NAME
    zip -r $BUILD_NAME.zip $BUILD_NAME
    rm -rf $BUILD_NAME
}

build_for_platform 'windows' 'jre-12.0.2_windows-x64_bin.tar.gz'
build_for_platform 'linux' 'jre-12.0.2_linux-x64_bin.tar.gz'
build_for_platform 'osx' 'jre-12.0.1_osx-x64_bin.tar.gz'