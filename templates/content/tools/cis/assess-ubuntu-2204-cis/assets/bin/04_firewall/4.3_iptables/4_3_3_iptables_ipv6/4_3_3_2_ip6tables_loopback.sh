#!/bin/sh

CRITICALITY=1
TITLE="Ensure ip6tables loopback traffic is configured"

function check {
	STATUS="Pass"

	for CHAIN in INPUT OUTPUT; do
		ip6tables -L $CHAIN -v -n | grep "ACCEPT.*all.*lo" 2>&1 > /dev/null
		if [ $? != 0 ]; then
			STATUS="Fail"	
		fi
	done

	ip6tables -L INPUT -v -n | grep "DROP.*all.*\*" 2>&1 > /dev/null
	if [ $? != 0 ]; then
		STATUS="Fail"	
	fi
}

function fix {
	echo "Manual"

	#ip6tables -A INPUT -i lo -j ACCEPT
	#ip6tables -A OUTPUT -o lo -j ACCEPT
	#ip6tables -A INPUT -s 127.0.0.0/8 -j DROP
}
