#!/bin/sh

CRITICALITY=1
TITLE="Ensure bootloader password is set"

VARS=(oneadmin grub.pbkdf2.sha512.10000.17047BAA9ACDF0C2E4412E4206A73998514C9F6C3DD2FBBF110A65FA72480E485CCF318203FA4A77BA5C34C04220A21986EA3C5EC0C98CA35BD5EA31F4CE7AC7.961FB8F149153F2F48860CF6692B63D64EFB17E4197BDA4D599ED2CAB3041CC79DF39623BE586BC94F08AC5C4E34CC5465356EDF404B57DFA8011661D18E927D)

function check {
	STATUS="Fail"

	if (grep "^set superusers" /boot/grub2/grub.cfg &> /dev/null) && \
	(grep "^password" /boot/grub2/grub.cfg &> /dev/null); then
		STATUS="Pass"
	fi
}

function fix {
	#cp -a /etc/grub.d/01_users /etc/grub.d_01_users.$(date +"%s")
	#cp -a /boot/grub2/grub.cfg /boot/grub2/grub.cfg.$(date +"%s")
	#echo -e "cat <<EOF\nset superusers=\"${VARS[0]}\"\npassword_pbkdf2 ${VARS[0]} ${VARS[1]}\nEOF" > /etc/grub.d/01_users
	#grub2-mkconfig > /boot/grub2/grub.cfg &> /dev/null
	echo "No"
}
