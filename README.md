<!-- run with Docker -->

docker build . -t trinh-clothes

docker run -d -p 5000:5000 trinh-clothes