./compile.sh

java -jar lib/selenium-server-standalone.jar &
server_pid=$!
sleep 20
./run_bare.sh
sleep 5
kill "$server_pid"