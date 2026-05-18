#!/bin/sh

CRITICALITY=1
TITLE="Ensure pam_pwhistory uses use_authtok"

CONFIG_FILE="/usr/share/pam-configs/pwhistory"
TARGET_FILE="/etc/pam.d/common-password"

function check {
    STATUS="Fail"

    if { [ -f "$CONFIG_FILE" ] && grep -Eq 'pam_pwhistory\.so.*use_authtok' "$CONFIG_FILE" > /dev/null 2>&1; } || { [ -f "$TARGET_FILE" ] && grep -Eq 'pam_pwhistory\.so.*use_authtok' "$TARGET_FILE" > /dev/null 2>&1; }; then
        STATUS="Pass"
    else
        STATUS="Fail: pam_pwhistory does not use use_authtok"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$CONFIG_FILE" ]; then
        cp -a "$CONFIG_FILE" "$CONFIG_FILE.$(date +"%s")"
    fi

    cat <<'EOF' > "$CONFIG_FILE"
Name: pwhistory password history checking
Default: yes
Priority: 1024
Password-Type: Primary
Password:
  requisite pam_pwhistory.so remember=24 enforce_for_root use_authtok
EOF

    pam-auth-update --enable pwhistory
}
