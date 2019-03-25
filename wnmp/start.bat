@echo off
cls

#echo Starting php-cgi
set PHP_PATH=php\php5.3.10
#RunHiddenConsole.exe %PHP_PATH%\xxfpm "php/php5.3.10/php-cgi.exe -c php/php5.3.10/php.ini" -n 5 -i 127.0.0.1 -p 9000
echo .
echo .

echo Starting nginx
cd nginx
start nginx
cd ..
ping 127.0.0.1 -n 1>NUL
echo .
echo .
ping 127.0.0.1 -n 1>NUL
