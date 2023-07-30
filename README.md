<!-- run with Docker -->

docker build -t cuongmvc/trinh-clothes .

docker run -d --name trinh-clothes-container -p 8000:8000 cuongmvc/trinh-clothes
