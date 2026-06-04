#!/bin/bash

CRITICALITY=1
TITLE="Ensure users' .netrc Files are not group or world accessible"

function check {
	STATUS="Pass"
	for dir in `cat /etc/passwd | egrep -v '(root|sync|halt|shutdown)' | awk -F: '($7 != "/sbin/nologin") { print $6 }'`; do
		for file in $dir/.netrc; do
			if [ ! -h "$file" -a -f "$file" ]; then
				fileperm=`ls -ld $file | cut -f1 -d" "`
				if [ `echo $fileperm | cut -c5`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Group Read set on $file"
				fi
				if [ `echo $fileperm | cut -c6`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Group Write set on $file"
				fi
				if [ `echo $fileperm | cut -c7`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Group Execute set on $file"
				fi
				if [ `echo $fileperm | cut -c8`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Other Read  set on $file"
				fi
				if [ `echo $fileperm | cut -c9`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Other Write set on $file"
				fi
				if [ `echo $fileperm | cut -c10`  != "-" ]; then
					STATUS="Fail"
					return
					echo "Other Execute set on $file"
				fi
			fi 
		done
	done
}

function fix {
	echo "Manual";
}

