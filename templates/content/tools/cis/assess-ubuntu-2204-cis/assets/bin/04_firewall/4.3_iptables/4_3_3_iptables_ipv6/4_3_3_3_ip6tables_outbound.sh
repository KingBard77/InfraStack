#!/bin/sh

CRITICALITY=1
TITLE="Ensure ip6tables outbound and established connections are configured"

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
		
	# ip6tables -A OUTPUT -p tcp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# ip6tables -A OUTPUT -p udp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# ip6tables -A OUTPUT -p icmp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# ip6tables -A INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT 
	# ip6tables -A INPUT -p udp -m state --state ESTABLISHED -j ACCEPT 
	# ip6tables -A INPUT -p icmp -m state --state ESTABLISHED -j ACCEPT
}
