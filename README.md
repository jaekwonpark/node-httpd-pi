node-httpd-pi
===========

HTTP demon running on Node.js to control raspberry pi

prerequisites :
1. gpio-admin : checkout from https://github.com/quick2wire/quick2wire-gpio-admin and build then install
2. pi-gpio : npm install -g pi-gpio
install with -g option then create /etc/init.d/httpd and input followings then save

-----------------------------
#! /bin/sh
# /etc/init.d/httpd
case "$1" in
        start)
                echo "Starting httpd"
                /usr/local/lib/node_modules/node-httpd-pi/bin/node-httpd-pi 2> /var/log/httpd/error.log&
                ;;
        stop)
                echo "Stopping httpd"
                killall node
                ;;
        *)
                echo "Usage: /etc/init.d/httpd {start|stop}"
                exit 1
                ;;
esac

exit 0
-----------------------------
then you can start/stop httpd with

$sudo /etc/init.d/httpd {start|stop}
