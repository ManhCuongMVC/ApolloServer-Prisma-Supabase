<!-- run with Docker -->

docker build -t cuongmvc/trinh-clothes .

docker run -d --name trinh-clothes-container -p 5000:5000 cuongmvc/trinh-clothes
