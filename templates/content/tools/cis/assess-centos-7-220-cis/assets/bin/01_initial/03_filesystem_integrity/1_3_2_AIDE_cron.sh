#!/bin/sh

CRITICALITY=1
TITLE="Ensure filesystem integrity is regularly checked"

function check {
	STATUS="Fail"

	crontab -u root -l 2>&1 | grep aide  > /dev/null 
	if [ $? == 0 ]; then
        STATUS="Pass"
	fi

	grep -r aide /etc/cron.* /etc/crontab 2>&1 > /dev/null
	if [ $? == 0 ]; then
        STATUS="Pass"
	fi
}

function fix {
	cp -a /var/spool/cron/ /var/spool/cron.$(date +"%s")
	echo "0 5 * * * /usr/sbin/aide --check" >> /var/spool/cron/root
}
