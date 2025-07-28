@echo off

set BASEURL=Resume

echo Installing bundles...
call bundle install

echo Adding webrick...
call bundle add webrick

:: Jekyll 서버가 실행된 후, 브라우저를 열고 특정 주소로 이동
start "" "http://127.0.0.1:4000/%BASEURL%/"

echo Executing Jekyll serve...
call bundle exec jekyll serve --trace

echo Done.
pause
