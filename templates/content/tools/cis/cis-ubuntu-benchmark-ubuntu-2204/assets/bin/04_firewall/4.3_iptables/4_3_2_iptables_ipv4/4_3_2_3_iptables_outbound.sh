#!/bin/sh

CRITICALITY=1
TITLE="Ensure iptables outbound and established connections are configured"

function check {
	STATUS="Pass"

	for PORT in $(ss -ln | grep -E "^tcp|^udp" | grep LISTEN\ | awk '{ print $5 }' | rev | cut -d':' -f1 | rev | sort | uniq); do
		iptables -L INPUT -v -n | grep ":$PORT\ " 2>&1  > /dev/null
		if [ $? != 0 ]; then
			STATUS="Fail"	
		fi
	done

    echo "Check status: $STATUS"
}

function fix {
	echo "Manual"
		
	# iptables -A OUTPUT -p tcp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# iptables -A OUTPUT -p udp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# iptables -A OUTPUT -p icmp -m state --state NEW,ESTABLISHED -j ACCEPT 
	# iptables -A INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT 
	# iptables -A INPUT -p udp -m state --state ESTABLISHED -j ACCEPT 
	# iptables -A INPUT -p icmp -m state --state ESTABLISHED -j ACCEPT
}
