#!/bin/sh

CRITICALITY=1
TITLE="Ensure the SELinux state is enforcing"

function check {
	STATUS="Fail"

	grep SELINUX=enforcing /etc/selinux/config | 2>&1 grep -E "enforcing"  > /dev/null 

	if [ $? == 0 ]; then
		sestatus | 2>&1 grep -E "SELinux status.*enabled"  > /dev/null 
		          
		          if [ $? == 0 ]; then
		          sestatus | 2>&1 grep -E "Current mode.*enforcing"  > /dev/null

              if [ $? == 0 ]; then
               sestatus | 2>&1 grep -E "Mode from config file.*enforcing"  > /dev/null

		  		if [ $? == 0 ]; then
        			STATUS="Pass"
		          
                fi
	      	fi
      	fi
	fi
}

function fix {
	cp -a /etc/selinux/config /etc/selinux/config.$(date +"%s")
	sed -i "s/^SELINUX=.*/SELINUX=enforcing/" /etc/selinux/config
}