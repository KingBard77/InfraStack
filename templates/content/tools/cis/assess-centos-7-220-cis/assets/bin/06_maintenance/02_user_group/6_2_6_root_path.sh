#!/bin/bash

CRITICALITY=1
TITLE="Ensure root PATH Integrity"

function check {
  STATUS="Pass"
  if [ "`echo $PATH | grep ::`" != "" ]; then
    STATUS="Fail"
    return
      echo "Empty Directory in PATH (::)"
  fi

  if [ "`echo $PATH | grep :$`"  != "" ]; then
    STATUS="Fail"
    return
    echo "Trailing : in PATH"
  fi

  p=`echo $PATH | sed -e 's/::/:/' -e 's/:$//' -e 's/:/ /g'` 
  set -- $p
  exit
  while [ "$1" != "" ]; do
    if [ "$1" = "." ]; then
      STATUS="Fail"
      return
      echo "PATH contains ."
      shift
      continue
    fi
    if [ -d $1 ]; then
      dirperm=`ls -ldH $1 | cut -f1 -d" "`
      if [ `echo $dirperm | cut -c6`  != "-" ]; then
        STATUS="Fail"
        return
        echo "Group Write permission set on directory $1" 
      fi
      if [ `echo $dirperm | cut -c9` != "-" ]; then
        STATUS="Fail"
        return
        echo "Other Write permission set on directory $1"
      fi
      dirown=`ls -ldH $1 | awk '{print $3}'`
      if [ "$dirown" != "root" ] ; then
        STATUS="Fail"
        return
        echo $1 is not owned by root
      fi 
    else
      STATUS="Fail"
      return
      echo $1 is not a directory
    fi
    shift 
  done
}

function fix {
  echo "Manual"
}

