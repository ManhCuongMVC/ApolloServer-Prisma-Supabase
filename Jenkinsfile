pipeline {
    agent any
    
    environment {
        // Define any environment variables you may need
    }

    stages {
        stage('Packaging/Pushing imagae') {
            steps {
                withDockerRegistry() {
                    sh 'docker build . -t cuongmvc/trinh-clothes'
                    sh 'docker push cuongmvc/trinh-clothes'
                }
            }
        }

        stage('Deploy Spring Boot to DEV') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker image pull cuongmvc/trinh-clothes'
                sh 'docker container stop cuongmvc/trinh-clothes || echo "this container does not exist" '
                sh 'docker network create dev || echo "this network exists"'
                sh 'echo y | docker container prune '
                sh 'docker container run -d --rm --name trinh-clothes-container -p 5000:5000 --network dev cuongmvc/trinh-clothes'
            }
        }
    }

    post {
        // Define post-build actions or notifications (optional)
        always {
            // Clean up any temporary files or resources if needed
            sh 'echo "Cleaning up..."'
            cleanWs()
        }
        success {
            // Actions to perform when the build is successful (optional)
            // For example, you can send notifications or trigger downstream jobs
        }
        failure {
            // Actions to perform when the build fails (optional)
            // For example, you can send notifications or handle errors
        }
    }
}
