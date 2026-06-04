#!/bin/bash

CRITICALITY=1
TITLE="Ensure all users' home directories exist"

function check {
	STATUS="Pass"
	cat /etc/passwd | awk -F: '{ print $1 " " $3 " " $6 }' | while read user uid dir; do
	    if [ $uid -ge 1000 -a ! -d "$dir" -a $user != "nfsnobody" ]; then 
	      STATUS="Fail"
		  return
	      echo "The home directory ($dir) of user $user does not exist."
	    fi 
  	done
}

function fix {
	echo "Manual"
}
