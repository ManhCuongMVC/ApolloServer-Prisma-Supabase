<!-- run with Docker -->

docker build . -t trinh-clothes

docker run -d --name trinh-clothes-container -p 5000:5000 trinh-clothes
