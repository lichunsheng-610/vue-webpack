@ECHO OFF
cls

echo php-cgi ���ڹر� ...
Process.exe -k xxfpm.exe
Process.exe -k php-cgi.exe


echo nginx ���ڹر� ...
Process.exe -k nginx.exe

echo mysqld ���ڹر� ...
Process.exe -k mysqld.exe
