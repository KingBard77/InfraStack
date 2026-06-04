#!/bin/bash

CRITICALITY=1
TITLE="Ensure users' home directories permissions are 750 or more restrictive"

function check {
	STATUS="Pass"
	for dir in `cat /etc/passwd | egrep -v '(root|halt|sync|shutdown)' | awk -F: '($7 != "/sbin/nologin") { print $6 }'`; do
		dirperm=`ls -ld $dir | cut -f1 -d" "`
		if [ `echo $dirperm | cut -c6`  != "-" ]; then
			STATUS="Fail"
		  	return
			echo "Group Write permission set on directory $dir" 
		fi
		if [ `echo $dirperm | cut -c8` != "-" ]; then
			STATUS="Fail"
		  	return
			echo "Other Read permission set on directory $dir"
		fi
		if [ `echo $dirperm | cut -c9`  != "-" ]; then
			STATUS="Fail"
		  	return
			echo "Other Write permission set on directory $dir" 
		fi
		if [ `echo $dirperm | cut -c10` != "-" ]; then
			STATUS="Fail"
		  	return
			echo "Other Execute permission set on directory $dir"
		fi 
	done
}

function fix {
	echo "Manual"
}
