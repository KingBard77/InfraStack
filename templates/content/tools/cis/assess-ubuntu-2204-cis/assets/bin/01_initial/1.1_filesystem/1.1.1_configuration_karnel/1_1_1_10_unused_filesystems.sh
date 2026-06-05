#!/bin/sh

CRITICALITY=1
TITLE="Ensure unused filesystems kernel modules are not available"

function check {
    STATUS="Pass"
    MODULES=(cramfs freevxfs hfs hfsplus jffs2 squashfs udf usb-storage)

    for MODULE in "${MODULES[@]}"; do
        if lsmod | awk '{print $1}' | grep -Eq "^${MODULE}$"; then
            STATUS="Fail: kernel module is loaded: $MODULE"
            break
        fi

        if modprobe -n -v "$MODULE" 2>/dev/null | grep -Evq '(install /bin/(true|false)|Module .* not found)'; then
            STATUS="Fail: kernel module is available: $MODULE"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    MODULES=(cramfs freevxfs hfs hfsplus jffs2 squashfs udf usb-storage)
    CONFIG="/etc/modprobe.d/cis-unused-filesystems.conf"

    touch "$CONFIG"
    cp -a "$CONFIG" "$CONFIG.$(date +%s).bak"

    for MODULE in "${MODULES[@]}"; do
        sed -i -E "/^[[:space:]]*(install|blacklist)[[:space:]]+$MODULE([[:space:]]|$)/d" "$CONFIG"
        printf 'install %s /bin/false\n' "$MODULE" >> "$CONFIG"
        printf 'blacklist %s\n' "$MODULE" >> "$CONFIG"
        if lsmod | awk '{print $1}' | grep -Eq "^${MODULE}$"; then
            modprobe -r "$MODULE" 2>/dev/null || true
        fi
    done
}
