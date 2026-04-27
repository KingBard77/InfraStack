#!/bin/sh

CRITICALITY=1
TITLE="Ensure ip6tables firewall rules exist for all open ports"

function check {
	STATUS="Pass"

	for PORT in $(ss -ln | grep -E "^tcp|^udp" | grep LISTEN\ | awk '{ print $5 }' | rev | cut -d':' -f1 | rev | sort | uniq); do
		ip6tables -L INPUT -v -n | grep ":$PORT\ " 2>&1  > /dev/null
		if [ $? != 0 ]; then
			STATUS="Fail"	
		fi
	done
}

function fix {
	echo "Manual"
	
	#temp
	#for PORT in $(ss -ln | grep -E "^tcp|^udp" | grep LISTEN\ | awk '{ print $5 }' | rev | cut -d':' -f1 | rev | sort | uniq); do
	#	ip6tables -A INPUT -p tcp --dport $PORT -m state --state NEW -j ACCEPT
	#done
}
