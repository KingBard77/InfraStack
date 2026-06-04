#!/bin/sh

CRITICALITY=1
TITLE="Ensure default deny firewall policy"

function check {
	STATUS="Pass"

	for CHAIN in INPUT FORWARD OUTPUT; do
		iptables -L | grep "Chain.*$CHAIN" | grep -E "DROP|REJECT"
		if [ $? != 0 ]; then
			STATUS="Fail"	
		fi
	done
}

function fix {
	#iptables -P INPUT DROP
	#iptables -P OUTPUT DROP
	#iptables -P FORWARD DROP
	echo "Manual"
}
