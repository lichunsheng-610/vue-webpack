@ECHO OFF
cls

echo php-cgi 正在关闭 ...
Process.exe -k xxfpm.exe
Process.exe -k php-cgi.exe


echo nginx 正在关闭 ...
Process.exe -k nginx.exe

echo mysqld 正在关闭 ...
Process.exe -k mysqld.exe
