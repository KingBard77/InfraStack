#!/bin/bash

CRITICALITY=1
TITLE="Ensure prelink is not installed"


function check {
    STATUS="Fail"

    if dpkg-query -W -f='${binary:Package}\t${Status}\t${db:Status-Status}\n' prelink > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: Prelink is installed"
    fi

    echo "Check status: $STATUS"
}


function fix {
   prelink -ua
   apt purge prelink
}


