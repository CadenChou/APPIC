#!/bin/bash

# Define the path to the Apache error log
APACHE_ERROR_LOG="/var/log/apache2/error.log"

# Check if Apache is running
is_apache_running() {
    pgrep apache2 > /dev/null
    return $?
}

# Main loop
while true
do
    if ! is_apache_running
    then
        echo "Apache is not running. Restarting..."
        systemctl restart apache2
        sleep 5 # Adjust sleep time as needed
    fi

    # Monitor the Apache error log for any unexpected shutdowns
    if [ -f "$APACHE_ERROR_LOG" ]
    then
        if grep -q "httpd (pid [0-9]+) already running" "$APACHE_ERROR_LOG"
        then
            echo "Apache reported 'httpd already running'. It might be a graceful restart."
        else
            echo "Detected an unexpected shutdown. Restarting Apache..."
            systemctl restart apache2
            sleep 5 # Adjust sleep time as needed
        fi
    else
        echo "Apache error log not found."
    fi

    sleep 60 # Check every 60 seconds (adjust as needed)
done
