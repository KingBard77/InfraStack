#!/bin/sh

CRITICALITY=1
TITLE="Ensure loopback traffic is configured"

function check {
	STATUS="Pass"

	for CHAIN in INPUT OUTPUT; do
		iptables -L $CHAIN -v -n | grep "ACCEPT.*all.*lo" 2>&1 > /dev/null
		if [ $? != 0 ]; then
			STATUS="Fail"	
		fi
	done

	iptables -L INPUT -v -n | grep "DROP.*all.*\*" 2>&1 > /dev/null
	if [ $? != 0 ]; then
		STATUS="Fail"	
	fi
}

function fix {
	#iptables -A INPUT -i lo -j ACCEPT
	#iptables -A OUTPUT -o lo -j ACCEPT
	#iptables -A INPUT -s 127.0.0.0/8 -j DROP
	echo "Manual"
}
