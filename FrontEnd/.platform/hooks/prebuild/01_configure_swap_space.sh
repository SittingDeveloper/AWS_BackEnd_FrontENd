#!/bin/bash

SWAPFILE=/var/swapfile

if [ -f $SWAPFILE ]; then
  echo "$SWAPFILE found, skip"
  exit
fi

/bin/dd if=/dev/zero of=$SWAPFILE bs=1M count=1234
/bin/chmod 600 $SWAPFILE
/sbin/mkswap $SWAPFILE
/sbin/swapon $SWAPFILE
