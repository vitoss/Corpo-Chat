rm -rf bin/*
javac -d bin -cp ".:lib/junit.jar:lib/hamcrest-core.jar:lib/selenium-java.jar:bin" ./src/**/*.java